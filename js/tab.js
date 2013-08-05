/* ========================================================================
 * Graceful-web-ui: tab.js v0.1.0alpha
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

    $.fn.graceTab = function (options) {

        var defaults = {

        };
        options = $.extend({}, defaults, options);

        function showHideTabContent($tabItem, show) {
            var linkItem = $tabItem.children("a");
            if (linkItem && linkItem.length > 0) {
                var contentId = linkItem[0].getAttribute("href");
                if (/:\/\//.test(contentId)) {
                    contentId = contentId.substring(contentId.lastIndexOf("#"), contentId.length);
                    console.debug(contentId);
                }
                grace.showHide($(contentId), show);
            }
        }

        function initEach() {
            var $activeTabItem,
                $graceTab = $(this),
                $$tabItems = $graceTab.children(".tabs").children("li");

            $$tabItems.each(function (index) {
                var $tabItem = $(this);
                if (index == 0) {
                    $activeTabItem = $tabItem;
                }
                if ($tabItem.hasClass("active")) {
                    if ($activeTabItem) {
                        $activeTabItem.removeClass("active");
                    }
                    $activeTabItem = $tabItem;
                }
            });

            if (!$activeTabItem) {
                return;
            }

            $activeTabItem.addClass("active");

            showHideTabContent($activeTabItem, true);

            $$tabItems.children("a").click(function () {
                if ($activeTabItem) {
                    $activeTabItem.removeClass("active");
                    showHideTabContent($activeTabItem, false);
                }
                $activeTabItem = $(this).parent();
                $activeTabItem.addClass("active");
                showHideTabContent($activeTabItem, true);
                return false;
            });

        }

        grace.patcher.patch($.fn.graceTab, this);

        return  this.each(initEach);
    };
})(window);