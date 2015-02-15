'use strict';

(function () {
    var ComUtil = require(__base + "util/comutil");
    var SmartObj = require(__base + 'obj/smartobj');

    var Character = SmartObj.extend({
        moveable: true,
        ctor: function (args) {
            this._super.apply(this, arguments);

            this.mgType = 'character/character';

            this.name = ComUtil.nullToEmpty(args.name);
            this.cash = ComUtil.nullToEmpty(args.cash);

            this.ability = ComUtil.nullToEmpty(args.ability);
            this.power = ComUtil.nullToEmpty(args.power);
            this.happiness = ComUtil.nullToEmpty(args.happiness);
        }
    });

    module.exports = Character;
})();