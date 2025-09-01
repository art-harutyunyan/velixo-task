import { Browser, chromium, Page } from "@playwright/test";
import fs from "fs";
import path from "path";
import { LoginFlow } from "./page-objects/loginFlow";
import { credentials } from "./src/credentials";

export default async function globalSetup() {
  const filePath = path.resolve("./state/loginAuth.json");
  if (fs.existsSync(filePath)) {
    console.log("The state already exists ... ");
    return;
  }

  const browser: Browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page: Page = await context.newPage();
  const login = new LoginFlow(page);

  await page.goto("https://office.com", { waitUntil: "domcontentloaded" });
  await login.loginToExcel(credentials.username, credentials.password);

  await page.context().storageState({ path: filePath });
  console.log("The state is created in ./state/loginAuth.json");
  await browser.close();
}
