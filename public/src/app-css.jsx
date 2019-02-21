import '@babel/polyfill';
import '@babel/polyfill';
import React from 'react';
import {render} from 'react-dom';
import AppCss from './app-css/index.jsx';

let app = document.createElement('div');
document.body.appendChild(app);

render(
    <AppCss />, app
);

