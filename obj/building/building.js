'use strict';

(function () {
    var util = require("util");

    var Base = require('/obj/base');
    var Coordinate = require('/stru/coord');
    var Currency = require('/stru/cur');

    var Building = function (args) {
        Base.apply(this, arguments);

        this.balance = new Currency(args.bal);
        this.estate = new Currency(args.est);
        this.estateMulti = args.estMul;
        this.ownerId = args.ownerId;
    };

    util.inherits(Building, Base);

    module.exports = Building;
})();