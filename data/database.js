/**
 * Created by Fan on 2015/2/16.
 */

(function () {

    var Engine = require('tingodb')();
    mg.database = new Engine.Db(mg.config.dbPath, {});
})();