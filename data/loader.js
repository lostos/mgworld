'use strict';

(function () {

    mg.data = mg.data || {};
    mg.data.Loader = mg.Class.extend({
        COLLECTION_PREFIX: 'sv_world',
        ctor: function (dbPath) {

            var Engine = require('tingodb')();

            this.dbPath = dbPath;
            this.db = new Engine.Db(dbPath, {});
        },
        /**
         * 加载world
         * @param args {xIndex, yIndex}
         * @param callback
         * @returns {boolean}
         */
        loadWorld: function (args, callback) {
            if (!callback) {
                return false;
            }

            var collectionName = this._getCollectionName(args.xIndex, args.yIndex);
            var collection = this.db.collection(collectionName);
            if (collection) {
                collection.find().toArray(function (err, docs) {
                    if (err == null) {
                        var world = new World({
                            'xIndex': args.xIndex,
                            'yIndex': args.yIndex
                        });
                        docs.forEach(function (doc) {
                            world.add(doc);
                        });
                        callback.apply(this, [world]);
                    }
                });
            }
            return true;
        },
        /**
         * 保存world
         * @param args
         * @returns {boolean}
         */
        saveWorld: function (args, callback) {

            var world = args.world;
            if (!world) {
                if (args.worldCollection) {
                    world = args.worldCollection.get(args.xIndex, args.yIndex);
                }
            }

            if (!world) {
                throw '参数world 不能为空.';
            }

            var collectionName = this._getCollectionName(args.xIndex, args.yIndex);
            var collection = this.db.collection(collectionName);
            if (collection) {
                world.objects.forEach(function (object, index) {
                    collection.findAndModify({
                            '_id': object._id
                        }, {},
                        object, {
                            'upsert': true
                        }, function (err, doc) {

                        });
                });
                if (callback) {
                    callback.apply();
                }
            } else {
                throw '找不到collection: ' + collectionName + '.';
            }
            return true;
        },
        _getCollectionName: function (xIndex, yIndex) {
            return this.COLLECTION_PREFIX + '_' + xIndex + '_' + yIndex;
        }
    });
})();