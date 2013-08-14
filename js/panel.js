(function (window) {
    "use strict";

    var document = window.document,
		console = window.console,
		$ = window.jQuery,
		grace = window.grace;

    $.fn.gracePanelsa = function (options) {

        var defaults = {
            animationDuration: 500,
            title: "test Title"
        };

        options = $.extend({}, defaults, options);

        function initEach() {
            var $gracePanelsa = $(this);
            $gracePanelsa.find(".panelsa-btn").each(function () {
                if ($(this).attr('class').indexOf("opened") != -1) {
                    $(this).prepend('<div>' + options.title + '</div>');
                    $(this).addClass('panelsa-a-opened');
                } else {
                    $(this).prepend('<div>' + options.title + '</div>');
                    $(this).addClass('panelsa-a-closed');
                }

                var tabContent = $(this).siblings(".panelsa-content");

                var orgHeight;
                if (!tabContent.is(":visible")) {
                    tabContent.show();
                    orgHeight = tabContent.height();
                    tabContent.hide();
                } else {
                    orgHeight = tabContent.height();
                }
                $(this).click(function () {
                    if ($(this).attr('class').indexOf("opened") != -1) {
                        $(this).removeClass('panelsa-a-opened');
                        $(this).addClass('panelsa-a-closed');
                    }
                    else {
                        $(this).removeClass('panelsa-a-closed');
                        $(this).addClass('panelsa-a-opened');
                    }
                    var curHeight = $(this).siblings(".panelsa-content").height();
                    if (curHeight <= 0 || tabContent.is(":hidden")) {
                        tabContent.css({ display: "block", height: 0, opacity: 0 }).animate({ height: orgHeight, opacity: 1 }, options.animationDuration);
                    } else {
                        tabContent.animate({ height: 0, opacity: 0 }, options.animationDuration);
                    }
                });
            });
        }
        return this.each(initEach);
    };

})(window);
