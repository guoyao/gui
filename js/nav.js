/* ========================================================================
 * Graceful-web-ui: nav.js v0.1.0alpha
 * http://www.grace.guoyao.me/
 * ========================================================================
 * Copyright 2013 Guoyao Wu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */

(function (window) {
    "use strict";

    var console = window.console,
        $ = window.jQuery,
        grace = window.grace,
        old = $.fn.graceNav;

    var GraceNav = function (element) {
        this.$element = $(element);
    };

//    $.extend(GraceNav.prototype, {});

    $.fn.graceNav = function (option) {

        var defaults = {
                backgroundColor: "#eeeeee",
                border: "",
                itemWidth: "120px",
                itemHeight: "30px",
                itemOverColor: "#d5d5d5",
                itemFadeIn: true,
                animationDuration: 500
            },
            isMethodCall = grace.plugin.isPluginMethodCall(option);

        function initEach($graceNav) {
            var isVertical = $graceNav.hasClass("grace-nav-vertical"),
                options = $.extend({}, defaults, option, $graceNav.data("option"));

            $graceNav.css({
                backgroundColor: options.backgroundColor,
                border: options.border
            }).find("ul").css({
                    backgroundColor: options.backgroundColor,
                    border: options.border
                });

            $graceNav.find("a").css({
                width: options.itemWidth,
                height: options.itemHeight,
                lineHeight: options.itemHeight
            }).hover(function () {
                    $(this).css("backgroundColor", options.itemOverColor);
                }, function () {
                    $(this).css("backgroundColor", options.backgroundColor);
                });

            if (isVertical) {
                $graceNav.css("width", options.itemWidth)
                    .find("ul").css("left", options.itemWidth);
            } else {
                $graceNav.css("height", options.itemHeight)
                    .find("ul ul").css("left", options.itemWidth);
            }

            if (options.itemFadeIn) {
                $graceNav.find("li").hover(function () {
                    $(this).children("ul").css("opacity", 0).animate({opacity: 1}, options.animationDuration);
                }, function () {
                });
            }
        }

        this.each(function () {
            var $graceNav = $(this);
            var data = $graceNav.data('grace.nav');
            if (!data) {
                $graceNav.data('grace.nav', (data = new GraceNav(this)))
            }
            if (isMethodCall) {
                data[option]();
            } else {
                initEach($graceNav);
            }
        });

        return grace.plugin.patch($.fn.graceNav, this, option);
    };

    $.fn.graceNav.Constructor = GraceNav;

    // NO CONFLICT
    // ===============

    $.fn.graceNav.noConflict = function () {
        $.fn.graceNav = old;
        return this;
    };

})(window);
