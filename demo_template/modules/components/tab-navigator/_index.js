/**
 * User: guoyao
 * Time: 07-26-2013 18:27
 * Blog: http://www.guoyao.me
 */

require(["jquery", "prettify", "gui"], function ($, prettify) {
    $(".gui-tab").guiTab();

    var timeoutId = setTimeout(function () {
        clearTimeout(timeoutId);
        $("[data-target=#tab3]").guiTab("show");
    }, 2000);

    prettify.prettyPrint();
});
