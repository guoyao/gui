/* ========================================================================
 * GUI: nav-ie-patch.js v0.1.0
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
        gui = window.gui;

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

    if(!!$.fn.guiNav) {
        $.fn.guiNav.iePatch = function ($$guiNav, option) {
            if (gui.plugin.isPluginInitialize(option)) {
                if (gui.browserInfo.version <= 6) { // lte IE 6
                    $$guiNav.find("li").hover(function () {
                        $(this).children("ul").css("display", "block");
                    }, function () {
                        $(this).children("ul").css("display", "none");
                    });
                    $$guiNav.each(function () {
                        var $guiNav = $(this),
                            isVertical = $guiNav.hasClass("gui-nav-vertical");
                        if (!isVertical) {
                            $guiNav.children("li").css("float", "left");
                        }
                    });
                }
            }
            return $$guiNav;
        };
    }

    //
    // Tabs
    // --------------------------------------------------

    if(!!$.fn.guiTab) {
        $.fn.guiTab.iePatch = function ($$guiTab, option) {
            if (gui.plugin.isPluginInitialize(option)) {
                if (gui.browserInfo.version <= 7) { // lte IE 7
                    setMaxHeight($$guiTab.children(".tabs"), "li", -1);
                }
            }
            return $$guiTab;
        };
    }

    //
    // Button
    // --------------------------------------------------

    if(!!$.fn.guiButton) {
        $.fn.guiButton.iePatch = function ($$guiButton, option) {
            if (gui.browserInfo.version <= 9) {
                $("a.disabled").click(function () {
                    return false;
                });
            }
            if (gui.browserInfo.version <= 6) { // lte IE 6
                $$guiButton.each(function () {
                    var $this = $(this);
                    var backgroundColor = $this.css("background-color");
                    var hoverBackgroundColor = gui.darken(backgroundColor, 0.08);
                    if ($this.hasClass("disabled") || $this.attr("disabled")) {
                        $this.css("cursor", "not-allowed");
                    } else {
                        $this.hover(function () {
                            $this.css("background-color", hoverBackgroundColor);
                        }, function () {
                            $this.css("background-color", backgroundColor);
                        });
                    }
                });
            }
            return $$guiButton;
        };
    }

    //
    // Button bar
    // --------------------------------------------------

    if(!!$.fn.guiButtonBar) {
        $.fn.guiButtonBar.iePatch = function ($$guiButtonBar, option) {
            if (gui.browserInfo.version <= 6) { // lte IE 6
                $$guiButtonBar.find(".gui-btn + .gui-btn").css("margin-left", "-1px");
            }
            return $$guiButtonBar;
        };
    }

})(window);
