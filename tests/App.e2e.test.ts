import {
  // expect,
  test,
} from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("App", () => {
  /*   test("The user navigates back and forth.", async ({ page }) => {
    await expect(page.getByText("Users")).toBeVisible();

    await page.getByText("Leanne Graham").click();
    await expect(page.getByText("Leanne Graham")).toBeVisible();

    await page.locator("a[href='/user/1/album/1']").click();
    await expect(page.getByText("quidem molestiae enim")).toBeVisible();

    await page.getByRole("button", { name: "Go back" }).click();
    await expect(page.getByText("Leanne Graham")).toBeVisible();

    await page.getByRole("button", { name: "Go back" }).click();
    await expect(page.getByText("Users")).toBeVisible();
  });

  test("Click on fist User, click on first Album, watch all photos.", async ({
    page,
  }) => {
    await expect(page.getByText("Users")).toBeVisible();
    await page.waitForSelector("table");
    expect(await page.locator("tr").count()).toBe(11);

    await page.getByText("Leanne Graham").click();
    await expect(page.getByText("Leanne Graham")).toBeVisible();
    await expect(page.getByText("Romaguera-Crona")).toBeVisible();
    await expect(page.getByText("Gwenborough")).toBeVisible();
    await expect(page.getByText("Sincere@april.biz")).toBeVisible();
    await page.waitForSelector("a");
    expect(await page.locator("a").count()).toBe(10);

    await page.locator("a[href='/user/1/album/1']").click();
    await expect(page.getByText("quidem molestiae enim")).toBeVisible();
    await page.waitForSelector("img");
    expect(await page.locator("img").count()).toBe(50);
  }); */
});
