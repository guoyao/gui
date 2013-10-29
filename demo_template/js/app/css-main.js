/**
 * Author: guoyao
 * Time: 08-28-2013 12:54
 * Blog: http://www.guoyao.me
 */

define(function () {
    var demo = require("app/demo");

    var Module = demo.Module;
    new demo.Initializer([
        new Module("Normalize", "normalize"),
        new Module("Grid System", "grid-system"),
        new Module("Typography", "typography"),
        new Module("Buttons", "buttons"),
        new Module("Tables", "tables")
    ], {
        modulesDirectory: "modules/css"
    }).init();
});