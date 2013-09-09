/**
 * Author: guoyao
 * Time: 08-28-2013 12:54
 * Blog: http://www.guoyao.me
 */

define(["./demo"], function (demo) {
    var Module = demo.Module;
    new demo.Initializer([
        new Module("Affix", "affix")
    ], {
        modulesDirectory: "modules/javascript"
    }).init();
});
