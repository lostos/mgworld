'use strict';

(function () {

    var Loader = require(__base + 'data/loader');

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
            }, function (world) {
                this.worldCollection.add(world);
            });

            // 启动AI
            setInterval(function (main) {
                main.worldCollection.each(function (world) {
                    world.each(function (obj) {
                        main.strategyAI.update(obj);
                    });
                });
            }, mg.config.freq.ai, this);

            // 启动刷新
            var lastUpdateDate = new Date();
            setInterval(function (main) {
                main.worldCollection.each(function (world) {
                    world.each(function (obj) {
                        if (obj instanceof mg.obj.SmartObj) {
                            obj.update((new Date() - lastUpdateDate) / 1000);
                        }
                    });
                });
            }, mg.config.freq.update, this);
        }
    });
})();