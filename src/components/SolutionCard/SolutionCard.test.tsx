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

  it("links to the live product safely in a new tab", () => {
    render(<SolutionCard solution={epistemix} />);
    const cta = screen.getByRole("link", { name: /touch epistemix/ });
    expect(cta).toHaveAttribute("href", "https://epistemix.dev");
    expect(cta).toHaveAttribute("target", "_blank");
    expect(cta.getAttribute("rel")).toContain("noopener");
  });

  it("renders the activity sparkline", () => {
    const { container } = render(<SolutionCard solution={epistemix} />);
    expect(container.querySelector("polyline")).toBeInTheDocument();
  });
});
