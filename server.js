/**
 * Created by rkanculakunta on 2/9/16.
 */
require('dotenv').config({silent: true});
var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var favicon = require('express-favicon');
var proxy = httpProxy.createProxyServer();
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var isProduction = process.env.NODE_ENV === 'production';
var port = process.env.PORT ? process.env.PORT : 3000;
var publicPath = path.resolve(__dirname, 'public');
var feed = require('./feed.js');


app.use(favicon(__dirname + '/public/favicon.ico'), express.static(publicPath));



// We only want to run the workflow when not in production
if (!isProduction) {

    // We require the bundler inside the if block because
    // it is only needed in a development environment. Later
    // you will see why this is a good idea
    var bundle = require('./server/bundle.js');
    bundle();

    var buildport = process.env.BUILD_PORT ? process.env.BUILD_PORT : 8080;

    // Any requests to localhost:3000/build is proxied
    // to webpack-dev-server
    app.all('/build/*', function (req, res) {
        proxy.web(req, res, {
            target: 'http://localhost:' + buildport
        });
    });

}

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', function (e) {
    console.log('Could not connect to proxy, please try again...');
});

http.listen(port, function () {
    console.log('Server running on port ' + port);
});



io.on('connection', function (socket) {
    console.log('connected');
    feed.start(socket);

    //Get Updated Information Every Five Minutes.
    setInterval(() => {
        feed.start(socket);
    },300000);
});
