import { render, screen } from "@testing-library/react";
import { vi, describe, it, beforeAll, afterAll, expect } from "vitest";
import { LastUpdate } from "./last-update";

const mockLastUpdated = new Date("2025-01-01T00:00:00Z");

describe("LastUpdate component", () => {
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
    const { container } = render(<LastUpdate lastUpdated={mockLastUpdated} />);
    expect(container).toMatchSnapshot();
  });

  it("renders the separator and label", () => {
    render(<LastUpdate lastUpdated={mockLastUpdated} />);
    expect(screen.getByText("|")).toBeVisible();
    expect(screen.getByText(/Last update:/)).toBeVisible();
  });

  it("displays the mocked formatted date", () => {
    render(<LastUpdate lastUpdated={mockLastUpdated} />);
    // We expect our mock return value to appear in the DOM
    expect(screen.getByText("JAN 2025")).toBeVisible();
  });

  it("accepts and uses a custom locale", () => {
    // Change the mock to verify locale override path
    toLocaleStringSpy.mockReturnValueOnce("LOCALE_OVERRIDDEN");
    render(<LastUpdate lastUpdated={mockLastUpdated} locale="fr-FR" />);
    expect(screen.getByText("LOCALE_OVERRIDDEN")).toBeVisible();
  });
});
