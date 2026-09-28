import { expect, Page } from '@playwright/test';

export class DashboardPage {
    constructor(private readonly page: Page) {}

    private dashboardTitle =  this.page.getByRole('heading', { name: 'Dashboard' });;
    private timeAtWorkSection = this.page.getByText('Time at Work');
    private myActionsSection = this.page.getByText('My Actions');
    private quickLaunchSection = this.page.getByText('Quick Launch');
    private buzzSection = this.page.getByText('Buzz Latest Posts');
    private employeesOnLeaveSection = this.page.getByText('Employees on Leave Today');
    private employeeDistributionSection = this.page.getByText('Employee Distribution by Sub Unit');
    private distributionByLocation  = this.page.getByText('Employee Distribution by Location');

    async goto() {
        await this.page.goto('/web/index.php/dashboard/index');
    }

    async veryDashboardPageIsVisible() {
        await expect(this.dashboardTitle).toBeVisible();
    }

    async verifyTimeAtWorkSectionIsVisible() {
        await expect(this.timeAtWorkSection).toBeVisible();
    }

    async verifyMyActionsSectionIsVisible() {
        await expect(this.myActionsSection).toBeVisible();
    }

    async verifyQuickLaunchSectionIsVisible() {
        await expect(this.quickLaunchSection).toBeVisible();
    }

    async verifyBuzzSectionIsVisible() {
        await expect(this.buzzSection).toBeVisible();
    }

    async verifyEmployeesOnLeaveSectionIsVisible() {
        await expect(this.employeesOnLeaveSection).toBeVisible();
    }

    async verifyDistributionSectionIsVisible() {
        await expect(this.distributionByLocation).toBeVisible();
        await expect(this.employeeDistributionSection).toBeVisible();
    }

    async clickQuickLaunch(name: string) {
        const button = await this.page
            .locator(`button[title="${name}"]`)

        await expect(button).toBeVisible();
        await button.click();
    }

}