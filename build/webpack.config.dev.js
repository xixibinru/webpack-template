const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.config.base');
const config = require('../config/config');
const webpack = require('webpack');


module.exports = merge(base, {
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js', //非chunk（使用ES6 import()或require.ensure（）方法动态导入的）文件名字  
        path: config.pathname.dist
    },
    // module: {
       
    // },
    devtool: "cheap-module-eval-source-map", //cheap-module-eval-source-map
    devServer: {
        contentBase: path.join(__dirname, "../dist"),
        compress: true,
        // port: 8080,
        hot: true,
        // host: '0.0.0.0',
        overlay: {
            errors: true //如果有错误直接在html显示错误
        },
        proxy:config.proxy
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    // mode: "development"
});