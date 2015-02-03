'use strict';

(function () {
    var util = require("util");

    var Base = require('/obj/base');

    var Character = new function (args) {
        Base.apply(this, arguments);

        this.name = args.name;
        this.cash = args.cash;

        this.ability = args.ability;
        this.power = args.power;
        this.happiness = args.happiness;
    };

    util.inherits(Building, Base);

    module.exports = Character;
})();