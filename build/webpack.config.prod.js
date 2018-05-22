const merge = require('webpack-merge');
const base = require('./webpack.config.base');
const config = require('../config/config');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(base, {
    // mode: 'production',
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js', //非chunk（使用ES6 import()或require.ensure（）方法动态导入的）文件名字  
        path: config.pathname.dist
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor' // 指定公共 bundle 的名称。
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        new webpack.HashedModuleIdsPlugin(), //vendor的hash只会在修改vendor后才发生变化
        new UglifyJSPlugin({
            sourceMap: true,
        })
    ],

    // optimization: {
    //     runtimeChunk: {
    //         name: "manifest"
    //     },
    //     // splitChunks: {
    //     //     cacheGroups: {
    //     //         commons: {
    //     //             test: /[\\/]node_modules[\\/]/,
    //     //             name: "vendor",
    //     //             chunks: "all"
    //     //         }
    //     //     }
    //     // }
    // splitChunks: {
    //     chunks: "all",
    //     minSize: 30000,
    //     minChunks: 1,
    //     maxAsyncRequests: 5,
    //     maxInitialRequests: 3,
    //     // name: true,
    //     cacheGroups: {
    //         default: {
    //             minChunks: 2,
    //             priority: -20,
    //             reuseExistingChunk: true,
    //             name: 'default'
    //         },
    //         vendors: {
    //             test: /[\\/]node_modules[\\/]/,
    //             priority: -10,
    //             name: 'vendor'
    //         }
    //     }
    // }
    // }
});