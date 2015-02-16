/**
 * Created by Fan on 2015/2/16.
 */

(function () {

    mg.util = mg.util || {};
    mg.util.TMXMap = mg.Class.extend({
        tmx: '',
        ctor: function (tmxFile) {
            var fs = require('fs');
            this._tmx = fs.readFileSync(tmxFile, "utf8");
        },
        setProperty: function (name, value) {
            this._tmx = this._tmx.replace(new RegExp('{' + name + '}', 'g'), value);
        },
        getContent: function () {
            return this._tmx;
        }
    });
})();