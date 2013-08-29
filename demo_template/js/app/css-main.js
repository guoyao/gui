/**
 * Author: guoyao
 * Time: 08-28-2013 12:54
 * Blog: http://www.guoyao.me
 */

define(["./demo"], function (demo) {
    var Module = demo.Module;
    new demo.Initializer([
        new Module("Normalize", "normalize"),
        new Module("Grid System", "grid-system"),
        new Module("Typography", "typography"),
        new Module("Buttons", "buttons")
    ], {
        modulesDirectory: "modules/css"
    }).init();
});