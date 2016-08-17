/**
 * Created by rkanculakunta on 2/5/16.
 */
var path = require('path');
var Webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'app', 'index.js');
var port = process.env.BUILD_PORT ? process.env.BUILD_PORT : 8080;

var config = {
    devtool: "source-map",
    context: __dirname,
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:' + port,
        mainPath],
    output: {
        path: buildPath,
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    module: {
        preLoaders: [
            { test: /\.json$/, loader: 'json'}
        ],
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        },
            {
                test: /\.scss$/,
                loaders: ["style", "css?sourceMap", "sass?sourceMap"]
            },
            {
                test: /\.html$/,
                loader: "raw-loader"
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=25000'
            },{
                test: /\.svg$/,
                loader: 'svg-inline'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx','.json', 'index.json']
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('main.css', {
            allChunks: true
        })
    ]
};


module.exports = config;
