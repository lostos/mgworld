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
            var _this = this;

            mg.util.MapGener.generate({
                'minX': 0,
                'maxX': 100,
                'minY': 0,
                'maxY': 100,
                'count': 10,
                'worldCollection': this.worldCollection
            });

            this.loader.saveWorld({
                'worldCollection': this.worldCollection,
                'xIndex': 0,
                'yIndex': 0
            });

            this.loader.loadWorld({
                'xIndex': 0,
                'yIndex': 0
            }, function (objs) {
                objs.forEach(function (obj) {
                    _this.worldCollection.addObject(obj);
                });
            });

            // 启动AI
            setInterval(function (main) {
                main.worldCollection.each(function (world) {
                    world.each(function (obj) {
                        main.strategyAI.update(obj);
                    });
                });
            }, mg.config.freq.ai * 1000, this);

            // 启动刷新
            var lastUpdateDate = new Date();
            setInterval(function (main) {
                var now = new Date();
                var t = (now - lastUpdateDate ) / 1000;
                lastUpdateDate = now;
                main.worldCollection.each(function (world) {
                    world.each(function (obj) {
                        if (obj instanceof mg.obj.SmartObj) {
                            obj.update(t);
                        }
                    });
                });
            }, mg.config.freq.update * 1000, this);
        }
    });
})();