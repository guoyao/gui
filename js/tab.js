/* ========================================================================
 * GUI: tab.js v0.1.0alpha
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
        old = $.fn.guiTab;

    var GuiTab = function (element) {
        this.$element = $(element);
    };

    $.extend(GuiTab.prototype, {
        show: function () {
            var $li = this.$element.closest(".gui-tab > .tabs > li");
            if ($li.hasClass('active')) {
                return;
            }
            $li.trigger("click");
        }
    });

    $.fn.guiTab = function (option) {

        var isMethodCall = gui.plugin.isPluginMethodCall(option);

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
                gui.showHide($(selector), show);
            }
        }

        function initEach($guiTab) {
            var $activeTabItem = null,
                $$tabItems = $guiTab.children(".tabs").children("li");

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
            var $guiTab = $(this);
            var data = $guiTab.data('gui.tab');
            if (!data) {
                $guiTab.data('gui.tab', (data = new GuiTab(this)))
            }
            if (isMethodCall) {
                data[option]();
            } else {
                initEach($guiTab);
            }
        });

        return gui.plugin.patch($.fn.guiTab, this, option);
    };

    $.fn.guiTab.Constructor = GuiTab;

    // NO CONFLICT
    // ===============

    $.fn.guiTab.noConflict = function () {
        $.fn.guiTab = old;
        return this;
    };
})(window);