import { expect, Page } from '@playwright/test';

export class PIMListPage {
    constructor(private readonly page: Page) {}

    private pimNavMenu = this.page.getByRole('link', { name: 'PIM' });
    private PIMTitle = this.page.getByRole('heading', { name: 'PIM' });

    async goto(){
        await this.pimNavMenu.click();
    }

    async verifyPIMListPageIsVisible() {
        await expect(this.PIMTitle).toBeVisible();
    }

    async EmployeeNameSearch(name: string) {
        const nameSearchInput = this.page
            .locator('.oxd-input-group')
            .filter({ hasText: 'Employee Name' })
            .getByPlaceholder('Type for hints...');

        await nameSearchInput.fill(name);
        await this.page.getByRole('button', { name: 'Search' }).click();
    }

    async EmployeeIdeSearch(id: string) {
        const idSearchInput = this.page
            .locator('.oxd-input-group')
            .filter({ hasText: 'Employee Id' })
            .locator('input');

        await idSearchInput.fill(id);
        await this.page.getByRole('button', { name: 'Search' }).click();
    }
    
}