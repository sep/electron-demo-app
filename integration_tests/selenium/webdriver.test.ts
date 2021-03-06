import webdriver, { ThenableWebDriver } from 'selenium-webdriver'
import { ChildProcessWithoutNullStreams, exec, execSync } from "child_process";
import * as os from "os";
import 'regenerator-runtime/runtime'
import { getExecutablePath } from '../helpers'
import { Options } from 'selenium-webdriver/chrome';

let driver : ThenableWebDriver = {} as ThenableWebDriver
let child_process : ChildProcessWithoutNullStreams = {} as ChildProcessWithoutNullStreams

beforeAll ((done) => {
  child_process = exec("npx chromedriver")
  const listener = (data: string) => { 
    if (data.includes("ChromeDriver was started successfully")){
      driver = new webdriver.Builder()
      // The "9515" is the port opened by chrome driver.
      .usingServer('http://localhost:9515')
      .withCapabilities({
        'goog:chromeOptions': {
          // Here is the path to your Electron binary.
          binary: getExecutablePath(),
        },
      })
      .forBrowser('chrome') // note: use .forBrowser('electron') for selenium-webdriver <= 3.6.0
      .build()
      child_process.stdout.off('data', listener);
      done();
    }};
    child_process.stdout.on('data', listener);
})

afterAll (async () => {
  await driver.quit();
  if (os.platform() === "win32"){
    execSync("taskkill /im chromedriver.exe /f");
  } else {
    execSync('pkill chromedriver')
  }
});


test('should sum operands', async () => {
  const firstOperand = driver.findElement(webdriver.By.id('firstOperand'))
  const secondOperand = driver.findElement(webdriver.By.id('secondOperand'))
  const sumButton = driver.findElement(webdriver.By.id('sum'))
  const output = driver.findElement(webdriver.By.id('result'))

  firstOperand.sendKeys('100');
  secondOperand.sendKeys('50')
  sumButton.click()
  const text = await output.getText();
  expect(text).toBe("The result is 150")
});