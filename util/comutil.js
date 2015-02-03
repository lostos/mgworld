'use strict';

(function () {

    var Engine = require('tingodb')();
    var ObjectID = Engine.ObjectID;

    var ComUtil = {
        genId: function () {
            return new ObjectID();
        }
    };

    module.exports = ComUtil;
})();