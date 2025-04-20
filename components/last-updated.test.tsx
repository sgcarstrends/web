import { render, screen } from "@testing-library/react";
import { vi, describe, it, beforeAll, afterAll, expect } from "vitest";
import { LastUpdated } from "./last-updated";

const mockLastUpdated = 1735660800; // 1 Jan 2025, 00:00:00 GMT+8

describe("LastUpdated", () => {
  let toLocaleStringSpy: ReturnType<typeof vi.spyOn>;

  beforeAll(() => {
    // Mock toLocaleString so tests aren't dependent on environment/timezone
    toLocaleStringSpy = vi
      .spyOn(Date.prototype, "toLocaleString")
      .mockReturnValue("JAN 2025");
  });

  afterAll(() => {
    toLocaleStringSpy.mockRestore();
  });

  it("should render", () => {
    const { container } = render(<LastUpdated lastUpdated={mockLastUpdated} />);
    expect(container).toMatchSnapshot();
  });

  it("renders the separator and label", () => {
    render(<LastUpdated lastUpdated={mockLastUpdated} />);
    expect(screen.getByText(/Last updated:/)).toBeVisible();
  });

  it("displays the mocked formatted date", () => {
    render(<LastUpdated lastUpdated={mockLastUpdated} />);
    // We expect our mock return value to appear in the DOM
    expect(screen.getByText("JAN 2025")).toBeVisible();
  });

  it("accepts and uses a custom locale", () => {
    // Change the mock to verify locale override path
    toLocaleStringSpy.mockReturnValueOnce("LOCALE_OVERRIDDEN");
    render(<LastUpdated lastUpdated={mockLastUpdated} locale="en-US" />);
    expect(screen.getByText("LOCALE_OVERRIDDEN")).toBeVisible();
  });
});
