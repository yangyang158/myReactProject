import webpack from 'webpack';
//作用：项目启动后自动在浏览器 打开
import OpenBrowserPlugin from 'open-browser-webpack-plugin';
//作用：自动生成 HTML 文件，使用 script 来包含所有你的 webpack bundles
import HtmlWebpackPlugin  from 'html-webpack-plugin';
//获取版本的相关信息
import gitRevision from 'git-revision';
//将.css样式打包到一个单独的CSS文件中。因此样式不再被内嵌到JS包中，而是在单独的CSS文件
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
//打包完生成压缩文件
import ZipPlugin from 'zip-webpack-plugin';
import moment from 'moment';
import _ from 'lodash';

//获取当前环境
let args = require('node-args');
let ENV = args.env || 'development';
let isProduction = ENV === 'production';

console.log('__dirname', __dirname)// 为：/Users/candy/个人练习/myReact/public
let port = '6001';
let timetag = moment().format('YYMMDD_HHmmss');

let config = {
    //多个入口文件的格式 {
    //     'app': './src/app.jsx',
    //     'home': './src/home.jsx'
    // }
    // entry: './src/app.jsx',//一个入口文件
    entry: {},
    output: {//输出文件
        path: __dirname + '/dest',//输出文件的路径---必须是绝对路径
        chunkFilename : '[name].[hash:8].js',
        filename: '[name].[hash:8].bundle.js',//多个输出文件
        //filename: "bundle.js",//单个输出文件
        //publicPath: '/public/',//用于指定在生产模式下页面里面引入的资源的路径（link标签的href、script标签的src）

    },
    module: {
        rules: [
            // {//解析css, 会将CSS打包到JS文件中
            //     test: /\.css$/, 
            //     use: ['style-loader', 'css-loader'],
            // },
            // {
            //     //解析css, 会将CSS单独打包成一个文件
            //     test: /\.css$/,
            //     loader: ExtractTextWebpackPlugin.extract({
            //         fallback: "style-loader",
            //         use: "css-loader"
            //     })
            // },
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
            }
        ],
    },
    resolve: {
        //alias: '',
        extensions: ['.js', '.jsx']
    },
    devtool: 'source-map',//是否可调试
    plugins: [
        new ExtractTextWebpackPlugin({
            filename: '[name].[contenthash:8].css',
            allChunks: true//将多个CSS文件打包到一个CSS文件
        }),
        new webpack.HotModuleReplacementPlugin(),
        // new OpenBrowserPlugin({
        //     url: `http://localhost:${port}/app`,
        // }),
        new ZipPlugin({
            path: __dirname,
            filename: `${timetag}_dest.zip`,
        }),
        // new HtmlWebpackPlugin({//单个入口文件生成html文件
        //     title: 'app',// 用于生成的HTML文件的标题
        //     filename: 'app.html', // 生成的HTML文件的名字，默认就是index.html
        //     template: 'index.ejs',// 有时候，插件自动生成的html文件，并不是我们需要结构，我们需要给它指定一个模板，让插件根据我们给的模板生成html
        //     inject: 'body',// 有四个选项值 true|body|head|false。true|body:script标签位于html文件的 body 底部；head:插入的js文件位于head标签内；false:不插入生成的js文件，只生成一个纯html
        //     // minify: {"removeComments": true, "collapseWhitespace": true},//压缩
        //     // minify: false,//不压缩
        //     favicon: 'assets/img/favicon.ico',//给定的图标路径，可将其添加到输出html中。
        //     // excludeChunks: [],//排除特定块
        //     // chunks: [],//限定特定的块
        //     banner: {//打包分支、时间、tag标
        //         //branch: gitRevision('branch'),
        //         //tag: gitRevision('tag'),
        //         date: moment().format('YYMMDD_HHmmss'),
        //     },
        // }),

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
            banner: {//打包分支、时间、tag标
                //branch: gitRevision('branch'),
                //tag: gitRevision('tag'),
                date: moment().format('YYMMDD_HHmmss'),
            },
        })
        config.plugins.push(plugin);
    })
}
addEntry();


switch(ENV){
    case 'production':
        config.module.rules.push({
            //解析css, 会将CSS单独打包成一个文件
            test: /\.css$/,
            loader: ExtractTextWebpackPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
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
        config.module.rules.push({
            test: /\.css$/, 
            use: ['style-loader', 'css-loader'],
        });
        break;
}
module.exports = config;
