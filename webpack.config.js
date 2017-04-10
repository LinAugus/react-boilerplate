const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const APP_DIR   = path.resolve(__dirname, 'app/index.js');
const BUILD_DIR = path.resolve(__dirname, 'dist');

let config = {
    devtool: 'eval-source-map',
    entry: {
        'index': ['webpack-dev-server/client?http://localhost:9999/', APP_DIR],
        vendor: ['react', 'react-dom', 'react-router'],
    },
    output: {
        path: BUILD_DIR,
        filename: '[name].[hash].min.js',
        publicPath: 'http://localhost:9999'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader?modules']
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'app/index.html')
        })
    ]
};

module.exports = config;
