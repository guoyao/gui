/* ========================================================================
 * Graceful-web-ui: nav-ie-patch.js v0.1.0alpha
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

    function setMaxHeight($$elements, childSelector, modifiedValue) {
        $$elements.each(function () {
            var $element = $(this),
                maxHeight = 0;
            $element.children(childSelector).each(function () {
                var height = $(this).height();
                if (height > maxHeight) {
                    maxHeight = height;
                }
            });
            if ($.isNumeric(modifiedValue)) {
                maxHeight += modifiedValue;
            }
            $element.height(maxHeight);
        });
    }

    //
    // Navs
    // --------------------------------------------------

    if(!!$.fn.graceNav) {
        $.fn.graceNav.iePatch = function ($$graceNav) {
            if (grace.browserInfo.version <= 6) { // lte IE 6
                $$graceNav.find("li").hover(function () {
                    $(this).children("ul").css("display", "block");
                }, function () {
                    $(this).children("ul").css("display", "none");
                });
                $$graceNav.each(function () {
                    var $graceNav = $(this),
                        isVertical = $graceNav.hasClass("grace-nav-vertical");
                    if (!isVertical) {
                        $graceNav.children("li").css("float", "left");
                    }
                });
            }
        };
    }

    //
    // Tabs
    // --------------------------------------------------

    if(!!$.fn.graceTab) {
        $.fn.graceTab.iePatch = function ($$graceTab) {
            if (grace.browserInfo.version <= 7) { // lte IE 7
                setMaxHeight($$graceTab.children(".tabs"), "li", -1);
            }
        };
    }

})(window);
