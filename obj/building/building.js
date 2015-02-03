'use strict';

(function () {
    var util = require("util");
    var ComUtil = require(__base + "util/comutil");
    var Base = require(__base + 'obj/base');
    var Coordinate = require(__base + 'stru/coord');
    var Currency = require(__base + 'stru/cur');

    var Building = function (args) {
        Base.apply(this, arguments);

        this.balance = new Currency(args.bal);
        this.estate = new Currency(args.est);
        this.estateMulti = ComUtil.nullToEmpty(args.estMul);
        this.ownerId = ComUtil.nullToEmpty(args.ownerId);
    };

    util.inherits(Building, Base);

    module.exports = Building;
})();