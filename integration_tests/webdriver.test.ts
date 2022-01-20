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
  driver.get('https://www.google.com')
  driver.findElement(webdriver.By.name('q')).sendKeys('webdriver')
  driver.findElement(webdriver.By.name('btnG')).click()
  return driver.wait(() => {
    return driver.getTitle().then((title) => {
      return title.trim() === 'Hello World!'
    })
  }, 1000)
});