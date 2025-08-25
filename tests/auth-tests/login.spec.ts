import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginSignupPage } from '../pages/login.signup.page';

test.describe('Login Flows', () => {
test('Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginSignupPage(page);
    await loginPage.goto();
    await loginPage.loginValidCredentials();
    const homePage = new HomePage(page);
    await homePage.verifyLoggedIn();
  })
test('Login with invalid credentials', async ({ page }) => {
    
});
});