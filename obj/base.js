'use strict';

(function () {

    var ComUtil = require('/util/comutil');

    var Base = new function (args) {
        this._id = args._id ? args._id : ComUtil.genId();
        this.position = new Coordinate(args.x, args.y, args.z);
    };

    module.exports = Base;
})();