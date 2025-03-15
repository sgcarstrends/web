import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AnimatedNumber } from "./animated-number";

describe("AnimatedNumber", () => {
  it("renders without crashing", () => {
    const { container } = render(<AnimatedNumber value={100} />);
    expect(container).toMatchSnapshot();
  });

  it("displays the initial value when from is specified", () => {
    render(<AnimatedNumber value={100} from={50} />);
    expect(screen.getByText("50")).toBeVisible();
  });

  it("animates to the final value", async () => {
    render(<AnimatedNumber value={100} from={0} />);

    await new Promise((resolve) => setTimeout(resolve, 500)); // Adjust timeout as needed

    await waitFor(() => {
      expect(screen.getByText("100")).toBeVisible();
    });
  });

  it("formats the number withtoLocaleString", async () => {
    render(<AnimatedNumber value={1000} from={0} />);

    await waitFor(() => {
      expect(screen.getByText("1,000")).toBeVisible();
    });
  });
});
