import { test, expect } from "@playwright/test";

test("Custom 404 page displays correctly", async ({ page }) => {
  await page.goto("/this-page-should-not-exist");

  await expect(
    page.getByRole("heading", { name: /page not found/i }),
  ).toBeVisible();

  await expect(page.getByRole("button", { name: /go home/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /go back/i })).toBeVisible();

  await expect(
    page.getByRole("link", { name: /cars overview/i }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /coe results/i })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "• Fuel Types", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "• Vehicle Types", exact: true }),
  ).toBeVisible();
});
