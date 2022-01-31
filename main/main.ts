import { app, BrowserWindow, Tray, Menu, ipcMain, dialog } from 'electron'
import path from "path";
import fs from "fs";
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

interface ChatWindow {
  Window: BrowserWindow,
  Name: string
}

const  chatWindows: ChatWindow[] = [];

ipcMain.on("startChatSession", async function() {
  tray?.destroy()
  tray = null

  createChatWindow("jake");
  createChatWindow("rob");
  createChatWindow("jordan");
  
  calculatorWindow?.close()
  calculatorWindow = null;
});

ipcMain.handle("whoAmI", async function(event): Promise<string>{
  const item = chatWindows.find(cw => cw.Window.id === event.sender.id);
  if (!item) throw new Error("Unable to find whoami data")
  return item.Name
})

function createChatWindow (user: string) {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
  })

  chatWindows.push({Window: win, Name: user})

  win.loadFile('./renderer/chat/index.html')
  return win;
}

ipcMain.on("sendGlobalMessage", (event, user, message: string) => {
  if (message.startsWith("/")) {
    const destination = message.split(" ")[0].substring(1);
    message = `(whisper to ${destination}) ` + message.substring(destination.length + 2)
    chatWindows.forEach(cw => {
      if (cw.Name === destination || cw.Window.id === event.sender.id)
      {
        cw.Window.webContents.send("receiveMessage", user, message)}
      }
    )
  } else {
    chatWindows.forEach(cw => cw.Window.webContents.send("receiveMessage", user, message))
  }
})