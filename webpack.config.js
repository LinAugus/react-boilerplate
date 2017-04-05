var webpack = require('webpack');
var path = require('path');

var config = {
    // 入口文件
    entry: ['./app/index.js'],
    // 指定变异后的代码路径 dist/bundle.js
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            uses: ['babel-loader'],
            exclude: /node_modules/
        }]
    },
    
}

module.exports = config;
