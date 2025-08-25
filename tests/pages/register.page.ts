import {expect,type Page,type Locator}from '@playwright/test';
import {BASE_URL} from '../config/env';
import { UserSignup } from '../builders/user-builder';

export class RegisterPage{
    constructor(private readonly page: Page) {
        this.nameInput = page.getByRole('textbox', { name: 'Name *', exact: true })
        this.firstnameInput=page.getByRole('textbox', { name: 'First name *' })
        this.lastNameInput = page.getByRole('textbox', { name: 'Last name *' });
        this.emailInput = page.getByRole('textbox', { name: 'Email *' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password *' });
        this.address1Input = page.getByRole('textbox', { name: 'Address *' });
        this.stateInput= page.getByRole('textbox', { name: 'State *' });
        this.cityInput= page.getByRole('textbox', { name: 'City *' });
        this.zipCodeInput= page.locator('#zipcode');
        this.mobileNumberInput= page.locator('[data-qa="mobile_number"]');;
        this.registerButton = page.getByRole('button', { name: 'Create Account' });
        this.successMessage = page.getByText('Registration successful!');
    }
    readonly nameInput: Locator;
    readonly firstnameInput: Locator;
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
        await expect(this.nameInput).toBeVisible();
        await expect(this.page).toHaveURL(`${BASE_URL}/signup`);
        await expect(this.nameInput).toHaveValue(name);
        await expect(this.emailInput).toHaveValue(email);
    }
    async completeRegistration(user: UserSignup) {
        await expect(this.page).toHaveURL(`${BASE_URL}/signup`);
        await this.passwordInput.fill(user.password);
        await this.firstnameInput.fill(user.name);
        await this.lastNameInput.fill(user.lastname);
        await this.address1Input.fill(user.address);
        await this.stateInput.fill(user.state);
        await this.cityInput.fill(user.city);
        await this.zipCodeInput.fill(user.zipcode);
        await this.mobileNumberInput.fill(user.phone);
        await this.registerButton.click();
    }
}