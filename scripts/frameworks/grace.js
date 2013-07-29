/**
 * User: guoyao
 * Time: 07-26-2013 18:01
 * Blog: http://www.guoyao.me
 */

(function (document, $) {

    var browserInfo = {
        isIE: $.browser.msie,
        version: Number($.browser.version),
        documentMode: Number(document.documentMode)
    };

    $.fn.graceNav = function () {
        return this.each(function () {
            var $graceNav = $(this);
            var isVertical = $graceNav.hasClass("grace-nav-vertical");
            if (browserInfo.isIE) {
                if (isVertical && (browserInfo.version <= 7 || browserInfo.documentMode <= 7)) {
                    $graceNav.find("> li").hover(function () {
                        if($(this).find("> ul").length > 0) {
                            $(this).css("margin-bottom", "-3px");
                        }
                    }, function () {
                        $(this).css("margin-bottom", 0);
                    })
                }
                if(browserInfo.version <= 6) {
                    if(isVertical) {
                        $graceNav.find("> li").css("width", "120px");
                    }
                    else {
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

})(document, jQuery);