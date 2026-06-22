import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Catalog } from "./Catalog";

describe("Catalog", () => {
  it("shows section meta with the live count", () => {
    render(<Catalog />);
    expect(screen.getByText(/\/\/ 2 soluções no ar/)).toBeInTheDocument();
  });

  it("renders the two real solutions plus the placeholder", () => {
    render(<Catalog />);
    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(screen.getByRole("heading", { name: "epistemix" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "traveltogether" })).toBeInTheDocument();
    expect(screen.getByText("// TODO")).toBeInTheDocument();
  });

  it("links real solutions directly and safely", () => {
    render(<Catalog />);
    const cta = screen.getByRole("link", { name: /touch traveltogether/ });
    expect(cta).toHaveAttribute("href", "https://traveltogether.thiagopanini.dev");
    expect(cta.getAttribute("rel")).toContain("noopener");
  });
});
