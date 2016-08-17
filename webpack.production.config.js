var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'app', 'index.js');

var config = {
    // We change to normal source mapping
    devtool: 'source-map',
    entry: mainPath,
    output: {
        path: buildPath,
        filename: 'bundle.js'
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
    }, resolve: {
        extensions: ['', '.js', '.jsx', '.json', 'index.json']
    }
};

module.exports = config;