'use strict';

(function () {

    var ObjectBase = require(__base + 'obj/base');

    /* World */
    mg.stru = mg.stru || {};
    mg.stru.World = mg.Class.extend({
        ctor: function (args) {
            this.xIndex = args.xIndex;
            this.yIndex = args.yIndex;

            this.objects = [];
        },
        add: function (obj) {
            if (obj instanceof mg.obj.Base) {
                this.objects.push(obj);
            } else if (obj.mgType) {
                var ObjType = eval('mg.obj.' + obj.mgType);
                var o = new ObjType(obj);
                this.objects.push(o);
            }
        },
        get: function (x, y) {
            var result = [];
            this.objects.forEach(function (obj) {
                if (obj.x == x && obj.y == y) {
                    result.push(obj);
                }
            });

            return result;
        },
        each: function (func) {
            this.objects.forEach(func);
        }
    });

    /* end World */

    /* WordCollection */
    mg.stru.WorldCollection = mg.Class.extend({
        worldSize: mg.config.world.size,
        ctor: function () {
            this.mapWorld = {};
        },
        /**
         * 添加world对象
         * @param world
         */
        add: function (world) {
            this.mapWorld[this._indexToKey(world.xIndex, world.yIndex)] = world;
        },
        /**
         * 获取world对象
         * @param xIndex
         * @param yIndex
         * @returns {World}
         */
        get: function (xIndex, yIndex) {
            var key = this._indexToKey(xIndex, yIndex);
            return this.mapWorld[key];
        },
        each: function (func) {
            var index = 0;
            for (var i in this.mapWorld) {
                if (this.mapWorld.hasOwnProperty(i)) {
                    func.apply(this, [this.mapWorld[i], index++]);
                }
            }
        },
        addObject: function (obj) {
            var index = this._xyToIndex(obj.x, obj.y);
            var key = this._indexToKey(index.xIndex, index.yIndex);
            var world = this.mapWorld[key];
            if (!world) {
                world = new mg.stru.World(index);
                this.mapWorld[key] = world;
            }

            world.add(obj);
        },
        getObjects: function (x, y) {
            var key = this._xyToKey(x, y);
            var world = this.mapWorld[key];
            if (!world) {
                return world.get(x, y);
            } else {
                return [];
            }
        },
        _xyToIndex: function (x, y) {
            return {
                'xIndex': Math.floor(x >= 0 ? x / this.worldSize : (x - this.worldSize) / this.worldSize),
                'yIndex': Math.floor(y >= 0 ? y / this.worldSize : (y - this.worldSize) / this.worldSize)
            };
        },
        _xyToKey: function (x, y) {
            var index = this._xyToIndex(x, y);
            return this._indexToKey(index.xIndex, index.yIndex);
        },
        _indexToKey: function (xIndex, yIndex) {
            return 'i' + xIndex + '_' + yIndex;
        }
    });

    /* end WordCollection */
})();