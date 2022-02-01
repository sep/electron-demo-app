import { app, BrowserWindow, ipcMain } from 'electron'
import path from "path";

export default function chatApp() {
  app.whenReady().then(() => {
    createChatWindow("jake");
    createChatWindow("rob");
    createChatWindow("jordan");
    createBackgroundChatter("bg-chatter");
  })

  interface ChatWindow {
    Window: BrowserWindow,
    Name: string
  }

  const  chatWindows: ChatWindow[] = [];

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

    win.on("closed", () => {
      if (BrowserWindow.getAllWindows().every(w => !w.isVisible())) app.quit();
    })

    win.loadFile('./renderer/chat/index.html')
    return win;
  }

  function createBackgroundChatter (user: string): BrowserWindow {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      show: false,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
    })

    chatWindows.push({Window: win, Name: user})

    win.loadFile('./renderer/background-chatter/index.html')
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
}