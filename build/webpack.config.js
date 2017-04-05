const webpack = require('webpack');
const path = require('path');

module.exports =  {
    // 入口文件
    entry: ['./app/index.js'],
    // 指定变异后的代码路径 dist/bundle.js
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: ['babel-loader'],
            exclude: /node_modules/
        }]
    }
};
