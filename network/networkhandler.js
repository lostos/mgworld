'use strict';

(function () {

    mg.network = mg.network || {};
    mg.network.NetworkHandler = mg.Class.extend({
        ctor: function (args) {
            this.main = args.main;
            this.clients = [];

            setInterval(this.update, mg.config.freq.push * 1000, this);
        },
        onReceiveMessage: function (msg, sendMsgFunc) {
            switch (msg.t) {
                case 'reg':
                    this.clients.push({
                        'region': msg.r,
                        'sendFunc': sendMsgFunc
                    });
                    break;
                case 'map':
                    var tmx = new mg.util.TMXMap(__base + 'res/tmxtemplate');
                    // TODO 生成TMX
                    tmx.setProperty('width', 100);
                    tmx.setProperty('height', 100);
                    tmx.setProperty('data', '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');
                    sendMsgFunc.apply(this, [{
                        't': 'mapData',
                        'r': msg.r,
                        'data': tmx.getContent()
                    }]);
                    break;
            }
        },
        update: function (_this) {
            _this.clients.forEach(function (client) {
                client.sendFunc.apply(this, [{
                    't': 'regionData',
                    'r': client.region,
                    'data': _this._getUpdateData(_this.main.worldCollection)
                }]);
            });
        },
        _getUpdateData: function (worldCollection) {
            if (null == worldCollection) {
                return null;
            }
            var data = [];
            worldCollection.eachObject(function (obj) {
                var d = {
                    'id': obj._id,
                    'x': obj.position.x,
                    'y': obj.position.y,
                    'm': obj.moveable ? '1' : '0'
                };
                if (obj.moveable) {
                    d.act = obj.action.current
                }
                data.push(d);
            });

            return data;
        }
    });
})();