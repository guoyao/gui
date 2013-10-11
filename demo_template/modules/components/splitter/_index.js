/**
 * Author: guoyao
 * Time: 09-27-2013 16:51
 * Blog: http://www.guoyao.me
 */

require(["jquery", "prettify", "gui"], function ($, prettify) {
    var root = window,
        gui = root.gui;

    $(".module-container .gui-splitter").guiSplitter({
        minWidth: 50,
        maxWidth: 200
    });

    prettify.prettyPrint();
});