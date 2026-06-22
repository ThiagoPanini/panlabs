import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { epistemix } from "@/data/solutions";
import { SolutionCard } from "./SolutionCard";

describe("SolutionCard", () => {
  it("renders the solution as an article titled by its name", () => {
    render(<SolutionCard solution={epistemix} />);
    const card = screen.getByRole("article");
    expect(within(card).getByRole("heading", { name: "epistemix" })).toBeInTheDocument();
  });

  it("shows the tagline, description, and status", () => {
    render(<SolutionCard solution={epistemix} />);
    expect(screen.getByText("Hub pessoal de aprendizado")).toBeInTheDocument();
    expect(screen.getByText(/Blog, cursos, livros/)).toBeInTheDocument();
    expect(screen.getByText("live")).toBeInTheDocument();
  });

  it("lists the tech stack labels", () => {
    render(<SolutionCard solution={epistemix} />);
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("shows repository stats", () => {
    render(<SolutionCard solution={epistemix} />);
    expect(screen.getByText("248")).toBeInTheDocument();
    expect(screen.getByText("14")).toBeInTheDocument();
  });

  it("routes its CTA through the tracked redirect, opening safely in a new tab", () => {
    render(<SolutionCard solution={epistemix} />);
    const cta = screen.getByRole("link", { name: /touch epistemix/ });
    // the CTA points at /go/[slug] (the app's only write path), not the raw url
    expect(cta).toHaveAttribute("href", "/go/epistemix");
    expect(cta).toHaveAttribute("target", "_blank");
    expect(cta.getAttribute("rel")).toContain("noopener");
  });

  it("renders the activity sparkline", () => {
    const { container } = render(<SolutionCard solution={epistemix} />);
    expect(container.querySelector("polyline")).toBeInTheDocument();
  });

  it("hides decorative graphics from assistive tech", () => {
    render(<SolutionCard solution={epistemix} />);
    // the sparkline and icons are decorative; the numbers already convey the data
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders tech and github icons locally, with no external icon request (#15)", () => {
    const { container } = render(<SolutionCard solution={epistemix} />);
    // no <img> pointing at the Simple Icons CDN
    expect(container.querySelector('img[src*="simpleicons"]')).toBeNull();
    // tech chips render inline svg paths instead
    const chipIcons = container.querySelectorAll(`.${"chip"} svg, [class*='chip'] svg`);
    expect(chipIcons.length).toBeGreaterThanOrEqual(epistemix.tech.length);
  });
});
