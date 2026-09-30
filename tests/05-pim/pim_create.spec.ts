import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { PIMCreatePage } from '../../pages/pim/PimCreatePage';
import { PIMListPage } from '../../pages/pim/PimListPage';

test.describe('PIM Create - Positive Scenario', () => {
    let pimPage: PIMCreatePage;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
       

        await loginPage.goto();

        await loginPage.login(
            process.env.ACC_USERNAME!,
            process.env.ACC_PASSWORD!
        );

        await expect(page).toHaveURL(/dashboard/);

        pimPage = new PIMCreatePage(page);
        await pimPage.goto();
    });


});