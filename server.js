"use strict";

const Webpack = require("webpack");
const path = require("path");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.config.js");

const compiler = Webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
    contentBase: path.join(__dirname, 'dist'),
    publicPath: webpackConfig.output.publicPath,
    historyApiFallback: true,
    hot: true,
    noInfo: true,
    overlay: true,
    stats: {
        colors: true
    }
});

server.listen(9999, "127.0.0.1", function() {
    console.log("Starting Server on http://localhost:9999");
})
