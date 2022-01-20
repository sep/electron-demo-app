import webdriver, { ThenableWebDriver } from 'selenium-webdriver'

let driver : ThenableWebDriver = {} as ThenableWebDriver

beforeAll (() => {
  driver = new webdriver.Builder()
  // The "9515" is the port opened by chrome driver.
  .usingServer('http://localhost:9515')
  .withCapabilities({
    'goog:chromeOptions': {
      // Here is the path to your Electron binary.
      binary: './out/electron-demo-app-win32-x64/electron-demo-app.exe'
    }
  })
  .forBrowser('chrome') // note: use .forBrowser('electron') for selenium-webdriver <= 3.6.0
  .build()
})

afterAll (() => {
  driver.quit()
});


test('vacuous', () => {
  const firstOperand = driver.findElement(webdriver.By.id('firstOperand'))
  const secondOperand = driver.findElement(webdriver.By.id('secondOperand'))
  const sumButton = driver.findElement(webdriver.By.id('sum'))
  const output = driver.findElement(webdriver.By.id('result'))

  firstOperand.sendKeys('100');
  secondOperand.sendKeys('50')
  sumButton.click()
  return driver.wait(() => {
    return output.getText().then((resultText) => {
      return resultText === "The result is 150"
    })
  })
});