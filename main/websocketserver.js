'use strict';

(function () {

    mg.main = mg.main || {};
    mg.main.WebSocketServer = mg.Class.extend({
        ctor: function (args) {

            this.networkHandler = args.networkHandler;
        },
        run: function () {
            var _this = this;

            var WebSocketServer = require('websocket').server;
            var http = require('http');
            var idCounter = 0;

            var server = http.createServer(function (request, response) {
                console.log((new Date()) + ' Received request for ' + request.url);
                response.writeHead(404);
                response.end();
            });
            server.listen(8080, function () {
                console.log((new Date()) + ' Server is listening on port 8080');
            });

            var wsServer = new WebSocketServer({
                httpServer: server,
                // You should not use autoAcceptConnections for production
                // applications, as it defeats all standard cross-origin protection
                // facilities built into the protocol and the browser.  You should
                // *always* verify the connection's origin and decide whether or not
                // to accept it.
                autoAcceptConnections: false
            });

            wsServer.on('request', function (request) {
                if (!_this._originIsAllowed(request.origin)) {
                    // Make sure we only accept requests from an allowed origin
                    request.reject();
                    console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
                    return;
                }

                var connection = request.accept('mg-protocol', request.origin);
                connection.id = 'conn' + idCounter++;
                console.log((new Date()) + ' Connection accepted.');

                connection.on('message', function (message) {
                    _this._onMessage.apply(connection, [_this.networkHandler, message]);
                });
                connection.on('close', function (reasonCode, description) {
                    _this._onClose.apply(connection, [_this.networkHandler, reasonCode, description]);
                });
            });
        },
        _originIsAllowed: function (origin) {
            // put logic here to detect whether the specified origin is allowed.
            return true;
        },
        _onMessage: function (networkHandler, message) {
            var connection = this;

            if (message.type === 'utf8') {
                console.log('Received Message: ' + message.utf8Data);

                // parse data
                var data = message.utf8Data;
                if (data.match('^\{(.+:.+,*){1,}\}$')) {
                    data = JSON.parse(data);
                }

                networkHandler.onMessage(this.id, data, function (msg) {
                    if (msg) {
                        if (typeof msg === 'string') {
                            connection.sendUTF(msg);
                        } else {
                            connection.sendUTF(JSON.stringify(msg));
                        }
                    }
                });
            }
            else if (message.type === 'binary') {
                console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
                connection.sendBytes(message.binaryData);
            }
        },
        _onClose: function (networkHandler, reasonCode, description) {
            var connection = this;

            console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');

            networkHandler.onClose(connection.id, reasonCode, description);
        }
    });
})();