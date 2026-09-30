import { expect, Page } from '@playwright/test';

export class PIMCreatePage {
    constructor(private readonly page: Page) {}

    private pimNavMenu = this.page.getByRole('link', { name: 'PIM' });
    private PIMTitle = this.page.getByRole('heading', { name: 'PIM' });

    async goto(){
        await this.pimNavMenu.click();
    }

    async verifyPIMListPageIsVisible() {
        await expect(this.PIMTitle).toBeVisible();
    }

}