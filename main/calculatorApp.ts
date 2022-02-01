import { app, BrowserWindow, Tray, Menu, ipcMain, dialog } from 'electron'
import path from "path";
import fs from "fs";

export default function calculatorApp(framework: "ng" | "react"){
  const headless = ["1", "true"].includes(process.env["HEADLESS"] ?? "")
  const integrationTest = (process.env["EDA_IT"] ?? "") === "1";

  function createWindow () {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      show: !headless,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      },
    })

    if (framework === "ng")
      win.loadFile('./dist.ng/index.html')
    else
      win.loadFile('./renderer/react/index.html')
    return win;
  }

  let tray: Tray | null = null;
  let calculatorWindow: BrowserWindow | null = null;
  app.whenReady().then(() => {
    calculatorWindow = createWindow()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tray = createTrayIcon(calculatorWindow)

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    })
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      tray?.destroy()
      app.quit()
    }
  })

  function createTrayIcon(window: BrowserWindow) {
    const tray = new Tray('./resources/icon.png')
    const contextMenu = Menu.buildFromTemplate([
      { label: 'Minimize', type: 'normal', click: () => minimize(window) },
      { label: 'Maximize', type: 'normal', click: () => maximize(window) },
    ])
    tray.setToolTip('This is my application.')
    tray.setContextMenu(contextMenu)
    return tray;
  }

  function minimize(window: BrowserWindow) {
    window.hide();
  }

  function maximize(window: BrowserWindow) {
    window.show();
  }

  ipcMain.handle("openFile", async function(event) : Promise<string | null> {
    if (integrationTest) {
      return "Integration Test Ipc Content"
    }
    else {
      const result = await dialog.showOpenDialog(event.sender as unknown as BrowserWindow)
      if (result.canceled) return null;
      const fileContents = fs.readFileSync(result.filePaths[0]);
      return fileContents.toString();
    }
  });
}