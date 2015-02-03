'use strict';

(function () {
    var util = require("util");

    var Base = require(__base + 'obj/base');

    var Character = function (args) {
        Base.apply(this, arguments);

        this.name = args.name;
        this.cash = args.cash;

        this.ability = args.ability;
        this.power = args.power;
        this.happiness = args.happiness;
    };

    util.inherits(Character, Base);

    module.exports = Character;
})();