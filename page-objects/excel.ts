import { Locator, Page, FrameLocator, expect } from "@playwright/test";

export class Excel {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private get iframe(): FrameLocator {
    return this.page.frameLocator(
      'iframe[title="Office on the web Frame"], iframe[id^="WacFrame_Excel"]'
    );
  }

  private get formulaBar(): Locator {
    return this.iframe.locator('[aria-label="formula bar"]');
  }

  private get cellNameBox(): Locator {
    return this.iframe.locator("#FormulaBar-NameBox-input");
  }

  async openNewExcelSheet() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.page.locator("#ExcelOnline").click(),
    ]);
    await newPage.waitForLoadState("domcontentloaded");
    await newPage.bringToFront();

    const createNewBlankWorkbook = newPage.getByRole("button", {
      name: "Create blank workbook",
    });

    await expect(createNewBlankWorkbook).toBeVisible();
    await createNewBlankWorkbook.click();
    this.page = newPage;
    this.iframe
      .locator("canvas.ewr-sheettable")
      .first()
      .waitFor({ state: "visible", timeout: 60000 });
  }

  async goToCell(cellNumber: string) {
    await this.cellNameBox.click();
    await this.page.keyboard.press("Delete");
    await this.page.keyboard.press("Delete");
    await this.cellNameBox.fill(cellNumber);
    await this.cellNameBox.press("Enter");
    await expect(this.cellNameBox).toHaveValue(cellNumber);
  }

  async insertFormula(cellNumber: string, formula: string) {
    await this.formulaBar.click();
    await this.formulaBar.pressSequentially(formula);
    await this.formulaBar.press("Enter");
    await this.page.waitForTimeout(500);
    await this.goToCell(cellNumber);
    await expect(this.formulaBar).toHaveText(formula);
  }

  async getValueFromTheCell(cellNumber: string): Promise<string> {
    const nameBoxValue = await this.cellNameBox.inputValue();
    if (nameBoxValue != cellNumber) {
      await this.goToCell(cellNumber);
    }

    let cellValue: string = "";
    await this.page.evaluate(
      async () => await navigator.clipboard.writeText(null)
    );
    while (!/\d{4}-\d{2}-\d{2}/.test(cellValue.trim())) {
      await this.page.keyboard.press("ControlOrMeta+C");
      await this.page.waitForTimeout(100);

      cellValue = await this.page.evaluate(async () =>
        (await navigator.clipboard.readText()).trim()
      );

      if (/\d{4}-\d{2}-\d{2}/.test(cellValue)) {
        return cellValue;
      }
    }

    return cellValue;
  }
}
