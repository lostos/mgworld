'use strict';

(function () {
    var util = require("util");
    var ComUtil = require(__base + "util/comutil");
    var Base = require(__base + 'obj/base');

    var Character = function (args) {
        Base.apply(this, arguments);

        this.name = ComUtil.nullToEmpty(args.name);
        this.cash = ComUtil.nullToEmpty(args.cash);

        this.ability = ComUtil.nullToEmpty(args.ability);
        this.power = ComUtil.nullToEmpty(args.power);
        this.happiness = ComUtil.nullToEmpty(args.happiness);
    };

    util.inherits(Character, Base);

    module.exports = Character;
})();