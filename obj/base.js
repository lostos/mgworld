'use strict';

(function () {

    mg.obj = mg.obj || {};
    mg.obj.Base = mg.Class.extend({
        ctor: function (args) {
            args = args || {};

            this._id = args._id ? args._id : mg.util.ComUtil.genId();
            this.mgType = 'Base';
            this.position = new mg.stru.Coordinate(args.x, args.y, args.z);
        }
    });
})();