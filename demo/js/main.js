/**
 * Author: guoyao
 * Time: 08-27-2013 16:05
 * Blog: http://www.guoyao.me
 */

requirejs.config({
    baseUrl: "js",
    paths: {
        "jquery": "lib/jquery.min",
        "graceful-web-ui": "graceful-web-ui.min",
        "demo": "demo",
        "prettify": "lib/prettify"
    },
    shim: {
        "graceful-web-ui": {
            deps: ["jquery"]
        }
    }
});

require(["jquery", "graceful-web-ui"], function ($) {
    var grace = window.grace;
    $("#top-nav .grace-nav").graceNav();
    if (grace.browserInfo.isIE && grace.browserInfo.version <= 6) {
        $("#navigator").find("li:last-child a").css("border-bottom", 0);
    }
});