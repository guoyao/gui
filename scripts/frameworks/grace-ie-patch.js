/**
 * User: guoyao
 * Time: 07-30-2013 15:41
 * Blog: http://www.guoyao.me
 */

(function (window, $) {

    var document = window.document,
        console = window.console,
        browserInfo = {
            isIE: $.browser.msie,
            version: Number($.browser.version),
            documentMode: Number(document.documentMode)
        };

    $.fn.graceNav.iePatch = function ($$graceNav) {
        if (browserInfo.version <= 6) { // lte IE 6
            $$graceNav.find("li").hover(function () {
                $(this).find("> ul").css("display", "block");
            }, function () {
                $(this).find("> ul").css("display", "none");
            });
            $$graceNav.each(function () {
                var $graceNav = $(this);
                var isVertical = $graceNav.hasClass("grace-nav-vertical");
                if (!isVertical) {
                    $graceNav.find("> li").css("float", "left");
                }
            });
        }
    };

})(window, jQuery);



