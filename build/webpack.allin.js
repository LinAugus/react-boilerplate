const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const path = require('path');

module.exports = function (debug) {
    let filename = debug ? 'js/[name].[hash].min.js' : 'js/[name].[chunkhash].min.js';
    let lazyChunkFilename = debug ? 'lazy/[id].chunk.[hash].js' : 'lazy/[id].chunk.[chunkhash].js';
    let publicPath = debug ? '' : '';
    let HTMLTemplate = debug ? './index.dev.html' : './index.html';
    let config = {
        watch: debug,
        entry: {
            'index': ['./src/js/index.js'],
            vendor: ['react', 'react-dom', 'react-router', 'redux', 'react-redux']
        },
        output: {
            path: __dirname + '/dist',
            filename: filename,
            publicPath: publicPath,
            chunkFilename: lazyChunkFilename
        },
        module: {
            loaders: [
                {
                    test: /\.(jpg|png|gif)$/i,
                    loader: 'url-loader?limit=1000&name=img/[name]-[hash:10].[ext]'
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
                },
                {
                    test: /\.js$/,
                    //js转换
                    loader: "babel",
                    exclude: /node_modules/,
                    query: {
                        presets: ['es2015', 'react', 'stage-0'],
                        plugins: [['import', {'libraryName': 'antd', "libraryDirectory": "lib", 'style': 'css'}]]
                    }
                }
            ]
        },
        plugins: [
            new InlineManifestWebpackPlugin(),
            new HtmlWebpackPlugin({
                favicon: './src/assets/favicon.ico', //favicon路径
                alwaysWriteToDisk: true,
                filename: './index.html',
                template: HTMLTemplate,
                chunks: ['manifest', 'vendor', 'index']
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: ['manifest', 'vendor'].reverse(),
                minChunks: 3
            }),
            new ExtractTextPlugin('css/[name].[contenthash].css'),  //代码分割的css也会被打包出来
            // new webpack.optimize.UglifyJsPlugin({
            //     compress: {
            //         warnings: false
            //     }
            // }),
            new HtmlWebpackHarddiskPlugin(),
        ],
        resolve: {
            alias: {
                components: path.join(__dirname, '/src/js/component'),
                utils: path.join(__dirname, '/src/utils')
            }
        }
    };
    if (debug) {
        config.entry.index.unshift("webpack-dev-server/client?http://localhost:8080/");
        config.entry.index.unshift("webpack/hot/dev-server");
        config.plugins.push(new webpack.HotModuleReplacementPlugin())
    }
    if (!debug) {
        config.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                warnings: true,
                drop_debuger: true,
                drop_console: true
            }),
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify("production")
                }
            })
        )
    }
    return config
};
