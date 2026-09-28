import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { quickLaunchMenus } from '../../data/testData';

test.describe('Positive Scenario - Quick Launch Menu Tests', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(
            process.env.ACC_USERNAME!,
            process.env.ACC_PASSWORD!
        );

        await loginPage.assertLoginSuccess();
    });

    for (const menu of quickLaunchMenus) {
        test(`TC-${menu.testCaseId} - Memastikan shortcut ${menu.name} dapat digunakan`, 
            async ({ page }) => {
                const dashboardPage = new DashboardPage(page);

                await dashboardPage.veryDashboardPageIsVisible();
                await dashboardPage.clickQuickLaunch(menu.name);
                await expect(page).toHaveURL(
                    new RegExp(menu.expectedUrl)
                );
                
        });
    }

});


test.describe('Quick Launch Menu Tests - Negative Scenario ', () => {

    test('TC-018 - Memastikan shortcut tidak dapat digunakan tanpa login', async ({ page }) => {

        await page.goto('/web/index.php/dashboard/index');
        await expect(page).toHaveURL(/auth\/login/);
    });
});