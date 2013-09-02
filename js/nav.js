/* ========================================================================
 * GUI: nav.js v0.1.0
 * http://www.gui.guoyao.me/
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
        gui = window.gui,
        old = $.fn.guiNav;

    var GuiNav = function (element) {
        this.$element = $(element);
    };

//    $.extend(GuiNav.prototype, {});

    $.fn.guiNav = function (option) {

        var defaults = {
                backgroundColor: "#eeeeee",
                border: "",
                itemWidth: "120px",
                itemHeight: "30px",
                itemOverColor: "#d5d5d5",
                itemFadeIn: true,
                animationDuration: 500
            },
            isMethodCall = gui.plugin.isPluginMethodCall(option);

        function initEach($guiNav) {
            var isVertical = $guiNav.hasClass("gui-nav-vertical"),
                options = $.extend({}, defaults, option, $guiNav.data("option"));

            $guiNav.css({
                backgroundColor: options.backgroundColor,
                border: options.border
            }).find("ul").css({
                    backgroundColor: options.backgroundColor,
                    border: options.border
                });

            $guiNav.find("a").css({
                width: options.itemWidth,
                height: options.itemHeight,
                lineHeight: options.itemHeight
            }).hover(function () {
                    $(this).css("backgroundColor", options.itemOverColor);
                }, function () {
                    $(this).css("backgroundColor", options.backgroundColor);
                });

            if (isVertical) {
                $guiNav.css("width", options.itemWidth)
                    .find("ul").css("left", options.itemWidth);
            } else {
                $guiNav.css("height", options.itemHeight)
                    .find("ul ul").css("left", options.itemWidth);
            }

            if (options.itemFadeIn) {
                $guiNav.find("li").hover(function () {
                    $(this).children("ul").css("opacity", 0).animate({opacity: 1}, options.animationDuration);
                }, function () {
                });
            }
        }

        this.each(function () {
            var $guiNav = $(this);
            var data = $guiNav.data('gui.nav');
            if (!data) {
                $guiNav.data('gui.nav', (data = new GuiNav(this)))
            }
            if (isMethodCall) {
                data[option]();
            } else {
                initEach($guiNav);
            }
        });

        return gui.plugin.patch($.fn.guiNav, this, option);
    };

    $.fn.guiNav.Constructor = GuiNav;

    // NO CONFLICT
    // ===============

    $.fn.guiNav.noConflict = function () {
        $.fn.guiNav = old;
        return this;
    };

})(window);
