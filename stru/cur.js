'use strict';

(function () {

    var Currency = function (v) {
        this.val = v ? v : 0;
    };

    Currency.prototype.equals = function (c) {
        if (c instanceof Currency) {
            return c.val === this.val;
        } else {
            return false;
        }
    };

    module.exports = Currency;

})();