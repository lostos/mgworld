'use strict';

global.__base = __dirname + '/';
global.mg = {};

//var PORT = 33333;
//var HOST = '127.0.0.1';
//
//var dgram = require('dgram');
//var server = dgram.createSocket('udp4');
//
//server.on('listening', function () {
//    var address = server.address();
//    console.log('UDP Server listening on ' + address.address + ":" + address.port);
//});
//
//server.on('message', function (message, remote) {
//    console.log(remote.address + ':' + remote.port + ' - ' + message);
//
//    var response = new Buffer("Got it on " + new Date());
//    server.send(response, 0, response.length, remote.port, remote.address, function (err, bytes) {
//        if (err) throw err;
//        console.log('UDP message sent to ' + remote.address + ':' + remote.port);
//    });
//});
//
//server.bind(PORT, HOST);

var modules = require('./modules');
modules.jsList.forEach(function (js) {
    require(__base + js);
});

var WebServer = require('./websocketserver.js');
var NetworkHandler = require('./network/handler.js');
var Main = require('./main');

var main = new Main();
main.run();

var networkHandler = new NetworkHandler({
    main: main
});
var webServer = new WebServer({
    networkHandler: networkHandler
});
