import { describe, expect, it, vi } from "vitest";
import { epistemix } from "@/data/solutions";
import { fetchVitality, withVitality } from "./github";

/** Build a fake `fetch` that answers by URL substring. */
function fakeFetch(routes: Record<string, { status?: number; body: unknown }>) {
  return vi.fn(async (url: string | URL | Request) => {
    const href = String(url);
    const key = Object.keys(routes).find((k) => href.endsWith(k));
    if (!key) return new Response("not found", { status: 404 });
    const { status = 200, body } = routes[key];
    return new Response(JSON.stringify(body), { status });
  }) as unknown as typeof fetch;
}

const weeks52 = Array.from({ length: 52 }, (_, i) => ({ total: i }));

describe("fetchVitality", () => {
  it("returns live stars from the repo endpoint", async () => {
    const fetchImpl = fakeFetch({
      "/repos/ThiagoPanini/epistemix": { body: { stargazers_count: 9 } },
      "/stats/commit_activity": { body: weeks52 },
    });
    const v = await fetchVitality("ThiagoPanini/epistemix", { fetchImpl });
    expect(v.stars).toBe(9);
  });

  it("reduces the 52-week commit_activity to the last 26 weekly totals", async () => {
    const fetchImpl = fakeFetch({
      "/repos/ThiagoPanini/epistemix": { body: { stargazers_count: 9 } },
      "/stats/commit_activity": { body: weeks52 },
    });
    const v = await fetchVitality("ThiagoPanini/epistemix", { fetchImpl });
    expect(v.weeks).toHaveLength(26);
    expect(v.weeks).toEqual(Array.from({ length: 26 }, (_, i) => i + 26));
  });

  it("sends an Authorization header only when a token is provided", async () => {
    const calls: Array<Record<string, string>> = [];
    const fetchImpl = vi.fn(async (_url: string, init?: RequestInit) => {
      calls.push((init?.headers as Record<string, string>) ?? {});
      return new Response(JSON.stringify({ stargazers_count: 0 }), { status: 200 });
    }) as unknown as typeof fetch;

    await fetchVitality("o/r", { fetchImpl });
    expect(calls.every((h) => !("Authorization" in h))).toBe(true);

    calls.length = 0;
    await fetchVitality("o/r", { fetchImpl, token: "ghp_x" });
    expect(calls.every((h) => h.Authorization === "Bearer ghp_x")).toBe(true);
  });

  it("degrades each signal to null independently when GitHub is unavailable", async () => {
    // repo 404 (stars gone) but stats computing (202) → both null, no throw
    const fetchImpl = fakeFetch({
      "/repos/o/r": { status: 404, body: { message: "Not Found" } },
      "/stats/commit_activity": { status: 202, body: {} },
    });
    const v = await fetchVitality("o/r", { fetchImpl });
    expect(v).toEqual({ stars: null, weeks: null });
  });

  it("never throws when the network is down (safe at static build time)", async () => {
    const fetchImpl = vi.fn(async () => {
      throw new Error("ENOTFOUND api.github.com");
    }) as unknown as typeof fetch;
    await expect(fetchVitality("o/r", { fetchImpl })).resolves.toEqual({
      stars: null,
      weeks: null,
    });
  });
});

describe("withVitality", () => {
  it("overlays live stars and weeks onto a solution", () => {
    const live = withVitality(epistemix, { stars: 42, weeks: [1, 2, 3] });
    expect(live.stats.stars).toBe(42);
    expect(live.weeks).toEqual([1, 2, 3]);
    // other stats stay curated
    expect(live.stats.commits).toBe(epistemix.stats.commits);
  });

  it("keeps curated values for any signal that came back null", () => {
    const live = withVitality(epistemix, { stars: null, weeks: null });
    expect(live.stats.stars).toBe(epistemix.stats.stars);
    expect(live.weeks).toEqual(epistemix.weeks);
  });
});
