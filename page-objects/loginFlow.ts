import { Locator, Page, expect } from "@playwright/test";

export class LoginFlow {
  private readonly page: Page;
  readonly signInButton: Locator;
  readonly emailAddressInput: Locator;
  readonly nextPageButton: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly staySignIn: Locator;
  readonly otherWayToSignIn: Locator;
  readonly useYourPassword: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = this.page.locator("#mectrl_headerPicture");
    this.emailAddressInput = this.page.getByPlaceholder(
      "Email, phone, or Skype"
    );
    this.nextPageButton = this.page.locator("#idSIButton9");
    this.passwordField = this.page.locator("#passwordEntry");
    this.loginButton = this.page.getByTestId("primaryButton");
    this.staySignIn = this.page.getByRole("button", { name: "Yes" });
    this.otherWayToSignIn = this.page.getByRole("button", {
      name: "Other ways to sign in",
    });
    this.useYourPassword = this.page.getByRole("group", {
      name: "Use your password",
    });
  }
  async loginToExcel(username: string, password: string) {
    // clicking to SignIn button on the top
    await expect(this.signInButton).toBeVisible({ timeout: 5000 });
    await this.signInButton.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(700);
    // Inserting the username
    await expect(this.emailAddressInput).toBeVisible();
    await this.emailAddressInput.fill(username);
    await this.page.waitForTimeout(700);

    // Moving to the next page
    await expect(this.nextPageButton).toBeVisible();
    await this.nextPageButton.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(700);

    // Changing the sign in option to use password authentication
    await this.changeSignInOptionToPassword();
    // Inserting the password
    await expect(this.passwordField).toBeVisible();
    await this.passwordField.fill(password);
    await this.page.waitForTimeout(700);

    // Clicking to Login button
    await expect(this.loginButton).toBeVisible();
    await this.loginButton.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(700);

    // Selecting to stay signed in
    await expect(this.staySignIn).toBeVisible();
    await this.staySignIn.click();
  }

  private async changeSignInOptionToPassword() {
    await expect(this.otherWayToSignIn).toBeVisible();
    await this.otherWayToSignIn.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(700);

    await expect(this.useYourPassword).toBeVisible();
    await this.useYourPassword.click();
    await this.page.waitForTimeout(700);
  }
}
