'use strict';

(function () {

    var NetworkHandler = function (args) {
        this.main = args.main;
        this.clients = [];

        setInterval(this.update, __config.freq.push, this);
    };

    NetworkHandler.prototype.onReceiveMessage = function (msg, sendMsgFunc) {
        switch (msg.t) {
            case 'reg':
                this.clients.push({
                    'region': msg.r,
                    'sendFunc': sendMsgFunc
                });
                break;
        }
    };

    NetworkHandler.prototype.update = function (t) {
        t.clients.forEach(function (client) {
            client.sendFunc.apply(this, [{
                't': 'regionData',
                'r': client.region,
                'data': t.main.worldCollection.get(client.region.x, client.region.y)
            }]);
        });
    };

    module.exports = NetworkHandler;
})();