import '@babel/polyfill';
import '@babel/polyfill';
import React from 'react';
import {render} from 'react-dom';
import Moblie from './mobile/index.jsx';

let app = document.createElement('div');
document.body.appendChild(app);

render(
    <Moblie />, app
);

