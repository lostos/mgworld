'use strict';

(function () {
    var ComUtil = require(__base + "util/comutil");
    var SmartObj = require(__base + 'obj/smartobj');
    var Coordinate = require(__base + 'stru/coord');
    var Currency = require(__base + 'stru/cur');

    var Building = SmartObj.extend({
        ctor: function (args) {
            this._super.apply(this, arguments);

            this.mgType = 'building/building';

            this.balance = new Currency(args.bal);
            this.estate = new Currency(args.est);
            this.estateMulti = ComUtil.nullToEmpty(args.estMul);
            this.ownerId = ComUtil.nullToEmpty(args.ownerId);
        }
    });

    module.exports = Building;
})();