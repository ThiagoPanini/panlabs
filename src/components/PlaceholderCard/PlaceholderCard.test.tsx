import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PlaceholderCard } from "./PlaceholderCard";

describe("PlaceholderCard", () => {
  it("renders the anonymous // TODO placeholder copy", () => {
    render(<PlaceholderCard />);
    expect(screen.getByText("// TODO")).toBeInTheDocument();
    expect(screen.getByText("mais um experimento a caminho")).toBeInTheDocument();
  });

  it("exposes no link, stats, or sparkline", () => {
    const { container } = render(<PlaceholderCard />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(container.querySelector("polyline")).not.toBeInTheDocument();
  });
});
