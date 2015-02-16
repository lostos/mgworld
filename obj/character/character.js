'use strict';

(function () {

    mg.obj.Character = mg.obj.SmartObj.extend({
        moveable: true,
        ctor: function (args) {
            this._super(args);

            this.mgType = 'Character';

            if (null != args.attributes) {
                this.attributes = {
                    name: mg.util.ComUtil.nullToEmpty(args.attributes.name),
                    cash: mg.util.ComUtil.nullToEmpty(args.attributes.cash),
                    ability: mg.util.ComUtil.nullToEmpty(args.attributes.ability),
                    power: mg.util.ComUtil.nullToEmpty(args.attributes.power),
                    happiness: mg.util.ComUtil.nullToEmpty(args.attributes.happiness)
                };
            }
        }
    });
})();