import {expect,type Page,type Locator}from '@playwright/test';
import {BASE_URL} from '../config/env';

export class RegisterPage{
    constructor(private readonly page: Page) {
        this.nameInput = page.getByRole('textbox', { name: 'Name *', exact: true })
        this.emailInput = page.getByPlaceholder('Email Address');
        this.passwordInput = page.getByPlaceholder('Password');
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.successMessage = page.getByText('Registration successful!');
    }
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly registerButton: Locator;
    readonly successMessage: Locator;
    async goto() {
        await this.page.goto(`${BASE_URL}/signup`);
    }
    async verifyRegistrationRedirect(name:string, email:string) {
        await expect(this.page).toHaveURL(`${BASE_URL}/signup`);
        await expect(this.nameInput).toHaveValue(name);
        await expect(this.emailInput).toHaveValue(email);
    }
}