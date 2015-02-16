/**
 * Created by Fan on 2015/2/16.
 */

(function () {

    mg.util = mg.util || {};
    mg.util.Queue = mg.Class.extend({
        ctor: function () {
            this.queue = [];
        },
        enQueue: function (obj) {
            this.queue.push(obj);
            return this;
        },
        deQueue: function () {
            if (this.queue.length > 0) {
                return this.queue.splice(0, 1)[0];
            } else {
                return null;
            }
        }
    });
})();