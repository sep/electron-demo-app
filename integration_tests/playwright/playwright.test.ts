import { ElectronApplication, _electron as electron } from 'playwright';
import 'regenerator-runtime/runtime'
import { test, expect } from '@playwright/test'
import { getExecutablePath } from '../helpers'

let electronApp: ElectronApplication

test.beforeAll(async () => {
  electronApp = await electron.launch({
    executablePath: getExecutablePath()
  })
})

test.afterAll(async () => {
  await electronApp.close()
})

test('page has correct header and title', async () => {
  const page = await electronApp.firstWindow()
  const title = await page.title()
  expect(title).toBe('Hello World!')
  const header = await page.locator("h1").innerText();
  expect(header).toBe('Hello World!')
})

test('should sum operands', async () => {
  const page = await electronApp.firstWindow()
  await page.fill("#firstOperand", "100")
  await page.fill("#secondOperand", "50")
  await page.locator(`button:has-text("+")`).click();
  const actualResult = await page.locator("#result").innerText();
  expect(actualResult).toBe("The result is 150")
})

test('navigate to angular page and sum operands', async() => {
  const page = await electronApp.firstWindow()
  await page.locator(`a`).click()
  await page.waitForLoadState()
  await page.fill("#firstOperand > input", "100", {timeout: 0})
  await page.fill("#secondOperand> input", "50", {timeout: 0})
  await page.locator(`button:has-text("+")`).first().click({timeout: 0});
  const actualResult = await page.locator("label").innerHTML({timeout:0});
  expect(actualResult).toBe("150")
})
