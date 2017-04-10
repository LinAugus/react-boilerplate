const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
        vendor: ['react', 'react-dom', 'react-router'],
    },
    output: {
        path: BUILD_DIR,
        filename: '[name].min.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx']
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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader']
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/styles.css'),

        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'app/index.html')
        }),
        new webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'manifest'] }),

        new webpack.HotModuleReplacementPlugin(),
        // 开启全局的模块热替换（HMR）

        new webpack.NamedModulesPlugin(),
        // 当模块热替换（HMR）时在浏览器控制台输出对用户更友好的模块名字信息
    ]
};

module.exports = config;
