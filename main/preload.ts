import { contextBridge, ipcRenderer } from "electron";

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
        async openFile(): Promise<string|null> {
            return ipcRenderer.invoke("openFile");
        },

        async startChatSession(): Promise<void> {
            return ipcRenderer.send("startChatSession");
        },

        async whoAmI(): Promise<string> {
            return ipcRenderer.invoke("whoAmI");
        },

        async sendGlobalMessage(user: string, message: string): Promise<void> {
            return ipcRenderer.send("sendGlobalMessage", user, message);
        },

        receiveMessage(callback: (user: string, message: string) => void): void {
            ipcRenderer.on("receiveMessage", (_, user, message) => callback(user, message))
        }
    }
);
