'use strict';

(function () {

    var Engine = require('tingodb')();
    var ObjectID = Engine.ObjectID;

    var guid = (function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return function () {
            return s4() + s4() + s4() + s4() +
                s4() + s4() + s4() + s4();
        };
    })();

    var ComUtil = {
        genId: function () {
            return guid();
        },
        nullToEmpty: function (value) {
            return value ? value : '';
        }
    };

    module.exports = ComUtil;
})();