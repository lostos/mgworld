/**
 * Created by Fan on 2015/2/15.
 */

'use strict';

(function () {
    var SmartObj = require(__base + 'obj/smartobj');
    var PathFinding = require(__base + 'ai/pathfinding/pathfinding.js');

    var StrategyAI = function (args) {
        this.pathFinding = new PathFinding();
        this.main = args.main;
    };

    StrategyAI.prototype.update = function (obj) {
        var objects = this.main.worldCollection.mapWorld['i0_0'].objects;
        var target = objects[Math.floor((Math.random() * objects.length))];

        if (obj instanceof SmartObj) {
            if (obj.moveable && obj.state == SmartObj.state.IDLE) {
                var routes = this.pathFinding.getRoute(obj.position, target.position);
                obj.actQueue.push({
                    'type': 'moveto',
                    'routes': routes
                });
                obj.state = SmartObj.state.PROCESS;
            }
        }
    };

    module.exports = StrategyAI;
})();