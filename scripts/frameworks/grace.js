/**
 * User: guoyao
 * Time: 07-26-2013 18:01
 * Blog: http://www.guoyao.me
 */

(function (window, $) {

    var document = window.document,
        console = window.console,
        _debug = function (value) {
            if (console) {
                console.debug(value);
            }
            else {
                alert(value);
            }
        };

    var browserInfo = {
        isIE: $.browser.msie,
        version: Number($.browser.version),
        documentMode: Number(document.documentMode)
    };

    $.fn.graceNav = function (options) {

        var defaults = {
            itemWidth: "120px",
            itemHeight: "30px"
        };

        options = $.extend({}, defaults, options);

        var init = function ($graceNav, isVertical) {
            $graceNav.find("a").css({
                width: options.itemWidth,
                height: options.itemHeight,
                lineHeight: options.itemHeight
            });
            if (isVertical) {
                $graceNav.find("ul").css("left", options.itemWidth);
            } else {
                $graceNav.find("ul ul").css("left", options.itemWidth);
            }
        };

        return this.each(function () {
            var $graceNav = $(this);
            var isVertical = $graceNav.hasClass("grace-nav-vertical");
            init($graceNav, isVertical);
            if (browserInfo.isIE) {
                if (browserInfo.version <= 6) {
                    if (!isVertical) {
                        $graceNav.find("> li").css("float", "left");
                    }
                    $graceNav.find("li").hover(function () {
                        $(this).find("> ul").css("display", "block");
                    }, function () {
                        $(this).find("> ul").css("display", "none");
                    });
                }
            }
        });
    };

})(window, jQuery);