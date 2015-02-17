/**
 * Created by Fan on 2015/2/15.
 */

'use strict';

(function () {

    mg.ai = mg.ai || {};
    mg.ai.StrategyAI = mg.Class.extend({
        ctor: function (args) {
            this.pathFinding = new mg.ai.PathFinding();
            this.main = args.main;
        },
        update: function (obj) {
            var objects = this.main.worldCollection.mapWorld['i0_0'].objects;
            var target = objects[Math.floor((Math.random() * objects.length))];

            if (obj instanceof mg.obj.SmartObj) {
                if (obj.moveable && obj.state == mg.obj.state.IDLE) {
                    var routes = this.pathFinding.getRoute(obj.position, target.position);
                    obj.addAction({
                        'id': mg.util.ComUtil.genId('act'),
                        'type': 'moveto',
                        'routes': routes
                    });
                }
            }
        }
    });

})();