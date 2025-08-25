import {expect, type Locator , type Page} from '@playwright/test';
export class HomePage {
  readonly page: Page;


  constructor(page: Page) {
    this.page = page;
    this.username=page.getByText('Logged in as DanielDemoUser')

  }
  readonly username: Locator;

  async goto() {
    await this.page.goto('/');
  }
  async verifyLoggedIn() {
    expect(await this.username.isVisible());
  }

  
}