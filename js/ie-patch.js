/* ========================================================================
 * GUI: ie-patch.js v0.2.0
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

(function (window, undefined) {
    "use strict";

    var console = window.console,
        $ = window.jQuery,
        gui = window.gui;

    if (!gui.browserInfo.isIE)
        return;

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
        $.fn.guiNav.iePatch = function ($$guiNav, option) {
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

    if (!!$.fn.guiButton) {
        if (gui.browserInfo.version <= 6) {  // lte IE 6
            var GuiButton = $.fn.guiButton.Constructor;
            GuiButton.prototype.toggle = function () {
                var $parent = this.$element.closest('[data-toggle="buttons"]');
                if (this.$element.data("active") === undefined) {
                    this.$element.data("active", false);
                }
                this.$element.data("active", !this.$element.data("active"));
                if ($parent.length) {
                    var buttonStyle = /gui\-btn\-[^\s]+/.exec(this.$element.attr("class"));
                    var $input = this.$element.find('input');
                    if ($input.prop('type') === 'checkbox') {
                        $input.prop('checked', this.$element.data("active"))
                            .trigger('change');
                        if (this.$element.data("active")) {
                            this.$element.addClass(buttonStyle + "-active");
                        }
                    } else if ($input.prop('type') === 'radio') {
                        $parent.find("." + buttonStyle + "-active").removeClass(buttonStyle + "-active").data("active", false);
                        this.$element.data("active", true);
                        this.$element.addClass(buttonStyle + "-active");
                        if(!$input.prop('checked')) {
                            $input.prop('checked', true).trigger('change');
                        }
                    }
                }
            }
        }

        $.fn.guiButton.iePatch = function ($$guiButton, option) {
            if (gui.plugin.isPluginInitialize(option)) {
                if (gui.browserInfo.version <= 9) {
                    $("a.disabled").click(function () {
                        return false;
                    });
                }
                if (gui.browserInfo.version <= 6) { // lte IE 6
                    $$guiButton.each(function () {
                        var $this = $(this),
                            buttonStyle;
                        if ($this.hasClass("disabled") || $this.attr("disabled")) {
                            $this.css("cursor", "not-allowed");
                        } else {
                            buttonStyle = /gui\-btn\-[^\s]+/.exec(this.className);
                            $this.hover(function () {
                                $this.addClass(buttonStyle + "-active");
                            }, function () {
                                if (!$this.data("active")) {
                                    $this.removeClass(buttonStyle + "-active");
                                }
                            });
                        }
                    });
                }
            }
            return $$guiButton;
        };
    }

    //
    // Button bar
    // --------------------------------------------------

    if (!!$.fn.guiButtonBar) {
        $.fn.guiButtonBar.iePatch = function ($$guiButtonBar, option) {
            if (gui.browserInfo.version <= 6) { // lte IE 6
                $$guiButtonBar.find(".gui-btn + .gui-btn").css("margin-left", "-1px");
                $$guiButtonBar.each(function () {
                    var $this = $(this);
                    if ($this.data("toggle") == "buttons") {
                        $this.find('> .gui-btn > input[type="radio"]').css("display", "none");
                        $this.find('> .gui-btn > input[type="checkbox"]').css("display", "none");
                    }
                });
            }
            return $$guiButtonBar;
        };
    }

    //
    // Affix.js
    // --------------------------------------------------

    if (!!$.fn.guiAffix) {
        $.fn.guiAffix.iePatch = function ($$guiAffix, option) {
            if (gui.browserInfo.version <= 6) { // lte IE 6
                var $window = $(window);
                $$guiAffix.detach().appendTo($("body")).css("position", "absolute");

                $$guiAffix.each(function () {
                    var $this = $(this),
                        data = $this.data();
                    if (!data.affixed) {
                        $this.data("affixed", true);
                        $window.on("scroll.gui.affix.data-api", function () {
                            if (data.offset.top === 0 || data.offset.top) {
                                $this.css("top", $window.scrollTop() + parseInt(data.offset.top, 10) + "px");
                            } else if (data.offset.bottom === 0 || data.offset.bottom) {
                                $this.css("top", $window.scrollTop() + $window.height() - $this.outerHeight() - parseInt(data.offset.bottom, 10) + "px");
                            }
                            if (data.offset.left === 0 || data.offset.left) {
                                $this.css("left", $window.scrollLeft() + parseInt(data.offset.left, 10) + "px");
                            } else if (data.offset.right === 0 || data.offset.right) {
                                $this.css("left", $window.scrollLeft() + $window.width() - $this.outerWidth() - parseInt(data.offset.right, 10) + "px");
                            }
                        });
                    }
                });
            }
            return $$guiAffix;
        };
    }

    //
    // Table Plugin
    // --------------------------------------------------
    $.fn.guiTable = function () {
        if (gui.browserInfo.version <= 6) { // lte IE 6
            this.find("thead:first-child tr:first-child").find("th, td").css("border-top", 0);
        }
        if (gui.browserInfo.version <= 8) { // lte IE 8
            this.each(function () {
                var $this = $(this);
                if ($this.hasClass("gui-table-striped")) {
                    $this.find("> tbody > tr:nth-child(odd)").addClass("nth-child-odd");
                }
                if (gui.browserInfo.version <= 6) { // lte IE 6
                    if ($this.hasClass("gui-table-hover")) {
                        $this.find("> tbody > tr").hover(function () {
                            var state = /success|danger|warning/.exec(this.className);
                            $(this).addClass(state ? state + "-hover" : "hover");
                        }, function () {
                            var state = /success|danger|warning/.exec(this.className);
                            $(this).removeClass(state ? state + "-hover" : "hover");
                        });
                    }
                }
            });
        }
        return this;
    };

    //
    // Panels
    // --------------------------------------------------
    $.fn.guiPanel = function () {
        if (gui.browserInfo.version <= 7) { // lte IE 7
            this.find("> .gui-panel-body + .gui-table").addClass("gui-table-beside-gui-panel-body");
        }
        if (gui.browserInfo.version <= 6) { // lte IE 6
            this.find("[data-toggle=collapse]").css("cursor", "pointer");
            this.each(function () {
                var $this = $(this),
                    $parent = $this.parent(),
                    inPanelGroup = $parent.hasClass("gui-panel-group");
                if (inPanelGroup) {
                    $parent.find(".gui-panel + .gui-panel").addClass("gui-panel-beside-gui-panel");
                    $this.find(".gui-panel-heading + .gui-panel-collapse").addClass("gui-panel-collapse-beside-heading");
                    $this.find(".gui-panel-footer + .gui-panel-collapse").addClass("gui-panel-collapse-beside-footer");
                }
            });
        }
        return  this;
    };

    //
    // Breadcrumbs
    // --------------------------------------------------
    if (!!$.fn.guiBreadcrumb) {
        if (gui.browserInfo.version <= 7) { // lte IE 7
            var GuiBreadcrumb = $.fn.guiBreadcrumb.Constructor;
            GuiBreadcrumb.prototype.init = function () {
                var seperator = this.options.seperator;
                this.$element.find("> li:not(:first-child)").each(function () {
                    var $this = $(this);
                    if ($this.find(".gui-breadcrumb-sperator").length === 0) {
                        $('<span class="gui-breadcrumb-sperator">' + (seperator || '/') + '</span>').prependTo($this);
                    }
                });
                this.update();
            };
        }
    }

    //
    // Splitter
    // --------------------------------------------------
    if (!!$.fn.guiSplitter) {
        if (gui.browserInfo.version <= 6) { // lte IE 6
            var GuiSplitter = $.fn.guiSplitter.Constructor,
                superInit = GuiSplitter.prototype.init,
                superStartDrag = GuiSplitter.prototype.startDrag;

            GuiSplitter.prototype.init = function () {
                this.$splitBar.addClass("gui-splitter-control-bar-ie");
                this.$firstPart.addClass("gui-splitter-part-first-ie");
                this.$secondPart.addClass("gui-splitter-part-second-ie");
                if (this.isVertical) {
                    this.$splitBar.addClass("gui-splitter-vertical-control-bar-ie");
                    this.$firstPart.addClass("gui-splitter-vertical-part-first-ie");
                    this.$secondPart.addClass("gui-splitter-vertical-part-second-ie");
                }
                superInit.call(this);
//                console.debug(this.$element.width() + " : " + this.$firstPart.width() + " : " + this.$splitBar.width() + " : " + this.$secondPart.width());
            };

            GuiSplitter.prototype.startDrag = function (mousePosition) {
                if (!this.$ghostSplitBar) {
                    this.$ghostSplitBar = this.$splitBar.clone(false).insertAfter(this.$firstPart);
                    this.$ghostSplitBar.addClass("gui-splitter-control-bar-ghost gui-splitter-control-bar-ghost-ie").css({
                        width: this.$splitBar.width(),
                        height: this.$splitBar.height()
                    });
                }
                superStartDrag.call(this, mousePosition);
            };
        }
    }

})(window);
