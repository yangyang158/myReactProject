'use strict';

import webpack from 'webpack';
//作用：自动生成 HTML 文件，使用 script 来包含所有你的 webpack bundles
import HtmlWebpackPlugin from 'html-webpack-plugin';
//获取版本的相关信息
import gitRevision from 'git-revision';
//将.css样式打包到一个单独的CSS文件中。因此样式不再被内嵌到JS包中，而是在单独的CSS文件
// import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import merge from 'webpack-merge';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

import moment from 'moment';
import _ from 'lodash';

//获取当前环境
let args = require('node-args');
let ENV = args.env || 'development';
let isProduction = ENV === 'production';
let TARGET = `${__dirname}/dest`;


console.log('__dirname', __dirname)// 为：/Users/candy/个人练习/myReact/public
let port = '6001';
let timetag = moment().format('YYMMDD_HHmmss');

let config = {
    //多个入口文件的格式 {
    //     'app': './src/app.jsx',
    //     'home': './src/home.jsx'
    // }
    // entry: './src/app.jsx',//一个入口文件
    entry: {
        vendor: ['@babel/polyfill', 'react', 'classnames', 'react-router', 'react-dom']
    },
    output: {//输出文件
        path: __dirname + '/dest',//输出文件的路径---必须是绝对路径
        chunkFilename : '[name].[hash:8].js',
        filename: '[name].[hash:8].bundle.js',//多个输出文件
        //filename: "bundle.js",//单个输出文件
        //publicPath: '/public/',//用于指定在生产模式下页面里面引入的资源的路径（link标签的href、script标签的src）

    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', {
                    loader: 'less-loader',
                    options: {
                        strictMath: true,
                    }
                }],
                exclude: require('path').resolve(__dirname, 'dynamic-theme.less')
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {//对JS文件进行编译(包括从ES6转换为ES5)
                test: /\.js$/, 
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {//对jsx文件 编译 成js
                test: /\.jsx$/, 
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {//webpack最终会将各个模块打包成一个文件，项目中图片的地址就找不到了
                // url-loader内置了file-loader(两个都要装)，会把图片打包出来
                //1.文件大小小于limit参数，url-loader将会把文件转为DataURL；
                //2.文件大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader
                test: /\.(png|jpg|gif)(\?[a-z0-9\-=]+)?$/,
                loader: 'url-loader?limit=8192',
            },
            {
                test: /\.(svg?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'url-loader'
            },
            {
                test: require.resolve('moment'),
                loader: 'expose-loader?moment'
            },
            {
                test: require.resolve('lodash'),
                loader: 'expose-loader?_'
            },
        ],
    },
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks:{
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false,
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',
                    priority: -10,
                    reuseExistingChunk: false,
                    test: /node_modules\/(.*)\.js[x]?/
                },
                styles: {
                    name: 'styles',
                    test: /\.(less|css)$/,
                    minChunks: 1,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        }
    },
    resolve: {
        //alias: '',
        extensions: ['.js', '.jsx']
    },
    devtool: 'source-map',//是否可调试
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].[contenthash:8].css'  // use contenthash *
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
    ],
}

function addEntry(){
    //生成多个入口文件
    let pages = require('./page.js');
    _.map(pages, page=>{
        config.entry[page.name] = `./src/${page.name}.jsx`;
        let plugin = new HtmlWebpackPlugin({
            title: page.title,// 用于生成的HTML文件的标题
            filename: `${page.name}.html`, // 生成的HTML文件的名字，默认就是index.html
            template: 'index.ejs',// 有时候，插件自动生成的html文件，并不是我们需要结构，我们需要给它指定一个模板，让插件根据我们给的模板生成html
            inject: 'body',// 有四个选项值 true|body|head|false。true|body:script标签位于html文件的 body 底部；head:插入的js文件位于head标签内；false:不插入生成的js文件，只生成一个纯html
            // minify: {"removeComments": true, "collapseWhitespace": true},//压缩
            // minify: false,//不压缩
            favicon: 'assets/img/favicon.ico',//给定的图标路径，可将其添加到输出html中。
            // excludeChunks: [],//排除特定块
            chunks: ['manifest', 'vendor', page.name],//限定特定的块
            chunksSortMode: 'none',
            banner: {//打包分支、时间、tag标
                branch: gitRevision('branch'),
                tag: gitRevision('tag'),
                date: moment().format('YYMMDD_HHmmss'),
            },
        })
        config.plugins.push(plugin);
    })
}
addEntry();


switch(ENV){
    case 'production':
        config = merge(config, {
            optimization: {
                minimizer: [
                    new UglifyJsPlugin({
                        cache: true,
                        parallel: true,
                        sourceMap: true,
                    }),
                    new OptimizeCSSAssetsPlugin({})  // use OptimizeCSSAssetsPlugin
                ]
            },
            plugins: [
                new CleanWebpackPlugin([TARGET]),
            ]
        });
        break;
    case 'development':
        _.merge(config, {
            devServer: {//webpack-dev-server是一个小型的Node.js Express服务器
                host: 'localhost',
                port: port,
                // hot： true,//热替换
                open:true, // 自动打开浏览器
                openPage: 'app',//此时就会在打开http://localhost:${port}/app
                lazy: false,
                compress: true, //一切服务都启用gzip 压缩
                headers: {
                    'X-Frame-Options': 'SAMEORIGIN',
                    'X-XSS-Protection': '1; mode=block',
                },
                disableHostCheck: true,
                proxy: {
                    //请求带api的接口 自动转发到端口7308
                    '/api'  : {target: 'http://localhost:7308'},
                    '/app'  : {target: `http://localhost:${port}`, pathRewrite: {'$':'.html'}},
                    '/mobile'  : {target: `http://localhost:${port}`, pathRewrite: {'$':'.html'}},
                    '/'  : {target: `http://localhost:${port}`, pathRewrite: {'$':'app.html'}}
                }
            }
        });
        break;
}
module.exports = config;
