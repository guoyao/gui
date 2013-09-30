/* ========================================================================
 * GUI: tab.js v0.1.0
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
        document = window.document,
        $ = window.jQuery,
        gui = window.gui,
        old = $.fn.guiSplitter;

    var GuiSplitter = function (element, options) {
        this.$element = $(element);
        this.$firstPart = this.$element.find("> .gui-splitter-part-first");
        this.$secondPart = this.$element.find("> .gui-splitter-part-second");
        this.$splitBar = $('<div class="gui-splitter-control-bar"></div>');
        this.$ghostSplitBar = undefined; // splitbar ghosted element
        this.options = options;
        this.transitioning = false;
        this.splitPosition = 0; // current split position
        this.savedSplitPosition = 0; // saved split position
        this.minWidth = Math.max(options.minWidth ? parseInt(options.minWidth, 10) : 0); // min width of first part
        this.maxWidth = Math.min(options.maxWidth ? parseInt(options.maxWidth, 10) : this.$element.width());
        this.padding = this.$element.css(options.vertical ? "padding-top" : "padding-left");
        this.padding = this.padding ? parseInt(this.padding, 10) : 0;
    };

    GuiSplitter.prototype.init = function () {
        this.$firstPart.after(this.$splitBar);
        this.splitPosition = this.$firstPart.width() - this.$splitBar.outerWidth(true);
        this.$firstPart.width(this.splitPosition);
        var that = this;
        if (this.options.closeable) {
            this.$closeButton = $('<div class="gui-splitter-close-btn"></div>');
            this.$splitBar.append(this.$closeButton);
            this.maxWidth = Math.max(this.maxWidth - this.$splitBar.outerWidth(true), 0);
            this.$closeButton.mousedown(function () {
                that.$closeButton.toggleClass("gui-splitter-close-btn-inverse").hide();
                that.splitTo();
            });
        }
        this.$splitBar.on("mousedown", function (e) {
            if (e.target == this) {
                that.startDrag(e.pageX);
            }
        });
    };

    GuiSplitter.prototype.startDrag = function (mousePosition) {
        this.$ghostSplitBar = this.$ghostSplitBar || this.$splitBar.clone(false).insertAfter(this.$firstPart);
        this.$ghostSplitBar.addClass("gui-splitter-control-bar-ghost").css({
            width: this.$splitBar.width(),
            height: this.$splitBar.height()
        });
        var that = this,
            startPosition = this.splitPosition + this.padding;
        this.$ghostSplitBar.css("left", startPosition);
        this.$ghostSplitBar.show();
        $(document).on("mousemove.gui.splitter", function (e) {
            that.performDrag(startPosition, e.pageX - mousePosition);
        }).on("mouseup.gui.splitter", function () {
                that.endDrag();
            });
    };

    GuiSplitter.prototype.performDrag = function (startPosition, increment) {
        var position = Math.min(this.maxWidth + this.padding, Math.max(this.minWidth + this.padding, startPosition + increment));
        this.$ghostSplitBar.css("left", position);
    };

    GuiSplitter.prototype.endDrag = function () {
        $(document).off(".gui.splitter");
        this.splitTo(parseInt(this.$ghostSplitBar.css("left")) - this.padding);
    };

    GuiSplitter.prototype.splitTo = function (position) {
        if (this.transitioning) {
            return;
        }
        this.transitioning = true;
        var that = this;
        if (position || position == 0) {
            this.$firstPart.animate({width: position}, this.options.animationDuration, function () {
                that.transitioning = false;
                that.splitPosition = position;
                that.$closeButton.fadeIn("fast");
                that.$ghostSplitBar.hide();
            });
            this.$secondPart.animate({width: this.$element.width() - this.$splitBar.outerWidth(true) - position}, this.options.animationDuration);
        } else {
            if (this.splitPosition > 0) {
                this.savedSplitPosition = this.splitPosition;
                position = 0;
            } else {
                position = this.savedSplitPosition;
            }
            this.$firstPart.animate({width: position}, this.options.animationDuration, function () {
                that.transitioning = false;
                that.splitPosition = position;
                that.$closeButton.fadeIn("fast");
            });
            this.$secondPart.animate({width: this.$element.width() - this.$splitBar.outerWidth(true) - position}, this.options.animationDuration);
        }
    };

    $.fn.guiSplitter = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data("gui.splitter");

            if (!data) {
                $this.data("gui.splitter", (data = new GuiSplitter(this, $.extend({}, $.fn.guiSplitter.defaults, $this.data(), typeof option == 'object' && option))));
                data.init();
            }
            if (gui.plugin.isPluginMethodCall(option)) {
                data[option]();
            }
        });
    };

    $.fn.guiSplitter.defaults = {
        closeable: true,
        animationDuration: "fast"
    };

    $.fn.guiSplitter.Constructor = GuiSplitter;

    // NO CONFLICT
    // ===============

    $.fn.guiSplitter.noConflict = function () {
        $.fn.guiSplitter = old;
        return this;
    };
})(window);