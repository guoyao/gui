/* ========================================================================
 * Graceful-web-ui: nav-ie-patch.js v0.0.1
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

(function (window, $) {
    "use strict";

    var document = window.document,
        console = window.console,
        browserInfo = {
            isIE: $.browser.msie,
            version: Number($.browser.version),
            documentMode: Number(document.documentMode)
        };

    $.fn.graceNav.iePatch = function ($$graceNav) {
        if (browserInfo.version <= 6) { // lte IE 6
            $$graceNav.find("li").hover(function () {
                $(this).find("> ul").css("display", "block");
            }, function () {
                $(this).find("> ul").css("display", "none");
            });
            $$graceNav.each(function () {
                var $graceNav = $(this);
                var isVertical = $graceNav.hasClass("grace-nav-vertical");
                if (!isVertical) {
                    $graceNav.find("> li").css("float", "left");
                }
            });
        }
    };

})(window, jQuery);
