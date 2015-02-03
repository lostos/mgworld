'use strict';

(function () {
    var SIZE = 100;

    var World = function (args) {
        this.minX = args.minX;
        this.maxX = args.maxX;
        this.minY = args.minY;
        this.maxY = args.maxY;

        this.xIndex = Math.floor(maxX > 0 ? maxX / SIZE : (maxX - SIZE) / SIZE);
        this.yIndex = Math.floor(maxY > 0 ? maxY / SIZE : (maxY - SIZE) / SIZE);

        this.objects = [];
    };

    World.prototype.add = function (object) {
        objects.push(object);
    };

    module.exports = World;
})();