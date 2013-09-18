/**
 * Author: guoyao
 * Time: 09-12-2013 17:01
 * Blog: http://www.guoyao.me
 */

require(["jquery", "prettify", "gui"], function ($, prettify) {
    var root = window,
        gui = root.gui;

    if (gui.browserInfo.isIE) {
        if (gui.browserInfo.version <= 8) { // lte IE 8
            $(".gui-table").guiTable();
        }
    }

    prettify.prettyPrint();
});