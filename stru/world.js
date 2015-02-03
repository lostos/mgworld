'use strict';

(function () {
    var SIZE = 100;

    var ObjectBase = require(__base + 'obj/base');

    var xyToIndex = function (x, y) {
        return {
            'xIndex': Math.floor(x > 0 ? x / SIZE : (x - SIZE) / SIZE),
            'yIndex': Math.floor(y > 0 ? y / SIZE : (y - SIZE) / SIZE)
        };
    };

    var xyToWorldArgs = function (x, y) {
        var index = xyToIndex(x, y);
        return {
            'minX': index.xIndex * SIZE,
            'maxX': index.xIndex * SIZE + SIZE,
            'minY': index.yIndex * SIZE,
            'maxY': index.yIndex * SIZE + SIZE
        };
    };

    var xyToKey = function (x, y) {
        var index = xyToIndex(x, y);
        return indexToKey(index.xIndex, index.yIndex);
    };

    var indexToKey = function (xIndex, yIndex) {
        return 'i' + xIndex + '_' + yIndex;
    };

    /* World */
    var World = function (args) {
        this.minX = args.minX;
        this.maxX = args.maxX;
        this.minY = args.minY;
        this.maxY = args.maxY;

        var index = xyToIndex(this.minX, this.minY);
        this.xIndex = index.xIndex;
        this.yIndex = index.yIndex;

        this.objects = [];
    };

    World.prototype.add = function (object) {
        if (object instanceof ObjectBase) {
            this.objects.push(object);
        } else if (object.mgType) {
            var ObjType = require(__base + object.mgType);
            var obj = new ObjType(object);
            this.objects.push(obj);
        }
    };

    /* end World */

    /* WordCollection */
    var WorldCollection = function () {
        this.mapWorld = {};
    };

    WorldCollection.prototype.add = function (world) {
        this.mapWorld[indexToKey(world.xIndex, world.yIndex)] = world;
    };

    WorldCollection.prototype.addObject = function (object) {
        var key = xyToKey(object.x, object.y);
        var world = this.mapWorld[key];
        if (!world) {
            world = new World(xyToWorldArgs(object.x, object.y));
            this.mapWorld[key] = world;
        }

        world.add(object);
    };

    /* end WordCollection */

    module.exports.World = World;
    module.exports.WorldCollection = WorldCollection;
})();