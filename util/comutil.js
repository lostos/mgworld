'use strict';

(function () {

    var idCounter = {};
    mg.util = mg.util || {};
    mg.util.ComUtil = {
        initCounter: function () {
            var collection = mg.database.collection('counters');
            collection.find().toArray(function (err, docs) {
                if(err == null) {
                    docs.forEach(function (doc) {
                        idCounter[doc._id] = doc.seq;
                    });
                }
            });
        },
        saveCounter: function () {
            var collection = mg.database.collection('counters');
            for (var cls in idCounter) {
                collection.findAndModify(
                    {'_id': cls},
                    {},
                    {'$set': {'seq': idCounter[cls]}},
                    {'upsert': true},
                    function (err, doc) {
                    }
                )
            }
        },
        genId: function (cls) {
            cls = cls || 'obj';

            if (null == idCounter[cls]) {
                idCounter[cls] = 0;
            }

            return idCounter[cls]++;
        },
        nullToEmpty: function (value) {
            return value ? value : '';
        }
    };
})();