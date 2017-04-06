const webpack = require('webpack');
const path = require('path');

const APP_DIR   = path.resolve(__dirname, 'app/index.js');
const BUILD_DIR = path.resolve(__dirname, 'dist');

let config = {
    devtool: 'inline-source-map',
    entry: ['webpack-dev-server/client?http://localhost:9999', APP_DIR],
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
        publicPath: 'http://localhost:9999'
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
                use: ['style-loader', 'css-loader?modules']
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin()
    ]
};

module.exports = config;
