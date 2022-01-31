import { Component, Input } from '@angular/core';
import "../../../common/windowExtensions";

@Component({
  selector: 'file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.css']
})


export class FileViewerComponent {
  @Input() Content = {Value: ""};
  
  async openFile() {
    const data = await window.api.openFile();
    if (data === null){
        console.log("Browsing canceled by user.")
        return;
    }
    this.Content.Value = data;
  }
}
