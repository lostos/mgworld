'use strict';

(function () {

    var world = require(__base + 'stru/world');
    var World = world.World;
    var WorldCollection = world.WorldCollection;

    var MapGener = require(__base + 'util/mapgener');

    var Main = function () {
        this.worldCollection = new WorldCollection();
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
    };

    module.exports = Main;
})();