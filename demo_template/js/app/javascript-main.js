/**
 * Author: guoyao
 * Time: 08-28-2013 12:54
 * Blog: http://www.guoyao.me
 */

define(function (demo) {
    var demo = require("app/demo");

    var Module = demo.Module;
    new demo.Initializer([
        new Module("Affix", "affix"),
        new Module("Collapse", "collapse")
    ], {
        modulesDirectory: "modules/javascript"
    }).init();
});
