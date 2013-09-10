/**
 * Author: guoyao
 * Time: 09-10-2013 17:02
 * Blog: http://www.guoyao.me
 */

require(["jquery", "prettify", "gui"], function ($, prettify) {
    var root = window,
        gui = root.gui;

    if (gui.browserInfo.isIE) {
        if (gui.browserInfo.version <= 9) { // lte IE 9
            $(".gui-btn").guiButton();
        }
        if (gui.browserInfo.version <= 8) { // lte IE 8
            $(".gui-callout p:last-child").css("margin-bottom", 0);
        }
    }

    $("#loading-btn").click(function () {
        var $btn = $(this);
        $btn.guiButton("loading");
        setTimeout(function () {
            $btn.guiButton("reset");
        }, 3000);
    });

    prettify.prettyPrint();
});