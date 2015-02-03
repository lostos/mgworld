'use strict';

(function () {

    var COLLECTION_PREFIX = 'sv_world';

    var Loader = function (dbPath) {
        this.dbPath = dbPath;
        this.db = new Engine.Db(dbPath, {});

    };

    Loader.prototype.load = function (main, args) {
        for (var i = args.minXIndex, k = args.maxXIndex; i < k; ++i) {
            for (var j = args.minYIndex, l = args.maxYIndex; j < l; ++j) {
                var collectionName = COLLECTION_PREFIX + '_' + i + '_' + j;
                var collection = this.db.collection(collectionName);
                if (collection) {
                    collection.find().toArray(function (err, docs) {
                        if (err == null) {
                            main.appendData(docs);
                        }
                    });
                }
            }
        }
    };

    Loader.prototype.save = function (main, args) {
        for (var i = args.minXIndex, k = args.maxXIndex; i < k; ++i) {
            for (var j = args.minYIndex, l = args.maxYIndex; j < l; ++j) {
                var collectionName = COLLECTION_PREFIX + '_' + i + '_' + j;
                var collection = this.db.collection(collectionName);
                if (collection) {
                    main.worlds.forEach(function (world, index) {
                        if (world.xIndex == i && world.yIndex == j) {
                            world.objects.forEach(function (object, index) {
                                collection.findAndModify({
                                    '_id': object._id
                                }, {
                                    '_id': 'asc'
                                }, object, {
                                    'upsert': true
                                })
                            });

                            return false; // break;
                        }
                    });
                }
            }
        }
    };
})();