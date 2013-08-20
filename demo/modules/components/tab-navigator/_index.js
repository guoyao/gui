/**
 * User: guoyao
 * Time: 07-26-2013 18:27
 * Blog: http://www.guoyao.me
 */

(function ($) {
    $(".grace-tab").graceTab();

    prettyPrint();

    var timeoutId = setTimeout(function () {
        clearTimeout(timeoutId);
        $("[data-target=#tab3]").graceTab("show");
    }, 2000);
})(jQuery);