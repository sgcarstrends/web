import { test, expect } from "@playwright/test";

test.describe("Cars Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/cars");
  });

  test("should have title", async ({ page }) => {
    await expect(page).toHaveTitle(/Car Registrations/);
  });

  test("should display main heading and statistics cards", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Car Registrations" }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Total Registrations" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Top Fuel Type" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Top Vehicle Type" }),
    ).toBeVisible();
  });

  test("should display statistics sections", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "By Fuel Type" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "By Vehicle Type" }),
    ).toBeVisible();
  });

  test("should display popularity section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Popularity" }),
    ).toBeVisible();

    await expect(page.getByText(/Top 3 makes in each category/)).toBeVisible();
  });

  test("should handle empty data state", async ({ page }) => {
    await page.goto("/cars?month=2015-01");

    await expect(
      page.getByRole("heading", {
        name: "This page could not be found.",
      }),
    ).toBeVisible();
  });
});
