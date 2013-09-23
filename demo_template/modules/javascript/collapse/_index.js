/**
 * Author: guoyao
 * Time: 09-23-2013 10:43
 * Blog: http://www.guoyao.me
 */

require(["jquery", "prettify", "gui"], function ($, prettify) {
//    $("#collapsibleContainer4").on("hide.gui.collapse", function (e) {
//        e.preventDefault();
//    });

    if (gui.browserInfo.isIE) {
        if (gui.browserInfo.version <= 8) { // lte IE 8
            $(".module-container .gui-table").guiTable();
        }
        if (gui.browserInfo.version <= 7) { // lte IE 7
            $(".module-container .gui-panel").guiPanel();
        }
    }

    prettify.prettyPrint();
});
