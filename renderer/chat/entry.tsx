import React from 'react';
import { render } from 'react-dom'
import "../common/windowExtensions"
import ChatInput from './ChatInput';
import ChatOutput from './ChatOutput';
import Name from "./name";



render(
  <div>
    <Name />
    <div><ChatInput /></div>
    <div><ChatOutput /></div>
  </div>,
  document.getElementById('root')
);

