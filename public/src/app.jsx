import '@babel/polyfill';
import React from 'react';
import {render} from 'react-dom';
import Router from './app/router.jsx';
import './app.css';

let app = document.createElement('div');
document.body.appendChild(app);
render(
    <Router />, app
);

