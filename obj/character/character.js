'use strict';

(function () {

    mg.obj.Character = mg.obj.SmartObj.extend({
        moveable: true,
        ctor: function (args) {
            this._super.apply(this, arguments);

            this.mgType = 'Character';

            this.name = mg.util.ComUtil.nullToEmpty(args.name);
            this.cash = mg.util.ComUtil.nullToEmpty(args.cash);

            this.ability = mg.util.ComUtil.nullToEmpty(args.ability);
            this.power = mg.util.ComUtil.nullToEmpty(args.power);
            this.happiness = mg.util.ComUtil.nullToEmpty(args.happiness);
        }
    });
})();