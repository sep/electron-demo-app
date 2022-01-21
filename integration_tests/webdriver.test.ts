import webdriver, { ThenableWebDriver } from 'selenium-webdriver'
import { ChildProcessWithoutNullStreams, exec, execSync } from "child_process";
import * as os from "os";

let driver : ThenableWebDriver = {} as ThenableWebDriver
let child_process : ChildProcessWithoutNullStreams = {} as ChildProcessWithoutNullStreams

const windowsExecutablePath = './out/electron-demo-app-win32-x64/electron-demo-app.exe'
const linuxExecutablePath = './out/electron-demo-app-linux-x64/electron-demo-app'
const macExecutablePath = 'TBD'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
	  binary: linuxExecutablePath
        }
      })
      .forBrowser('chrome') // note: use .forBrowser('electron') for selenium-webdriver <= 3.6.0
      .build()
      child_process.stdout.off('data', listener);
      done();
    }};
    child_process.stdout.on('data', listener);
})

afterAll ((done) => {
  driver.quit().then(() => {
    console.log(os.platform())
    if (os.platform() === "win32"){
      execSync("taskkill /im chromedriver.exe /f");
    } else {
      child_process.kill('SIGINT')
    }
    done();
  })
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