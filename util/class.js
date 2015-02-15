/**
 * Created by Fan on 2015/2/15.
 */

'use strict';

(function () {

    function Class() {
    }

    Class.extend = function extend(props) {

        var prototype = new this();
        var _super = this.prototype;

        for (var name in props) {

            if (typeof props[name] == "function"
                && typeof _super[name] == "function") {

                prototype[name] = (function (super_fn, fn) {
                    return function () {
                        var tmp = this._super;

                        this._super = super_fn;

                        var ret = fn.apply(this, arguments);

                        this._super = tmp;

                        if (!this._super) {
                            delete this._super;
                        }
                        return ret;
                    }
                })(_super[name], props[name])
            } else {
                prototype[name] = props[name];
            }
        }

        function Class() {
        }

        Class.prototype = prototype;
        Class.prototype.constructor = Class;

        Class.extend = extend;
        Class.create = Class.prototype.create = function () {

            var instance = new this();

            if (instance.ctor) {
                instance.ctor.apply(instance, arguments);
            }

            return instance;
        };

        return Class;
    };

    global.Class = Class;
})();