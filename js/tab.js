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

    var console = window.console,
        $ = window.jQuery,
        grace = window.grace,
        old = $.fn.graceTab;

    var GraceTab = function (element) {
        this.$element = $(element);
    };

    $.extend(GraceTab.prototype, {
        show: function () {
            var $li = this.$element.closest(".grace-tab > .tabs > li");
            if ($li.hasClass('active')) {
                return;
            }
            $li.trigger("click");
        }
    });

    $.fn.graceTab = function (option) {

        var isMethodCall = grace.plugin.isPluginMethodCall(option);

        function showHideTabContent($tabItem, show) {
            var selector = $tabItem.data("target");
            if (!selector) {
                var linkItem = $tabItem.children("a");
                if (linkItem && linkItem.length > 0) {
                    selector = linkItem[0].getAttribute("href");
                    selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ""); //strip for ie6, 7
                }
            }
            if(selector) {
                grace.showHide($(selector), show);
            }
        }

        function initEach($graceTab) {
            var $activeTabItem = null,
                $$tabItems = $graceTab.children(".tabs").children("li");

            $$tabItems.each(function (index) {
                var $tabItem = $(this);
                if (index === 0) {
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

            $$tabItems.click(function () {
                var $this = $(this);
                if (!$this.hasClass("active")) {
                    if ($activeTabItem) {
                        $activeTabItem.removeClass("active");
                        showHideTabContent($activeTabItem, false);
                    }
                    $activeTabItem = $this;
                    $activeTabItem.addClass("active");
                    showHideTabContent($activeTabItem, true);
                }
                return false;
            });

        }

        this.each(function () {
            var $graceTab = $(this);
            var data = $graceTab.data('grace.tab');
            if (!data) {
                $graceTab.data('grace.tab', (data = new GraceTab(this)))
            }
            if (isMethodCall) {
                data[option]();
            } else {
                initEach($graceTab);
            }
        });

        return grace.plugin.patch($.fn.graceTab, this, option);
    };

    $.fn.graceTab.Constructor = GraceTab;

    // NO CONFLICT
    // ===============

    $.fn.graceTab.noConflict = function () {
        $.fn.graceTab = old;
        return this;
    };
})(window);