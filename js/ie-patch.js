/* ========================================================================
 * GUI: ie-patch.js v0.1.0
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

    if (!!$.fn.guiNav) {
        $.fn.guiNav.iePatch = function ($$guiNav, options) {
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
                        $guiNav.find("li li").each(function () {
                            var $this = $(this);
                            $this.width($this.parent().width());
                            if ($this.children("ul").length > 0) {
                                $this.css("margin-bottom", "-3px");
                            }
                        });
                    } else {
                        $guiNav.children("li").css("margin-left", "-16px").width($guiNav.width());
                        $guiNav.find("li").mouseenter(function () {
                            var $$subMenu = $(this).children("ul");
                            $$subMenu.children("li").width($$subMenu.width());
                        }).each(function () {
                                var $this = $(this);
                                if ($this.children("ul").length > 0) {
                                    $this.css("margin-bottom", "-3px");
                                }
                            });
                    }
                });
            } else if (gui.browserInfo.version <= 7) {
                $$guiNav.each(function () {
                    var $guiNav = $(this),
                        isVertical = $guiNav.hasClass("gui-nav-vertical");
                    if (isVertical) {
                        $guiNav.children("li").css("margin-left", "-16px").width($guiNav.width()).each(function () {
                            var $this = $(this);
                            if ($this.children("ul").length > 0) {
                                $this.css("margin-bottom", "-3px");
                            }
                        });
                    }
                });
            } else if (gui.browserInfo.version <= 8) {
                $$guiNav.each(function () {
                    var $guiNav = $(this),
                        isVertical = $guiNav.hasClass("gui-nav-vertical");
                    if (!isVertical) {
                        $guiNav.children("li:not(:first-child)").css("margin-left", "-4px");
                    }
                });
            }
            return $$guiNav;
        };
    }

    //
    // Tabs
    // --------------------------------------------------

    if (!!$.fn.guiTab) {
        $.fn.guiTab.iePatch = function ($$guiTab, options) {
            if (gui.plugin.isPluginInitialize(options)) {
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

    if (!!$.fn.guiButton) {
        $.fn.guiButton.iePatch = function ($$guiButton, options) {
            if (gui.browserInfo.version <= 9) {
                $("a.disabled").click(function () {
                    return false;
                });
            }
            if (gui.browserInfo.version <= 6) { // lte IE 6
                $$guiButton.each(function () {
                    var $this = $(this),
                        buttonStyle = /gui\-btn\-[^\s]+/.exec(this.className);
                    if ($this.hasClass("disabled") || $this.attr("disabled")) {
                        $this.css("cursor", "not-allowed");
                    } else {
                        $this.hover(function () {
                            $this.addClass(buttonStyle + "-active");
                        }, function () {
                            if (!$this.attr("selected")) {
                                $this.removeClass(buttonStyle + "-active");
                            }
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

    if (!!$.fn.guiButtonBar) {
        $.fn.guiButtonBar.iePatch = function ($$guiButtonBar, options) {
            if (gui.browserInfo.version <= 6) { // lte IE 6
                $$guiButtonBar.find(".gui-btn + .gui-btn").css("margin-left", "-1px");
            }
            return $$guiButtonBar;
        };
    }

    //
    // Affix.js
    // --------------------------------------------------

    if (!!$.fn.guiAffix) {
        $.fn.guiAffix.iePatch = function ($$guiAffix, options) {
            if (gui.browserInfo.version <= 6) { // lte IE 6
                var $window = $(window);
                $$guiAffix.detach().appendTo($("body")).css("position", "absolute");

                $$guiAffix.each(function () {
                    var $this = $(this),
                        data = $this.data();
                    if (!data.affixed) {
                        $this.data("affixed", true);
                        $window.on("scroll.gui.affix.data-api", function () {
                            if (data.offset.top == 0 || data.offset.top) {
                                $this.css("top", $window.scrollTop() + parseInt(data.offset.top, 10) + "px");
                            } else if (data.offset.bottom == 0 || data.offset.bottom) {
                                $this.css("top", $window.scrollTop() + $window.height() - $this.outerHeight() - parseInt(data.offset.bottom, 10) + "px");
                            }
                            if (data.offset.left == 0 || data.offset.left) {
                                $this.css("left", $window.scrollLeft() + parseInt(data.offset.left, 10) + "px");
                            } else if (data.offset.right == 0 || data.offset.right) {
                                $this.css("left", $window.scrollLeft() + $window.width() - $this.outerWidth() - parseInt(data.offset.right, 10) + "px");
                            }
                        });
                    }
                });
            }
            return $$guiAffix;
        };
    }

})(window);
