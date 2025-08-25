import { test } from '@playwright/test';
import { UserBuilder } from '../builders/user-builder';
import { LoginSignupPage } from '../pages/login.signup.page';
import { HomePage } from '../pages/home.page';
import { RegisterPage } from '../pages/register.page';
import { AccountCreatedPage } from '../pages/accountCreated.page';

test.describe('Sign up Flows', () => { 
  test('Verify Redirect for Sign Up Form', async ({ page }) => {
    const userBuilder = new UserBuilder();
    const user = userBuilder.buildRegistration();
    const loginSignUpPage = new LoginSignupPage(page);
    await loginSignUpPage.goto();
    await loginSignUpPage.startSignUp(user, page);
    const registerPage= new RegisterPage(page);
    registerPage.verifyRegistrationRedirect(user.name, user.email);
  });
  test('Verify complete sing up with required fields', async ({ page }) => {
    const userBuilder = new UserBuilder();
    const user = userBuilder.buildRegistration();
    const loginSignUpPage = new LoginSignupPage(page);
    await loginSignUpPage.goto();
    await loginSignUpPage.startSignUp(user, page);
    const registerPage= new RegisterPage(page);
    await registerPage.completeRegistration(user);
    const accountCreatedPage=new AccountCreatedPage(page);
    await accountCreatedPage.verifyAccountCreated();

  });
});