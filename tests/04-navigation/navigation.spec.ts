import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { NavigationPage } from '../../pages/NavigationPage';

const menus = [
  {
    testCaseId: '019',
    name: 'Dashboard',
    url: /dashboard/,
  },
  {
    testCaseId: '020',
    name: 'PIM',
    url: /pim/,
  },
  {
    testCaseId: '021',
    name: 'Leave',
    url: /leave/,
  },
  {
    testCaseId: '022',
    name: 'Time',
    url: /time/,
  },
];

test.describe('Navigation Menu Tests - Positive Scenario', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            process.env.ACC_USERNAME!,
            process.env.ACC_PASSWORD!
        );

        await expect(page).toHaveURL(/dashboard/);
    });

    for (const menu of menus) {
        test(`TC-${menu.testCaseId} - Memastikan menu ${menu.name} dapat digunakan`, async ({ page }) => {
            const navigationPage = new NavigationPage(page);

            await navigationPage.clickMenu(menu.name);
            await expect(page).toHaveURL(new RegExp(menu.url));
        });
    }
});

test.describe('Navigation Menu Tests - Negative Scenario', () => {

  test('TC-023 - Memastikan menu tidak dapat diakses tanpa login', async ({ page }) => {
      await page.goto('/web/index.php/dashboard/index');
      await expect(page).toHaveURL(/auth\/login/);
    });
});