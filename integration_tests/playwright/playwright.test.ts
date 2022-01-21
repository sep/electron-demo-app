import { ElectronApplication, Page, _electron as electron } from 'playwright';
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

let page: Page

test('page has correct header and title', async () => {
  page = await electronApp.firstWindow()
  const title = await page.title()
  expect(title).toBe('Hello World!')
  const header = await page.locator("h1").innerText();
  expect(header).toBe('Hello World!')
})

test('should sum operands', async () => {
  page = await electronApp.firstWindow()
  await page.fill("#firstOperand", "100")
  await page.fill("#secondOperand", "50")
  await page.locator(`button:has-text("+")`).click();
  const actualResult = await page.locator("#result").innerText();
  expect(actualResult).toBe("The result is 150")
})
