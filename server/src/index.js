const Koa = require('koa');
const serve = require('koa-static');
const logger = require('Koa-logger');
const bodify = require('koa-body');
const router = require('koa-router-decors');


const chalk = require('chalk');
const path = require('path');
import './proxy.js';

const app = new Koa();

app.use(serve(__dirname + '../public'));
app.use(logger());
app.use(router.load('/api', `${__dirname}/mocker`).routes());
//使用非严格模式，解析HTTP DELETE请求的请求体Body
app.use(bodify({strict: false}));

const port = 7310;
app.listen(port);
console.log(`HRONE static server started: http://localhost:${chalk.red(port)}`);