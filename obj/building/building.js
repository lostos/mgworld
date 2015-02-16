'use strict';

(function () {

    mg.obj.Building = mg.obj.SmartObj.extend({
        ctor: function (args) {
            this._super.apply(this, arguments);

            this.mgType = 'Building';

            this.balance = new mg.stru.Currency(args.bal);
            this.estate = new mg.stru.Currency(args.est);
            this.estateMulti = mg.util.ComUtil.nullToEmpty(args.estMul);
            this.ownerId = mg.util.ComUtil.nullToEmpty(args.ownerId);
        }
    });
})();