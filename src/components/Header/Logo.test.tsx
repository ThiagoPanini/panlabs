import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("renders an inline svg mark with an accessible name", () => {
    const { container } = render(<Logo />);
    const mark = screen.getByRole("img", { name: "panlabs" });
    expect(mark.tagName.toLowerCase()).toBe("svg");
    // a crisp inline vector, not a raster <img>
    expect(container.querySelector("img")).toBeNull();
  });

  it("forwards a className so the header can size and place it", () => {
    const { container } = render(<Logo className="x" />);
    expect(container.querySelector("svg.x")).toBeInTheDocument();
  });
});
