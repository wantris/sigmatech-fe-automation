import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';

test.describe('Dashboard - Positive Scenario', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            process.env.ACC_USERNAME!,
            process.env.ACC_PASSWORD!
        );

        await expect(page).toHaveURL(/dashboard/);
    });


    test('TC-007 - Memastikan halaman Dashboard berhasil ditampilkan', async ({page}) => {
        const dashboardPage = new DashboardPage(page);

        await dashboardPage.veryDashboardPageIsVisible();
    });


    test('TC-008 - Memastikan widget Time at Work ditampilkan', async ({page}) => {
        const dashboardPage = new DashboardPage(page);

        await dashboardPage.verifyTimeAtWorkSectionIsVisible();
    });


    test('TC-009 - Memastikan widget My Actions ditampilkan', async ({page}) => {
        const dashboardPage = new DashboardPage(page);

        await dashboardPage.verifyMyActionsSectionIsVisible();
    });


    test('TC-010 - Memastikan Quick Launch dapat digunakan', async ({page}) => {
        const dashboardPage = new DashboardPage(page);

        await dashboardPage.verifyQuickLaunchSectionIsVisible();
        await dashboardPage.clickQuickLaunch('My Leave');
        await expect(page).toHaveURL(/viewMyLeaveList/);
    });


    test('TC-011 - Memastikan grafik distribusi employee ditampilkan', async ({page}) => {
        const dashboardPage = new DashboardPage(page);

        await dashboardPage.verifyDistributionSectionIsVisible();
    });
});


test.describe('Dashboard - Negative Scenario', () => {
    test('TC-012 - Memastikan Dashboard tidak dapat diakses tanpa login', async ({page}) => {

        await page.goto('/web/index.php/dashboard/index');
        await expect(page).toHaveURL(/auth\/login/);
    });
});

