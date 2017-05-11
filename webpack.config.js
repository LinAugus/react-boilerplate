const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

const APP_DIR   = path.resolve(__dirname, 'app/index.js');
const BUILD_DIR = path.resolve(__dirname, 'dist');

let config = {
    devtool: 'inline-source-map',
    entry: {
        bundle: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:9999/',
            'webpack/hot/only-dev-server',
            APP_DIR
        ],
        vendor: ['react', 'react-dom', 'react-router', 'redux', 'react-redux'],
    },
    output: {
        path: BUILD_DIR,
        filename: '[name].[hash].min.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
                components: path.join(__dirname, '/app/js/components')
            }
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'app'),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(jpg|png|gif)$/i,
                loader: 'url-loader?limit=1000&name=img/[name]-[hash:10].[ext]'
            }
        ]
    },
    plugins: [

        // inline your Webpack manifest.js with a script tag to save http request
        new InlineManifestWebpackPlugin({
            name: 'webpackManifest'
        }),

        // 生成html
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'app/index.html')
        }),

        // 提取公共模块
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            minChunks: 3
        }),

        new webpack.HotModuleReplacementPlugin(),
        // 开启全局的模块热替换（HMR）

        new webpack.NamedModulesPlugin(),
        // 当模块热替换（HMR）时在浏览器控制台输出对用户更友好的模块名字信息
    ]
};

module.exports = config;
