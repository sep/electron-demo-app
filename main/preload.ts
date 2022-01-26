import { contextBridge, ipcRenderer } from "electron";



// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "ipc", {
        async invoke(channel: string): Promise<unknown> {
            const validChannels = ["openFile"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                return ipcRenderer.invoke(channel);
            } else {
                console.log("received invalid ipc message", channel)
            }
            return Promise.resolve();
        },
    }
);
