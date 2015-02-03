'use strict';

(function () {

    var MapGener = {
        generate: function (args) {
            var minX = args.minX;
            var maxX = args.maxX;
            var minY = args.minY;
            var maxY = args.maxY;
            var count = args.count;
            var worldCollection = args.worldCollection;

            var mgTypes = [
                'obj/building/building',
                'obj/character/character'
            ];

            var num = 0;
            while (num < count) {
                worldCollection.addObject({
                    'mgType': mgTypes[num % mgTypes.length],
                    'x': Math.floor(Math.random() * (maxX - minX) + minX),
                    'y': Math.floor(Math.random() * (maxY - minY) + minY)
                });

                ++num;
            }
        }
    };

    module.exports = MapGener;
})();