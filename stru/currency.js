'use strict';

(function () {

    mg.stru = mg.stru || {};
    mg.stru.Currency = mg.Class.extend({
        ctor: function (v) {
            this.val = v ? v : 0;
        },
        equals: function (c) {
            if (c instanceof Currency) {
                return c.val === this.val;
            } else {
                return false;
            }
        }
    });
})();