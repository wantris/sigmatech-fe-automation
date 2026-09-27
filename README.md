Regression Automation testing menggunakan Playwright + TypeScript.

🚀 Installation
Install dependencies:
```bash
npm install
```
⚡Install Playwright browser:
```bash
npx playwright install
```
⚙️ Environment
Buat file `.env`:
```env
BASE_URL=https://opensource-demo.orangehrmlive.com
ORANGEHRM_USERNAME=Admin
ORANGEHRM_PASSWORD=admin123
```
▶️ Run Test
Run semua test:
```bash
npx playwright test
```
📊 Test Report
Setelah test selesai, buka HTML report:
```bash
npx playwright show-report
```
🎯 Test Coverage
    - Login
    - Dashboard
    - Quick Launch
    - Navigation