import { expect, Page } from '@playwright/test';

export class NavigationPage {
    constructor(private readonly page: Page) {}

    async clickMenu(menuName: string) {
        await this.page.getByRole('link', { name: menuName }).click();
    }

    async verifyMenuActive(menuName: string) {
        const menuItem = this.page.getByRole('link', { name: menuName });
        
        await expect(menuItem).toHaveClass(/active/);
    }
}