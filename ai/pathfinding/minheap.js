/**
 * Created by Fan on 2015/2/15.
 */

'use strict';

(function () {

    mg.ai = mg.ai || {};
    mg.ai.MinHeap = mg.Class.extend({
        ctor: function () {
            this.listHead = null;
        },
        add: function (item) {
            if (null == this.listHead) {
                this.listHead = item;
            } else if (null == this.listHead.nextHeapItem && item.fullDist <= this.listHead.fullDist) {
                item.nextHeapItem = this.listHead;
                this.listHead = item;
            } else {
                var p = this.listHead;
                while (null != p.nextHeapItem && p.nextHeapItem.fullDist < item.fullDist) {
                    p = p.nextHeapItem;
                }
                item.nextHeapItem = p.nextHeapItem;
                p.nextHeapItem = item;
            }
        },
        extractFirst: function () {
            var result = this.listHead;
            this.listHead = this.listHead.nextHeapItem;
            return result;
        },
        hasNext: function () {
            return this.listHead != null;
        },
        exists: function (item) {
            if (null == this.listHead) {
                return false;
            } else if (this.listHead.x == item.x && this.listHead.y == item.y) {
                return true;
            }

            var p = this.listHead;
            while (null != p.nextHeapItem) {
                if (p.x == item.x && p.y == item.y) {
                    return true;
                }
                p = p.nextHeapItem;
            }
            return false;
        }
    });
})();