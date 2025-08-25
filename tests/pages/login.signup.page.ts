import { expect, type Locator, type Page } from "@playwright/test";
import { BASE_URL,E2E_USER_EMAIL,E2E_USER_PASSWORD } from "../config/env";
export class LoginSignupPage{
    constructor(private readonly page: Page) {
        this.emailLoginInput = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address')
        this.passwordInput = page.getByRole('textbox', { name: 'Password' })
        this.loginButton = page.getByRole('button', { name: 'Login' })
        this.errorMessage = page.getByText('Your email or password is incorrect!')
        this.signUpButton= page.getByRole('button', { name: 'Signup' })
        this.signUpEmailInput = page.locator('form', { hasText: 'Signup' }).getByPlaceholder('Email Address');
        this.signUpNameInput = page.getByRole('textbox', { name: 'Name' })
    }
    goto() {
        return this.page.goto(`${BASE_URL}/login`);
    }
    async loginValidCredentials() {
        await this.emailLoginInput.fill(E2E_USER_EMAIL);
        await this.passwordInput.fill(E2E_USER_PASSWORD);
        await this.loginButton.click();
        
    }
    async loginInvalidCredentials(credentials: { email: string; password: string }) {
        await this.emailLoginInput.fill(credentials.email);
        await this.passwordInput.fill(credentials.password);
        await this.loginButton.click();
        await expect(this.errorMessage).toBeVisible();
        
    }
    async startSignUp(credentials: { email: string; name: string},redirectpage: Page) {
        await this.signUpNameInput.fill(credentials.name);
        await this.signUpEmailInput.fill(credentials.email);
        await this.signUpButton.click();        
        
    }
    readonly emailLoginInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;  
    readonly errorMessage: Locator;
    readonly signUpButton: Locator;
    readonly signUpEmailInput: Locator;
    readonly signUpNameInput: Locator;
}