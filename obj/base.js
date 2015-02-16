'use strict';

(function () {

    mg.obj = mg.obj || {};
    mg.obj.Base = mg.Class.extend({
        ctor: function (args) {
            args = args || {};

            this._id = args._id ? args._id : mg.util.ComUtil.genId();
            this.mgType = 'Base';

            if (args.x != null && args.y != null) {
                this.position = new mg.stru.Coordinate(args);
            } else if (args.position) {
                this.position = new mg.stru.Coordinate(args.position);
            } else {
                throw '缺少参数 position.';
            }

        }
    });
})();