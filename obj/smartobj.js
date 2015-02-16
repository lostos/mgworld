/**
 * Created by Fan on 2015/2/15.
 */

'use strict';

(function () {

    mg.obj = mg.obj || {};
    mg.obj.SmartObj = mg.obj.Base.extend({
        actionTypes: [],
        moveable: false,
        ctor: function (args) {
            this._super(args);

            this.mgType = 'SmartObj';

            this.action = {
                queue: new mg.util.Queue(),
                current: null
            };
            this.state = mg.obj.state.IDLE;
        },
        update: function (ticks) {
            var act = this.action.current;
            if (null == act) {
                act = this.action.queue.deQueue();
                if (null != act) {
                    this.action.current = act;
                } else {
                    this.state = mg.obj.state.IDLE;
                    return;
                }
            }

            switch (act.type) {
                case 'moveto':
                    this.state = mg.obj.state.MOVING;
                    act.time = (act.time || 0) + ticks * mg.config.obj.moveSpeed;
                    var route = act.routes[0];

                    // 完成动作
                    if (act.time >= route.cost) {
                        this.position.x = route.x;
                        this.position.y = route.y;

                        act.routes.splice(0, 1);
                        if (act.routes.length <= 0) {
                            this.action.current = null;
                        }
                    }
                    break;
            }
        },
        addAction: function (action) {
            this.action.queue.enQueue(action);
            return this;
        }
    });

    mg.obj.state = {
        IDLE: 0,
        MOVING: 10
    };
})();