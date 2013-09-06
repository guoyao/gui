/**
 * Author: guoyao
 * Time: 08-28-2013 12:28
 * Blog: http://www.guoyao.me
 */

/**
 * The build will inline common dependencies into this file.
 * For any third party dependencies, like jQuery, place them in the lib folder.
 * Configure loading modules from the lib directory.
 */
requirejs.config({
    baseUrl: "js/lib",
    paths: {
        app: "../app"
    },
    shim: {
        "gui": {
            deps: ["jquery"]
        }
    }
});

require(["jquery", "prettify", "gui"], function ($) {
    var gui = window.gui;
    $("#top-nav .gui-nav").guiNav();
    if (gui.browserInfo.isIE && gui.browserInfo.version <= 6) {
        $("#navigator").find("li:last-child a").css("border-bottom", 0);
        $("#top-nav").guiAffix({
            offset: 0
        });
    }
});