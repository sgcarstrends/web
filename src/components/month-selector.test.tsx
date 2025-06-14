import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MonthSelector } from "./MonthSelector";

vi.mock("nuqs", () => ({
  useQueryState: vi.fn(() => [null, vi.fn()]),
}));

vi.mock("@/utils/formatDateToMonthYear", () => ({
  formatDateToMonthYear: vi.fn(() => "January 2024"),
}));

vi.mock("@/utils/groupByYear", () => ({
  groupByYear: vi.fn(() => ({ "2024": ["01"] })),
}));

describe("MonthSelector", () => {
  it("should render with months array", () => {
    const mockMonths = ["2024-01"];
    render(<MonthSelector months={mockMonths} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("should render with empty months array", () => {
    render(<MonthSelector months={[]} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});