import { expect, test } from "@playwright/test";
import { slugify } from "@/utils/slugify";

test.describe("Makes Page", () => {
  [
    { title: "BMW" },
    { title: "BYD" },
    { title: "MERCEDES BENZ" },
    { title: "ITALDESIGN GIUGIARO SPA" },
  ].forEach(({ title }) => {
    const slug = slugify(title);

    test(`should navigate to ${title} page successfully`, async ({ page }) => {
      await page.goto(`/cars/makes/${slug}`);

      await expect(page).toHaveTitle(new RegExp(title));
    });
  });
});
