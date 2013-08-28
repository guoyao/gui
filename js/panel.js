/* ========================================================================
 * Copyright 2013 andy zhang
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
        old = $.fn.guiPanel;

    var GuiPanel = function (element) {
        this.$element = $(element);
    };

    $.extend(GuiPanel.prototype, {
        show: function () {
            var $headerdiv = this.$element.find("> .panelsa-btn");
            if ($headerdiv.hasClass('panelsa-a-closed')) {
                console.debug("this is return");
                return;
            }
            $headerdiv.trigger("click");
        },
        hidden: function () {
            var $headerdiv1 = this.$element.find("> .panelsa-btn");
            if ($headerdiv1.hasClass('panelsa-a-opened')) {
                return;
            }
            $headerdiv1.trigger("click");
        }
    });

    $.fn.guiPanel = function (option) {

        var defaults = {
                animationDuration: 500,
                title: "test Title"
            },
            isMethodCall = gui.plugin.isPluginMethodCall(option);

        function initEach($guiPnl) {
            var options = $.extend({}, defaults, option, $guiPnl.data("option"));

            $guiPnl.find(".panelsa-btn").each(function () {
                var $this=$(this);
                if ($this.attr('class').indexOf("opened") != -1) {
                    $this.prepend('<div>' + options.title + '</div>');
                    $this.addClass('panelsa-a-opened');
                } else {
                    $this.prepend('<div>' + options.title + '</div>');
                    $this.addClass('panelsa-a-closed');
                }

                var tabContent = $this.siblings(".panelsa-content");

                var orgHeight;
                if (!tabContent.is(":visible")) {
                    tabContent.show();
                    orgHeight = tabContent.height();
                    tabContent.hide();
                } else {
                    orgHeight = tabContent.height();
                }
                $this.click(function () {
                    var $this1=$(this);
                    if ($this1.attr('class').indexOf("opened") != -1) {
                        $this1.removeClass('panelsa-a-opened');
                        $this1.addClass('panelsa-a-closed');
                    }
                    else {
                        $this1.removeClass('panelsa-a-closed');
                        $this1.addClass('panelsa-a-opened');
                    }
                    var curHeight =$this1.siblings(".panelsa-content").height();
                    if (curHeight <= 0 || tabContent.is(":hidden")) {
                        tabContent.css({ display: "block", height: 0, opacity: 0 }).animate({ height: orgHeight, opacity: 1 }, options.animationDuration);
                    } else {
                        tabContent.animate({ height: 0, opacity: 0 }, options.animationDuration);
                    }
                });
            });
        }

        this.each(function () {
            var $guiPnl = $(this);
            var data = $guiPnl.data('gui.pnl');
            if (!data) {
                $guiPnl.data('gui.pnl', (data = new GuiPanel(this)))
            }
            if (isMethodCall) {
                data[option]();
            } else {
                initEach($guiPnl);
            }
        });

        return gui.plugin.patch($.fn.guiPanel, this, option);
    };

    $.fn.guiPanel.Constructor = GuiPanel;

    // NO CONFLICT
    // ===============

    $.fn.guiPanel.noConflict = function () {
        $.fn.guiPanel = old;
        return this;
    };

})(window);