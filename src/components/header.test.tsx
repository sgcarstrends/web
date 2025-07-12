import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "@/components/header";

describe("Navbar", () => {
  it("should render correctly", () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
