'use strict';

(function () {

    var world = require(__base + 'stru/world');
    var World = world.World;
    var WorldCollection = world.WorldCollection;

    var MapGener = require(__base + 'util/mapgener');
    var Loader = require(__base + 'data/loader');

    var Main = function () {
        this.worldCollection = new WorldCollection();
        this.loader = new Loader('./db');
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
    };

    module.exports = Main;
})();