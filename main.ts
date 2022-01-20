import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow;

async function createWindow() {

  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      // enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js") // use a preload script
    }
  });

  // Load app
  win.loadFile(path.join(__dirname, "index.html"));

  // rest of code..
}

app.on("ready", createWindow);

ipcMain.on("sum", (event, firstOperand, secondOperand) => {
  console.log(`received sum: ${firstOperand}, ${secondOperand}`)
  var first = parseInt(firstOperand)
  var second = parseInt(secondOperand)
  var sum = first + second
  // Send result back to renderer process
  win.webContents.send("newResult", sum);
});
