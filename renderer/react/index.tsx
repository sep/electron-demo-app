import React from 'react';
import { render } from 'react-dom'
import Calculator from './Calculator'
import FileViewer from './FileViewer';

render(
  <div>
    <Calculator />
    <FileViewer />
    </div>,
  document.getElementById('root')
);
