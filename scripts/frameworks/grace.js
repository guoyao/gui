/**
 * User: guoyao
 * Time: 07-26-2013 18:01
 * Blog: http://www.guoyao.me
 */

(function (window, $) {

    var document = window.document,
        console = window.console,
        browserInfo = {
            isIE: $.browser.msie,
            version: Number($.browser.version),
            documentMode: Number(document.documentMode)
        },
        patcher = {
            patch: function (plugin, $$elements) {
                if (browserInfo.isIE && $.isFunction(plugin.iePatch)) {
                    plugin.iePatch($$elements);
                }
            }
        };

    $.fn.graceNav = function (options) {

        var defaults = {
            itemWidth: "120px",
            itemHeight: "30px"
        };

        options = $.extend({}, defaults, options);

        function initEach($graceNav) {
            var isVertical = $graceNav.hasClass("grace-nav-vertical");
            if (isVertical) {
                $graceNav.find("ul").css("left", options.itemWidth);
            } else {
                $graceNav.find("ul ul").css("left", options.itemWidth);
            }
        }

        this.find("a").css({
            width: options.itemWidth,
            height: options.itemHeight,
            lineHeight: options.itemHeight
        });

        patcher.patch($.fn.graceNav, this);

        return  this.each(initEach);
    };

})(window, jQuery);