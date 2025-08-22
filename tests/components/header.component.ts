import {type Locator , type Page} from '@playwright/test';
export class Header {
    constructor(private readonly page: Page) {
        this.navigateToLogin = page.getByRole('link', { name: ' Signup / Login' });
        this.navigateToCart = page.getByRole('link', { name: ' Cart' });
        this.navigateToProducts = page.getByRole('link', { name: ' Products' });

    }
    readonly navigateToLogin: Locator;
    readonly navigateToCart: Locator;
    readonly navigateToProducts: Locator;

    async goToLogin() {
        await this.navigateToLogin.click();
    }
    async goToCart() {
        await this.navigateToCart.click();
    }
    async goToProducts() {
        await this.navigateToProducts.click();
    }
}