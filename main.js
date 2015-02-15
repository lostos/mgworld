'use strict';

(function () {

    var world = require(__base + 'stru/world');
    var World = world.World;
    var WorldCollection = world.WorldCollection;

    var MapGener = require(__base + 'util/mapgener');
    var Loader = require(__base + 'data/loader');

    var StrategyAI = require(__base + 'ai/strategy/strategy');
    var SmartObj = require(__base + 'obj/smartobj');

    var Main = function () {
        this.worldCollection = new WorldCollection();
        this.loader = new Loader('./db');
        this.strategyAI = new StrategyAI({
            'main': this
        });
    };

    Main.prototype.addObject = function (object) {
        this.worldCollection.addObject(object);
    };

    Main.prototype.run = function () {
        MapGener.generate({
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
        }, __config.freq.ai, this);

        // 启动刷新
        var lastUpdateDate = new Date();
        setInterval(function (main) {
            main.worldCollection.each(function (world) {
                world.each(function (obj) {
                    if (obj instanceof SmartObj) {
                        obj.update((new Date() - lastUpdateDate) / 1000);
                    }
                });
            });
        }, __config.freq.update, this);
    };

    module.exports = Main;
})();