'use strict';

(function () {

    mg.main = mg.main || {};
    mg.main.Main = mg.Class.extend({
        ctor: function () {
            this.worldCollection = new mg.stru.WorldCollection();
            this.loader = new mg.data.Loader('./db');
            this.strategyAI = new mg.ai.StrategyAI({
                'main': this
            });
        },
        addObject: function (object) {
            this.worldCollection.addObject(object);
        },
        run: function () {
            // 加载数据
            this._load();
            if (this.worldCollection.getObjectCount() <= 0) {
                this._generate();
                this._save();
            }

            // 启动AI
            setInterval(function (main) {
                main.worldCollection.eachObject(function (obj) {
                    main.strategyAI.update(obj);
                });
            }, mg.config.freq.ai * 1000, this);

            // 启动刷新
            var lastUpdateDate = new Date();
            setInterval(function (main) {
                var now = new Date();
                var t = (now - lastUpdateDate ) / 1000;
                lastUpdateDate = now;
                main.worldCollection.eachObject(function (obj) {
                    if (obj instanceof mg.obj.SmartObj) {
                        obj.update(t);
                    }
                });
            }, mg.config.freq.update * 1000, this);
        },
        _load: function () {
            var _this = this;

            this.loader.loadWorld({
                'xIndex': 0,
                'yIndex': 0
            }, function (objs) {
                objs.forEach(function (obj) {
                    _this.worldCollection.addObject(obj);
                });
            });
        },
        _save: function () {
            this.loader.saveWorld({
                'worldCollection': this.worldCollection,
                'xIndex': 0,
                'yIndex': 0
            });
        },
        _generate: function () {
            mg.util.MapGener.generate({
                'minX': 0,
                'maxX': 100,
                'minY': 0,
                'maxY': 100,
                'count': 10,
                'worldCollection': this.worldCollection
            });
        }
    });
})();