import { ElectronApplication, Page, _electron as electron } from 'playwright';
import 'regenerator-runtime/runtime'
import { test, expect } from '@playwright/test'
import { getExecutablePath } from '../helpers'

test.describe("Electron Demo App Integration Tests", () => {
  test.describe('react page tests', () =>{
    let electronApp: ElectronApplication
    let page: Page;
    
    test.beforeAll(async () => {
      electronApp = await launchElectron("react-calculator")
      page = await electronApp.firstWindow()
    })
    
    test.afterAll(async () => {
      await electronApp.close()
    })
  

    test('page has correct header and title', async () => {
      const title = await page.title()
      expect(title).toBe('Hello World!')
      const header = await page.locator("h1").innerText();
      expect(header).toBe('React Calculator.')
    })
    
    test('should sum operands', async () => {
      await page.fill("#firstOperand", "100")
      await page.fill("#secondOperand", "50")
      await page.locator(`button:has-text("+")`).click();
      const actualResult = await page.locator("#result").innerText();
      expect(actualResult).toBe("The result is 150")
    })
    
    test('Loads data via ipc when open file button clicked', async() => {
      await page.click("button#open-file")
      await page.waitForTimeout(1); // wait for IPC and react update cycle
      const contents = await page.inputValue('#opened-file');
      expect(contents).toBe("Integration Test Ipc Content")
    })
  })

  test.describe('angular page tests', () =>{
    let electronApp: ElectronApplication
    let page: Page;
    
    test.beforeAll(async () => {
      electronApp = await launchElectron("ng-calculator")
      page = await electronApp.firstWindow()
    })
    
    test.afterAll(async () => {
      await electronApp.close()
    })

    test('navigate to angular page and sum operands', async() => {
      await page.fill("#firstOperand > input", "100", {timeout: 0})
      await page.fill("#secondOperand> input", "50", {timeout: 0})
      await page.click(`button:has-text("+")`);
      const actualResult = await page.locator("label").innerHTML({timeout:0});
      expect(actualResult).toBe("150")
    })
    
    test("Loads data via ipc when open file button clicked 2", async () => {
      await page.click("button#open-file")
      await page.waitForTimeout(1); // wait for IPC and react update cycle
      const contents2 = await page.inputValue('#opened-file');
      expect(contents2).toBe("Integration Test Ipc Content")
    })
  })
})

async function launchElectron(app: string): Promise<ElectronApplication> {
  return await electron.launch({
    executablePath: getExecutablePath(),
    env: {
      ...process.env,
      HEADLESS: "1",
      EDA_IT: "1"
    },
    args: [
      `app=${app}`
    ]
  });
}

