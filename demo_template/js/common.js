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
        "graceful-web-ui": {
            deps: ["jquery"]
        }
    }
});

require(["jquery", "prettify", "graceful-web-ui"], function ($) {
    var grace = window.grace;
    $("#top-nav .grace-nav").graceNav();
    if (grace.browserInfo.isIE && grace.browserInfo.version <= 6) {
        $("#navigator").find("li:last-child a").css("border-bottom", 0);
    }
});