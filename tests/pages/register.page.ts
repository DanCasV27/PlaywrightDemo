import {expect,type Page,type Locator}from '@playwright/test';
import {BASE_URL} from '../config/env';
import { UserSignup } from '../builders/user-builder';

export class RegisterPage{
    constructor(private readonly page: Page) {
        this.nameInput = page.getByRole('textbox', { name: 'Name *', exact: true })
        this.lastNameInput = page.getByRole('textbox', { name: 'Last name *' });
        this.emailInput = page.getByPlaceholder('Email Address');
        this.address1Input = page.getByRole('textbox', { name: 'Address * (Street address, P.' });
        this.passwordInput = page.getByPlaceholder('Password');
        this.registerButton = page.getByRole('button', { name: 'Create Account' });
        this.successMessage = page.getByText('Registration successful!');
    }
    readonly nameInput: Locator;
    readonly lastNameInput: Locator;
    readonly address1Input: Locator;
    readonly countyInput: Locator;
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipCodeInput: Locator;
    readonly mobileNumberInput: Locator;
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
    async completeRegistration(user: UserSignup) {
        await this.passwordInput.fill(user.password);
        await this.lastNameInput.fill(user.lastname);
        await this.address1Input.fill(user.address);
        await this.stateInput.fill(user.state);
        await this.cityInput.fill(user.city);
        await this.zipCodeInput.fill(user.zipcode);
        await this.mobileNumberInput.fill(user.phone);
        await this.registerButton.click();
        await expect(this.successMessage).toBeVisible();
    }
}