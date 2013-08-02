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

    var document = window.document,
        console = window.console,
        $ = window.jQuery,
        grace = window.grace;

    $.fn.graceNav = function (options) {

        var defaults = {
            backgroundColor: "#eeeeee",
            border: "",
            itemWidth: "120px",
            itemHeight: "30px",
            itemOverColor: "#d5d5d5",
            itemFadeIn: true,
            animationDuration: 500
        };

        options = $.extend({}, defaults, options);

        function initEach() {
            var $graceNav = $(this),
                isVertical = $graceNav.hasClass("grace-nav-vertical"),
                option = $.extend({}, options, $graceNav.data());

            $graceNav.css({
                backgroundColor: option.backgroundColor,
                border: option.border
            }).find("ul").css({
                    backgroundColor: option.backgroundColor,
                    border: option.border
                });

            $graceNav.find("a").css({
                width: option.itemWidth,
                height: option.itemHeight,
                lineHeight: option.itemHeight
            }).hover(function () {
                    $(this).css("backgroundColor", option.itemOverColor);
                }, function () {
                    $(this).css("backgroundColor", option.backgroundColor);
                });

            if (isVertical) {
                $graceNav.css("width", option.itemWidth)
                    .find("ul").css("left", option.itemWidth);
            } else {
                $graceNav.css("height", option.itemHeight)
                    .find("ul ul").css("left", option.itemWidth);
            }

            if(option.itemFadeIn) {
                $graceNav.find("li").hover(function () {
                   $(this).children("ul").css("opacity", 0).animate({opacity: 1}, option.animationDuration);
                }, function () {});
            }
        }

        grace.patcher.patch($.fn.graceNav, this);

        return  this.each(initEach);
    };

})(window);
