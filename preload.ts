import { contextBridge, ipcRenderer } from "electron";

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  "api", {
      send: (channel: string, result: any) => {
          // whitelist channels
          const validChannels = ["sum"];
          if (validChannels.includes(channel)) {
              ipcRenderer.send(channel, result);
          }
      },
      receive: (channel: string, func: (firstOperand: any, secondOperand: any) => void) => {
          const validChannels = ["fromMain"];
          if (validChannels.includes(channel)) {
              // Deliberately strip event as it includes `sender` 
              ipcRenderer.on(channel, (event, firstOperand, secondOperand) => func(firstOperand, secondOperand));
          }
      }
  }
);