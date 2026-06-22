import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home page (scaffold)", () => {
  it("renders the panlabs wordmark in the header", () => {
    render(<Home />);
    expect(screen.getByText("panlabs")).toBeInTheDocument();
  });
});
