export type SolutionStatus = "live" | "beta";

export interface TechBadge {
  label: string;
  /** Simple Icons slug, used to build the CDN icon URL */
  slug: string;
}

export interface Solution {
  slug: string;
  name: string;
  tagline: string;
  url: string;
  status: SolutionStatus;
  tech: TechBadge[];
  stats: { stars: number; commits: number; prs: number };
  /** weekly activity series powering the sparkline */
  weeks: number[];
  /** screenshot path under /public */
  shot: string;
  /** solid background shown behind the screenshot */
  shotBg: string;
}

export const epistemix: Solution = {
  slug: "epistemix",
  name: "epistemix",
  tagline: "Hub pessoal de aprendizado",
  url: "https://epistemix.dev",
  status: "live",
  tech: [
    { label: "Next.js", slug: "nextdotjs" },
    { label: "PostgreSQL", slug: "postgresql" },
    { label: "TypeScript", slug: "typescript" },
  ],
  stats: { stars: 9, commits: 248, prs: 14 },
  weeks: [2, 3, 1, 4, 5, 3, 6, 4, 7, 5, 8, 6, 9, 7, 6, 8, 10, 7, 9, 11, 8, 10, 9, 12, 10, 13],
  shot: "/assets/shot-epistemix.png",
  shotBg: "#101826",
};

export const solutions: Solution[] = [epistemix];
