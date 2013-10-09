/**
 * Author: guoyao
 * Time: 09-25-2013 17:34
 * Blog: http://www.guoyao.me
 */

require(["jquery", "prettify", "gui"], function ($, prettify) {
    var root = window,
        gui = root.gui;

    $(".module-container .gui-breadcrumb").guiBreadcrumb();

    prettify.prettyPrint();
});