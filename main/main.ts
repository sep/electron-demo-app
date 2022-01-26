import { app, BrowserWindow, Tray, Menu, ipcMain, dialog } from 'electron'
import path from 'path'
import fs from "fs";
const headless = ["1", "true"].includes(process.env["HEADLESS"] ?? "")

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    show: !headless,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  console.log(process.cwd())
  win.loadFile('index.html')
  return win;
}
let tray: Tray | null = null;
app.whenReady().then(() => {
  const window = createWindow()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  tray = createTrayIcon(window)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
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
  const result = await dialog.showOpenDialog(event.sender as unknown as BrowserWindow)
  if (result.canceled) return null;
  const fileContents = fs.readFileSync(result.filePaths[0]);
  return fileContents.toString();
});
