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
        if (args.xIndex != null && args.yIndex != null) {
            this.minX = args.xIndex * SIZE;
            this.maxX = (args.xIndex + 1) * SIZE;
            this.minY = args.yIndex * SIZE;
            this.maxY = (args.yIndex + 1) * SIZE;
            this.xIndex = args.xIndex;
            this.yIndex = args.yIndex;
        } else {
            this.minX = args.minX;
            this.maxX = args.maxX;
            this.minY = args.minY;
            this.maxY = args.maxY;
            var index = xyToIndex(this.minX, this.minY);
            this.xIndex = index.xIndex;
            this.yIndex = index.yIndex;
        }


        this.objects = [];
    };

    World.prototype.add = function (object) {
        if (object instanceof ObjectBase) {
            this.objects.push(object);
        } else if (object.mgType) {
            var ObjType = require(__base + 'obj/' + object.mgType);
            var obj = ObjType.create(object);
            this.objects.push(obj);
        }
    };

    World.prototype.get = function (x, y) {
        var result = [];
        this.objects.forEach(function (obj) {
            if (obj.x == x && obj.y == y) {
                result.push(obj);
            }
        });

        return result;
    };

    World.prototype.each = function (func) {
        this.objects.forEach(func);
    };

    /* end World */

    /* WordCollection */
    var WorldCollection = function () {
        this.mapWorld = {};
    };

    /**
     * 添加world对象
     * @param world
     */
    WorldCollection.prototype.add = function (world) {
        this.mapWorld[indexToKey(world.xIndex, world.yIndex)] = world;
    };

    /**
     * 获取world对象
     * @param xIndex
     * @param yIndex
     * @returns {World}
     */
    WorldCollection.prototype.get = function (xIndex, yIndex) {
        var key = indexToKey(xIndex, yIndex);
        return this.mapWorld[key];
    };

    WorldCollection.prototype.each = function (func) {
        var index = 0;
        for (var i in this.mapWorld) {
            if (this.mapWorld.hasOwnProperty(i)) {
                func.apply(this, [this.mapWorld[i], index++]);
            }
        }
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

    WorldCollection.prototype.getObjects = function (x, y) {
        var key = xyToKey(x, y);
        var world = this.mapWorld[key];
        if (!world) {
            return world.get(x, y);
        } else {
            return [];
        }
    };

    /* end WordCollection */

    module.exports.World = World;
    module.exports.WorldCollection = WorldCollection;
})();