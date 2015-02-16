'use strict';

(function () {

    mg.stru = mg.stru || {};
    mg.stru.Coordinate = mg.Class.extend({
        ctor: function (x, y, z) {
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
        },
        coordinates: function (i) {
            switch (i) {
                case 0:
                    return this.x;
                case 1:
                    return this.y;
                case 2:
                    return this.z;
                default :
                    throw 'coordinate index out of range.';
            }
        },
        equals: function (c) {
            if (c instanceof Coordinate) {
                return c.x === this.x && c.y === this.y && c.z === this.z;
            } else {
                return false;
            }
        }
    });
})();