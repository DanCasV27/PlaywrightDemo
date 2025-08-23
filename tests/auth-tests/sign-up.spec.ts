import { test, expect } from '@playwright/test';
import { UserBuilder } from '../builders/user-builder';
import { LoginSignupPage } from '../pages/login.signup.page';

test.describe('Auth Flows', () => {
  test('Start Sign up process', async ({ page }) => {
    const userBuilder = new UserBuilder();
    const user = userBuilder.buildRegistration();
    const loginSignUpPage = new LoginSignupPage(page);
    await loginSignUpPage.goto();
    await loginSignUpPage.startSignUp(user);
    

  });

  test('Login with valid credentials', async ({ page }) => {
    const userBuilder = new UserBuilder();
    const user = userBuilder.buildLogin();

    const loginPage = new LoginSignupPage(page);
    await loginPage.goto();
    await loginPage.loginValidCredentials(user);

    //await expect(loginPage.dashboard).toBeVisible();
  });
});