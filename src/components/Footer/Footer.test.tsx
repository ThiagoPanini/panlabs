import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders as a contentinfo landmark", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("signs off without a funnel — just the cursor blinking", () => {
    render(<Footer />);
    expect(screen.getByText("next_steps.md")).toBeInTheDocument();
    expect(screen.getByText(/keep building and sharing/)).toBeInTheDocument();
  });
});
