'use strict';

(function () {

    var ComUtil = require(__base + 'util/comutil');
    var Coordinate = require(__base + 'stru/coord');

    var Base = function (args) {
        this._id = args._id ? args._id : ComUtil.genId();
        this.position = new Coordinate(args.x, args.y, args.z);
    };

    module.exports = Base;
})();