import { type Locator, type Page } from "@playwright/test";
export class LoginSignupPage{
    constructor(private readonly page: Page) {
        this.emailInput = page.getByPlaceholder('Email');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.getByText('Invalid email or password.');
    }
    goto() {
        return this.page.goto('/login');
    }
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;  
    readonly errorMessage: Locator;
    
}