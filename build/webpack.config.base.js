const path = require('path');
const webpack = require('webpack');
// 引入模板插件
const HTMLWebpackPlugin = require("html-webpack-plugin");
//清理文件夹插件
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 提取css插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 环境变量
const isDev = process.env.NODE_ENV === 'development';
// 引入配置文件
const config = require('../config/config');

// 通过 html-webpack-plugin 生成的 HTML 集合
let htmlPlugins = [];
// 入口文件集合
let entry = {
    vendor: ['vue/dist/vue.esm.js']
};

config.htmlDirs.forEach((page) => {
    const htmlPlugin = new HTMLWebpackPlugin({
        filename: `${page}.html`,
        template: path.resolve(__dirname, `../src/page/${page}/${page}.html`),
        chunks: ['manifest', 'vendor', page], //引入entry中的哪些js文件
        minify: {
            "removeAttributeQuotes": true, //删除属性上的引号
            "removeComments": true,
            "removeEmptyAttributes": true,
            "collapseWhitespace": true, //打包后删除空格 
        }
    });
    htmlPlugins.push(htmlPlugin);
    entry[page] = path.resolve(__dirname, `../src/page/${page}/${page}.js`)
});

module.exports = {
    entry,
    // output: {
    //     publicPath: '/'
    // },
    module: {
        rules: [
            // {
            //     test: /\.css$/,
            //     include: config.pathname.src,
            //     use: [
            //         'style-loader',
            //         'css-loader'
            //     ]
            // },
            {
                test: /\.css$/,
                include: config.pathname.src,
                use: isDev ? ['style-loader', 'css-loader'] : ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.js$/,
                include: config.pathname.src,
                // exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                include: config.pathname.src,
                options: {
                    limit: 10000,
                    name: '[name].[ext]'
                }

                // test: /\.(png|jpg|gif)$/,
                // use: [{
                //     loader: 'url-loader',
                //     options: {
                //         limit: 8192
                //     }
                // }]

            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                include: config.pathname.src,
                options: {
                    limit: 10000,
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                include: config.pathname.src,
                options: {
                    limit: 10000,
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.vue$/,
                include: config.pathname.src,
                loader: 'vue-loader',
            },
        ]

    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: config.pathname.root //设置根目录 不然会提示在root外部 跳过删除
        }),
        new webpack.ProvidePlugin({
            Vue: ['vue/dist/vue.esm.js', 'default'],
        }),
        new ExtractTextPlugin({
            filename: '[name]-[chunkhash].css',
            disable: isDev
        }),
        ...htmlPlugins
    ],
    // resolve: {
    //     extensions: ['.js', '.vue'],
    //     alias: {
    //         'vue$': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
    //     }
    // }
}