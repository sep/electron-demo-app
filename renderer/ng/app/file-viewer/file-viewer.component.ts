import { Component, Input } from '@angular/core';

declare global {
  interface Window {
      ipc: {
          invoke(channel: string): Promise<unknown>
      }
  }
}

@Component({
  selector: 'file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.css']
})


export class FileViewerComponent {
  @Input() Content = {Value: ""};
  
  async openFile() {
    const data = await window.ipc.invoke("openFile") as string|null;
    if (data === null){
        console.log("Browsing canceled by user.")
        return;
    }
    this.Content.Value = data;
  }
}
