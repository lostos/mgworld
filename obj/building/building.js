'use strict';

(function () {

    mg.obj.Building = mg.obj.SmartObj.extend({
        ctor: function (args) {
            this._super(args);

            this.mgType = 'Building';

            if (null != args.attributes) {
                this.attributes = {
                    balance: new mg.stru.Currency(args.attributes.bal),
                    estate: new mg.stru.Currency(args.attributes.est),
                    estateMulti: mg.util.ComUtil.nullToEmpty(args.attributes.estMul),
                    ownerId: mg.util.ComUtil.nullToEmpty(args.attributes.ownerId)
                };
            }
        }
    });
})();