import { expect, Page } from '@playwright/test';

export class LoginPage {
  private usernameInput;
  private passwordInput;
  private loginButton;

  constructor(private readonly page: Page) {
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', {
      name: 'Login'
    });
  }


  async goto(){
    await this.page.goto('/web/index.php/auth/login');
  }


  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginWithEnterKey(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.passwordInput.press('Enter');
  }

  async loginPageIsVisible() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async assertLoginSuccess() {
    await expect(this.page).toHaveURL(/dashboard/);
  }

  async assertLoginFailure() {
    await expect(this.page.getByText('Invalid credentials')).toBeVisible();
  }
}