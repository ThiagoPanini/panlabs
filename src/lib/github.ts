/**
 * GitHub vitality fetch + cache (#12, #14).
 *
 * Pulls the two live signals shown on a card — ⭐ stars and the commit
 * heartbeat (weekly commit totals) — for a single `owner/name` repo.
 *
 * Resilience (#14):
 * - Responses are cached/revalidated via Next's fetch cache (`next.revalidate`),
 *   so ordinary navigation is served from cache and never burns the GitHub
 *   rate limit (anon 60/h, token 5000/h — ADR-0006). On a failed revalidation
 *   Next keeps serving the last-known value (stale-while-revalidate).
 * - The stats endpoint answers `202` while GitHub computes it; we retry a few
 *   times before giving up.
 * - Each signal degrades to `null` independently and never throws; the caller
 *   (`withVitality`) then falls back to curated values, so the card and the
 *   static build are safe even when GitHub is fully down.
 */

import type { Solution } from "@/data/solutions";

const API = "https://api.github.com";

/** Weeks of commit history kept for the sparkline (the source gives 52). */
export const SPARKLINE_WEEKS = 26;

/** Cache window for live vitality: revalidate at most once an hour. */
export const VITALITY_REVALIDATE_SECONDS = 60 * 60;

const DEFAULT_RETRIES = 2;
const DEFAULT_RETRY_DELAY_MS = 1500;
const defaultSleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

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
  /** seconds; cached & revalidated by Next so navigation is served from cache */
  revalidate?: number;
  /** retries for the 202 (stats still computing) from commit_activity */
  retries?: number;
  /** delay between 202 retries (ms) */
  retryDelayMs?: number;
  /** injectable sleep for tests */
  sleep?: (ms: number) => Promise<void>;
}

/** RequestInit augmented with Next's fetch-cache hint. */
type CachedRequestInit = RequestInit & { next?: { revalidate?: number } };

interface CommitActivityWeek {
  total: number;
}

interface RetryPolicy {
  retries: number;
  retryDelayMs: number;
  sleep: (ms: number) => Promise<void>;
}

function buildInit(token: string | undefined, revalidate: number | undefined): CachedRequestInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const init: CachedRequestInit = { headers };
  if (revalidate != null) init.next = { revalidate };
  return init;
}

export async function fetchVitality(
  repo: string,
  options: FetchVitalityOptions = {},
): Promise<Vitality> {
  const {
    token,
    fetchImpl = fetch,
    revalidate,
    retries = DEFAULT_RETRIES,
    retryDelayMs = DEFAULT_RETRY_DELAY_MS,
    sleep = defaultSleep,
  } = options;

  const init = buildInit(token, revalidate);

  const stars = await fetchStars(repo, init, fetchImpl);
  const weeks = await fetchWeeks(repo, init, fetchImpl, { retries, retryDelayMs, sleep });

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
 * Reads the token from `GITHUB_TOKEN` (env); anonymous when unset. Cached for
 * an hour so navigation never re-hits GitHub.
 */
export async function resolveVitality(solution: Solution): Promise<Solution> {
  if (!solution.repo) return solution;
  const vitality = await fetchVitality(solution.repo, {
    token: process.env.GITHUB_TOKEN,
    revalidate: VITALITY_REVALIDATE_SECONDS,
  });
  return withVitality(solution, vitality);
}

async function fetchStars(
  repo: string,
  init: CachedRequestInit,
  f: typeof fetch,
): Promise<number | null> {
  try {
    const res = await f(`${API}/repos/${repo}`, init);
    if (!res.ok) return null;
    const data = (await res.json()) as { stargazers_count?: number };
    return typeof data.stargazers_count === "number" ? data.stargazers_count : null;
  } catch {
    return null;
  }
}

async function fetchWeeks(
  repo: string,
  init: CachedRequestInit,
  f: typeof fetch,
  policy: RetryPolicy,
): Promise<number[] | null> {
  const url = `${API}/repos/${repo}/stats/commit_activity`;
  try {
    for (let attempt = 0; attempt <= policy.retries; attempt += 1) {
      const res = await f(url, init);
      // 202 = GitHub is still computing the stats: wait and retry.
      if (res.status === 202) {
        if (attempt < policy.retries) {
          await policy.sleep(policy.retryDelayMs);
          continue;
        }
        return null;
      }
      if (!res.ok) return null;
      const data = (await res.json()) as unknown;
      if (!Array.isArray(data) || data.length === 0) return null;
      return (data as CommitActivityWeek[]).slice(-SPARKLINE_WEEKS).map((w) => w.total);
    }
    return null;
  } catch {
    return null;
  }
}
