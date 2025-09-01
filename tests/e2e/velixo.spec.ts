import { test, expect } from "@playwright/test";
import { Excel } from "../../page-objects/excel";
import { getCurrentDate } from "../../src/utils/date";

test("Login to MS Office", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("https://office.com", { waitUntil: "domcontentloaded" });

  const excel = new Excel(page);
  await excel.openNewExcelSheet();
  await excel.goToCell("A10");
  await excel.insertFormula("A10", '=TEXT(TODAY(),"yyyy-mm-dd")');
  let valueDate: string = await excel.getValueFromTheCell("A10");
  expect(typeof valueDate).toEqual("string");
  expect(valueDate).not.toEqual("");
  expect(valueDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  const expectedDate = getCurrentDate();
  expect(valueDate).toEqual(expectedDate);
});
