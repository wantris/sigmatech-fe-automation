import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login', () => {

    test('TC-001 - Login dengan username dan password valid', async ({page}) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(
            process.env.ACC_USERNAME!,
            process.env.ACC_PASSWORD!
        );

        await loginPage.assertLoginSuccess();
    });


    test('TC-002 - Login menggunakan tombol Enter', async ({page}) => {

        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.loginWithEnterKey(
            process.env.ACC_USERNAME!,
            process.env.ACC_PASSWORD!
        );

        await loginPage.assertLoginSuccess();
    });


    test('TC-003 - Login dengan password salah', async ({page}) => {

        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(
            process.env.ACC_USERNAME!,
            'wrong-password'
        );

        await loginPage.assertLoginFailure();
    });

    test('TC-004 - Login dengan username salah', async ({page}) => {

        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(
            'wrong-username',  
            process.env.ACC_PASSWORD!
        );

        await loginPage.assertLoginFailure();
    });

    test('TC-005 - Login tanpa mengisi username', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();

        await loginPage.login(
            '',
            process.env.ACC_PASSWORD!
        );

        await expect(page.getByText('Required')).toBeVisible();
    });

    test('TC-006 - Login tanpa mengisi password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();

        await loginPage.login(
            process.env.ACC_USERNAME!,
            ''
        );

        await expect(page.getByText('Required')).toBeVisible();
    });
});