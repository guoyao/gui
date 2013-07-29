/**
 * User: guoyao
 * Time: 07-26-2013 18:01
 * Blog: http://www.guoyao.me
 */

(function (document, $) {

    var isIe6 = $.browser.msie && $.browser.version == "6.0";

    $.fn.graceNav = function () {
        if (isIe6) {
            this.find("> li").css("float", "left");
            return this.find("li").hover(function () {
                $(this).find("> ul").css("display", "block");
            }, function () {
                $(this).find("> ul").css("display", "none");
            });
        }
        else {
            return this;
        }
    };

})(document, jQuery);