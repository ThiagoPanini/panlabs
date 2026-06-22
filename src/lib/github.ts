/**
 * GitHub vitality fetch (#12).
 *
 * Pulls the two live signals shown on a card — ⭐ stars and the commit
 * heartbeat (weekly commit totals) — for a single `owner/name` repo. Each
 * signal degrades independently to `null` so a partial GitHub outage never
 * breaks the card; the caller falls back to curated values.
 */

import type { Solution } from "@/data/solutions";

const API = "https://api.github.com";

/** Weeks of commit history kept for the sparkline (the source gives 52). */
export const SPARKLINE_WEEKS = 26;

export interface Vitality {
  /** live stargazers, or null when the repo endpoint is unavailable */
  stars: number | null;
  /** last 26 weekly commit totals, or null when stats aren't ready */
  weeks: number[] | null;
}

export interface FetchVitalityOptions {
  /** GitHub token; raises the rate limit (60→5000/h). Anonymous without it. */
  token?: string;
  /** injectable fetch for testing; defaults to the global fetch */
  fetchImpl?: typeof fetch;
}

interface CommitActivityWeek {
  total: number;
}

function headers(token?: string): HeadersInit {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

export async function fetchVitality(
  repo: string,
  options: FetchVitalityOptions = {},
): Promise<Vitality> {
  const { token, fetchImpl = fetch } = options;
  const h = headers(token);

  const stars = await fetchStars(repo, h, fetchImpl);
  const weeks = await fetchWeeks(repo, h, fetchImpl);

  return { stars, weeks };
}

/**
 * Overlay live vitality onto a curated solution. Any signal that came back
 * `null` (GitHub unavailable) keeps its curated value, so the card always
 * renders coherent data.
 */
export function withVitality(solution: Solution, vitality: Vitality): Solution {
  return {
    ...solution,
    stats: { ...solution.stats, stars: vitality.stars ?? solution.stats.stars },
    weeks: vitality.weeks ?? solution.weeks,
  };
}

/**
 * Resolve a solution's live vitality. No-op for solutions without a `repo`.
 * Reads the token from `GITHUB_TOKEN` (env); anonymous when unset.
 */
export async function resolveVitality(solution: Solution): Promise<Solution> {
  if (!solution.repo) return solution;
  const vitality = await fetchVitality(solution.repo, { token: process.env.GITHUB_TOKEN });
  return withVitality(solution, vitality);
}

async function fetchStars(repo: string, h: HeadersInit, f: typeof fetch): Promise<number | null> {
  try {
    const res = await f(`${API}/repos/${repo}`, { headers: h });
    if (!res.ok) return null;
    const data = (await res.json()) as { stargazers_count?: number };
    return typeof data.stargazers_count === "number" ? data.stargazers_count : null;
  } catch {
    return null;
  }
}

async function fetchWeeks(repo: string, h: HeadersInit, f: typeof fetch): Promise<number[] | null> {
  try {
    const res = await f(`${API}/repos/${repo}/stats/commit_activity`, { headers: h });
    // 202 = GitHub is still computing the stats; empty/object = no data yet.
    if (!res.ok) return null;
    const data = (await res.json()) as unknown;
    if (!Array.isArray(data) || data.length === 0) return null;
    return (data as CommitActivityWeek[]).slice(-SPARKLINE_WEEKS).map((w) => w.total);
  } catch {
    return null;
  }
}
