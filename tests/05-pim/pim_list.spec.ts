import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { PIMListPage } from '../../pages/pim/PimListPage';

test.describe('PIM List - Positive Scenario', () => {
    let pimPage: PIMListPage;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
       

        await loginPage.goto();

        await loginPage.login(
            process.env.ACC_USERNAME!,
            process.env.ACC_PASSWORD!
        );

        await expect(page).toHaveURL(/dashboard/);

        pimPage = new PIMListPage(page);
        await pimPage.goto();
    });


    test('Memastikan halaman daftar PIM Employee berhasil ditampilkan', async ({page}) => {
        await pimPage.verifyPIMListPageIsVisible();

        await expect(page).toHaveURL("/web/index.php/pim/viewEmployeeList");
    });

    test('Memastikan tabel daftar pim employee berhasil ditampilkan', async ({page}) => {
        await expect(page.getByText(/\(\d+\) Records Found/)).toBeVisible();
        await expect(page.getByRole('table')).toBeVisible();
    });

    test('Memastikan data pim employee berhasil ditampilkan', async ({page}) => {
        const pimTable = page.getByRole('table');
        const pimRowTable = page.getByRole('row');

        await expect(page.getByText(/\(\d+\) Records Found/)).toBeVisible();
        await expect(pimTable).toBeVisible();
        await expect(pimRowTable).not.toHaveCount(1);
    });

    test('Mencari data pim epmloyee berdsarkan nama', async ({page}) => {

        await pimPage.EmployeeNameSearch('bala kumar');
       
        const pimTable = page.getByRole('table');
        const pimRowTable = page.getByRole('row');

        await expect(pimTable).toBeVisible();
        await expect(pimRowTable).not.toHaveCount(0);
        await expect(
            page.getByRole('cell', { name: 'bala kumar' })
        ).toBeVisible();
    });

    test('Mencari data pim epmloyee berdsarkan id', async ({page}) => {
        await pimPage.EmployeeIdeSearch('688662406');

        const pimTable = page.getByRole('table');
        const pimRowTable = page.getByRole('row');

        await expect(pimTable).toBeVisible();
        await expect(pimRowTable).not.toHaveCount(0);
        await expect(
            page.getByRole('cell', { name: '688662406' })
        ).toBeVisible();
    });


});