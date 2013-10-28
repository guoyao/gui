/* ========================================================================
 * GUI: nav.js v0.2.0
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

    $.fn.guiNav = function (option) {

        var defaults = {
            styleName: "",
            itemFadeIn: true,
            animationDuration: 500
        };

        option = $.extend(defaults, option);

        this.each(function () {
            var $guiNav = $(this),
                isVertical = $guiNav.hasClass("gui-nav-vertical");

            if (option.styleName) {
                $guiNav.addClass(option.styleName);
            }

            $guiNav.find("li").mouseenter(function () {
                var $navItem = $(this),
                    $$subMenu = $navItem.children("ul");
                $$subMenu.css("left", (isVertical || !$navItem.parent().hasClass("gui-nav")) ? $navItem.width() : 0);
                if (option.itemFadeIn) {
                    $$subMenu.css("opacity", 0).animate({opacity: 1}, option.animationDuration);
                }
            });
        });

        return gui.plugin.patch($.fn.guiNav, this, option);
    };

    // NO CONFLICT
    // ===============

    $.fn.guiNav.noConflict = function () {
        $.fn.guiNav = old;
        return this;
    };

})(window);
