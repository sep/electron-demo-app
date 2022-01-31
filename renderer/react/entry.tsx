import React from 'react';
import { render } from 'react-dom'
import Calculator from './Calculator'
import FileViewer from './FileViewer';
import "../common/windowExtensions"


function startChatSession() {
  return window.api.startChatSession();
}

render(
  <div>
    <div><a href="../../dist.ng/index.html">Go to Angular implementation</a></div>
    <div><button onClick={startChatSession}>Start Chat Session</button></div>
    <Calculator />
    <FileViewer />
  </div>,
  document.getElementById('root')
);
