/**
 * Created by Fan on 2015/2/15.
 */

'use strict';

(function () {
    var Base = require(__base + 'obj/base');

    var SmartObj = Base.extend({
        actions: [],
        moveable: false,
        ctor: function () {
            this._super.apply(this, arguments);

            this.mgType = 'smartobj';
            this.actQueue = [];
            this.currAct = null;

            this.state = SmartObj.state.IDLE
        },
        update: function (ticks) {
            var act = this.currAct;
            if (null == act) {
                if (this.actQueue.length > 0) {
                    act = this.currAct = this.actQueue.splice(0, 1)[0];
                } else {
                    this.state = SmartObj.state.IDLE;
                    return;
                }
            }

            switch (act.type) {
                case 'moveto':
                    act.time = (act.time || 0) + ticks;
                    var route = act.routes[0];
                    if (act.time >= route.cost) {
                        this.position.x = route.x;
                        this.position.y = route.y;

                        act.routes.splice(0, 1);
                        if (act.routes.length <= 0) {
                            this.currAct = null;
                        }
                    }
                    break;
            }
        }
    });

    SmartObj.state = {
        IDLE: 0,
        PROCESS: 10
    };

    module.exports = SmartObj;
})();