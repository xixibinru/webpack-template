

const path = require('path');

module.exports = {
    htmlDirs: [
        'index',
        'other'
    ],
    //路径
    pathname: {
        root: path.resolve(__dirname, '../'),
        src: path.resolve(__dirname, "../src"),
        dist: path.resolve(__dirname, "../dist")
    },
    //api代理
    proxy: {
        // "/api": {
        //     target:"http://cms.ahczjy.cc",
        //     changeOrigin: true,
        //     secure: false,
        //     //pathRewrite: {'^/api' : ''}
        // },
        '/api': {   //匹配/api开头的api 匹配成功 则用target代理   在请求的api上需要加上/api，如果被标识的api地址开头没有'/api' 那么要用pathRewrite清空
            target: 'http://cms.ahczjy.cc',
            // host:'localhost:8080',
            changeOrigin: true,
            // secure: false, //如果是https 则需要这个参数为false
            pathRewrite: {
                '^/api': ''
            }
        }
    }
}