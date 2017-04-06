const webpack = require('webpack');
const path = require('path');

const APP_DIR   = path.resolve(__dirname, 'app/index.js');
const BUILD_DIR = path.resolve(__dirname, 'dist');

let config = {
    entry: [APP_DIR],
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};

module.exports = config;
