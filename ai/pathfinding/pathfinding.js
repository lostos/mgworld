/**
 * Created by Fan on 2015/2/15.
 */

'use strict';

(function () {

    mg.ai = mg.ai || {};
    mg.ai.PathFinding = mg.Class.extend({
        DIRECTION: [
            {'x': 0, 'y': 1, 'cost': 1}, // north
            {'x': 1, 'y': 0, 'cost': 1}, // east
            {'x': 0, 'y': -1, 'cost': 1}, // south
            {'x': -1, 'y': 0, 'cost': 1}, // west
            {'x': 1, 'y': 1, 'cost': 1.414}, // northeast
            {'x': 1, 'y': -1, 'cost': 1.414}, // southeast
            {'x': -1, 'y': -1, 'cost': 1.414}, // southwest
            {'x': -1, 'y': 1, 'cost': 1.414} // northwest
        ],
        ctor: function (args) {
        },
        getRoute: function (startPos, targetPos, funcIsBlocked) {
            var pos = this.startAstar(startPos, targetPos, funcIsBlocked);
            var route = [];

            while (pos) {
                route.push({
                    'x': pos.x,
                    'y': pos.y,
                    'cost': pos.cost
                });
                pos = pos.prev;
            }

            return route.reverse();
        },
        startAstar: function (startPos, targetPos, funcIsBlocked) {
            var _this = this;

            var _start = {
                'x': startPos.x,
                'y': startPos.y,
                'next': null,
                'prev': null,
                'cost': 0
            };
            _start.dist = this._getDistance(_start, targetPos);
            _start.fullDist = _start.cost + _start.dist;

            var closedList = [];
            var openList = new mg.ai.MinHeap();
            openList.add(_start);

            var pos = null;
            while (openList.hasNext()) {
                // 取x为将被估算的节点中f(x)最小的
                if (null != pos) {
                    pos.next = openList.extractFirst();
                    pos = pos.next;
                } else {
                    pos = openList.extractFirst();
                }

                // 若x为终点，执行
                if (pos.x == targetPos.x && pos.y == targetPos.y) {
                    return pos;
                }

                // 将x节点插入已经被估算的节点
                closedList.push(pos.x + '_' + pos.y);

                // 对于节点x附近的任意节点y，执行
                this.DIRECTION.forEach(function (dir) {
                    var nextPos = {
                        'x': pos.x + dir.x,
                        'y': pos.y + dir.y,
                        'cost': pos.cost + dir.cost // 从起点到节点y的距离
                    };
                    nextPos.dist = _this._getDistance(nextPos, targetPos);
                    nextPos.fullDist = nextPos.cost + nextPos.dist;

                    // 方向有阻挡，跳过
                    if (funcIsBlocked && funcIsBlocked.apply(this, [nextPos.x, nextPos.y])) {
                        return true; // continue
                    }

                    // 若y已被估值，跳过
                    if (closedList.indexOf(nextPos.x + '_' + nextPos.y) >= 0) {
                        return true; // continue
                    }

                    var isBetter = false;
                    if (!openList.exists(nextPos)) {
                        openList.add(nextPos);
                        isBetter = true;
                    } else if (null == pos.next) {
                        isBetter = true;
                    } else if (nextPos.cost < pos.next.cost) {
                        isBetter = true;
                    }

                    if (isBetter) {
                        pos.next = nextPos;
                        nextPos.prev = pos;
                    }
                });
            }
        },
        _getDistance: function (pos1, pos2) {
            return Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2));
        }
    });
})();