import {expect,type Page,type Locator}from '@playwright/test';
import {BASE_URL} from '../config/env';
export class AccountCreatedPage{
    constructor(private readonly page: Page) {
        this.accountCreatedMessage = page.getByText('Account Created!');
    }
    readonly continueButton: Locator;
    readonly accountCreatedMessage: Locator;
    async verifyAccountCreated() {
        await expect(this.page).toHaveURL(`${BASE_URL}/account_created`);
        await expect(this.accountCreatedMessage).toBeVisible();
    }
 
}