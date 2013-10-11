/**
 * Author: guoyao
 * Time: 09-27-2013 16:51
 * Blog: http://www.guoyao.me
 */

require(["jquery", "prettify", "gui"], function ($, prettify) {
    var root = window,
        gui = root.gui;

    $(".module-container .gui-splitter").guiSplitter();

    if (gui.browserInfo.isIE) {
        if (gui.browserInfo.version <= 8) { // lte IE 8
            $(".module-container .gui-table").guiTable();
        }
    }

    prettify.prettyPrint();
});