/* ========================================================================
 * GUI: tab.js v0.2.0
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
        this.isVertical = this.$element.hasClass("gui-splitter-vertical");
        if (this.isVertical) {
            options.sizing = "height";
            options.moving = "top";
            options.eventPosition = "pageY";
            options.outerSize = "outerHeight";
        } else {
            options.sizing = "width";
            options.moving = "left";
            options.eventPosition = "pageX";
            options.outerSize = "outerWidth";
        }
        this.options = options;
        this.transitioning = false;
        this.splitPosition = 0; // current split position
        this.savedSplitPosition = 0; // saved split position
        this.totalSize = this.$element[options.sizing]();
        this.minSize = Math.min(Math.max(options.minSize ? parseInt(options.minSize, 10) : 0, 0), this.totalSize); // min width/height of first part
        this.maxSize = Math.max(Math.min(options.maxSize ? parseInt(options.maxSize, 10) : this.totalSize, this.totalSize), 0);
        this.padding = this.$element.css(this.isVertical ? "padding-top" : "padding-left");
        this.padding = this.padding ? parseInt(this.padding, 10) : 0;
    };

    GuiSplitter.prototype.init = function () {
        this.$firstPart.after(this.$splitBar);
        var splitBarSize = this.$splitBar[this.options.outerSize](true);
        if (this.maxSize + splitBarSize > this.totalSize) {
            this.maxSize -= splitBarSize;
        }
        this.splitPosition = Math.max(Math.min(parseInt(this.$firstPart[this.options.sizing](), 10), this.maxSize), this.minSize);
        if (this.options.splitPosition) {
            if (gui.isPercentage(this.options.splitPosition)) {
                this.splitPosition = this.totalSize * parseInt(this.options.splitPosition, 10) / 100;
            } else if (typeof this.options.splitPosition === "number" || typeof this.options.splitPosition === "string") {
                this.splitPosition = parseInt(this.options.splitPosition, 10);
            }
            this.splitPosition = parseInt(Math.max(Math.min(this.splitPosition, this.maxSize), this.minSize), 10);
        }
        this.$firstPart[this.options.sizing](this.splitPosition);
        this.$secondPart[this.options.sizing](this.totalSize - this.splitPosition - splitBarSize);
        var that = this;
        if (this.options.closeable) {
            this.$closeButton = $('<div class="gui-splitter-close-btn"></div>')
                .appendTo(this.$splitBar)
                .on("mousedown", function () {
                    that.$closeButton.toggleClass("gui-splitter-close-btn-inverse").hide();
                    that.splitTo();
                });
        }
        this.$splitBar.on("mousedown", function (e) {
            if (e.target == this) {
                that.startDrag(e[that.options.eventPosition]);
            }
        });
        this.$element.on("resize", function () {
            that.$secondPart[that.options.sizing](that.$element[that.options.sizing]() - that.$firstPart[that.options.sizing]() - splitBarSize);
        });
    };

    GuiSplitter.prototype.update = function () {
        this.totalSize = this.$element[this.options.sizing]();
        this.minSize = Math.min(Math.max(this.options.minSize ? parseInt(this.options.minSize, 10) : 0, 0), this.totalSize); // min width/height of first part
        this.maxSize = Math.max(Math.min(this.options.maxSize ? parseInt(this.options.maxSize, 10) : this.totalSize, this.totalSize), 0);
        var splitBarSize = this.$splitBar[this.options.outerSize](true);
        if (this.maxSize + splitBarSize > this.totalSize) {
            this.maxSize -= splitBarSize;
        }
        this.splitPosition = Math.min(parseInt(this.$firstPart[this.options.sizing](), 10), this.maxSize);
        this.$firstPart[this.options.sizing](this.splitPosition);
        this.$secondPart[this.options.sizing](this.totalSize - this.splitPosition - splitBarSize);
    };

    GuiSplitter.prototype.show = function () {
        this.options.closeable && this.$closeButton.hasClass("gui-splitter-close-btn-inverse") && this.$closeButton.trigger("mousedown");
        return this;
    };

    GuiSplitter.prototype.hide = function () {
        this.options.closeable && !this.$closeButton.hasClass("gui-splitter-close-btn-inverse") && this.$closeButton.trigger("mousedown");
        return this;
    };

    GuiSplitter.prototype.toggle = function () {
        this.options.closeable && this.$closeButton.trigger("mousedown");
        return this;
    };

    GuiSplitter.prototype.startDrag = function (mousePosition) {
        if (!this.$ghostSplitBar) {
            this.$ghostSplitBar = this.$splitBar.clone(false)
                .insertAfter(this.$firstPart)
                .addClass("gui-splitter-control-bar-ghost")
                .css({
                    width: this.$splitBar.width(),
                    height: this.$splitBar.height()
                });
        }
        this.$closeButton && this.$ghostSplitBar.find(".gui-splitter-close-btn").toggleClass("gui-splitter-close-btn-inverse", this.$closeButton.hasClass("gui-splitter-close-btn-inverse"));
        this.$ghostSplitBar.css(this.options.moving, this.splitPosition + this.padding).show();
        var that = this;
        $(document).on("mousemove.gui.splitter", function (e) {
            that.performDrag(e[that.options.eventPosition] - mousePosition);
        }).on("mouseup.gui.splitter", function () {
                that.endDrag();
            });
    };

    GuiSplitter.prototype.performDrag = function (increment) {
        var splitPosition = this.splitPosition + increment;
        if (splitPosition < this.minSize || splitPosition > this.maxSize) {
            return;
        }
        this.$ghostSplitBar.css(this.options.moving, splitPosition + this.padding);
    };

    GuiSplitter.prototype.endDrag = function () {
        $(document).off(".gui.splitter");
        var position = parseInt(this.$ghostSplitBar.css(this.options.moving), 10) - this.padding;
        if (position != this.splitPosition) {
            this.splitTo(position);
        } else {
            this.$ghostSplitBar.hide();
        }
    };

    GuiSplitter.prototype.splitTo = function (position) {
        if (this.transitioning) {
            return;
        }
        var startEvent = $.Event('start.gui.splitter');
        this.$element.trigger(startEvent);
        if (startEvent.isDefaultPrevented()) {
            return;
        }

        this.transitioning = true;
        var that = this,
            animateProperties = {},
            secondPartAnimateProperties = {};
        if (position || position === 0) {
            position = Math.min(Math.max(position, this.minSize), this.maxSize);
            animateProperties[this.options.sizing] = position;
            this.$firstPart.animate(animateProperties, {
                duration: this.options.animationDuration,
                progress: function () {
                    that.$element.find(that.isVertical ? ".gui-splitter-vertical" : ".gui-splitter:not(.gui-splitter-vertical)").trigger("resize");
                },
                complete: function () {
                    that.transitioning = false;
                    that.splitPosition = position;
                    that.$ghostSplitBar && that.$ghostSplitBar.hide();
                    that.$closeButton && that.$closeButton.toggleClass("gui-splitter-close-btn-inverse", position === 0).fadeIn("fast");
                    that.$element.find(that.isVertical ? ".gui-splitter-vertical" : ".gui-splitter:not(.gui-splitter-vertical)").each(function () {
                        $(this).data("gui.splitter").update();
                    });
                    that.$element.trigger('complete.gui.splitter');
                }});
        } else {
            if (this.splitPosition > 0) {
                this.savedSplitPosition = this.splitPosition;
                position = 0;
            } else {
                position = this.savedSplitPosition;
            }
            animateProperties[this.options.sizing] = position;
            this.$firstPart.animate(animateProperties, {
                duration: this.options.animationDuration,
                progress: function () {
                    that.$element.find(that.isVertical ? ".gui-splitter-vertical" : ".gui-splitter:not(.gui-splitter-vertical)").trigger("resize");
                },
                complete: function () {
                    that.transitioning = false;
                    that.splitPosition = position;
                    that.$closeButton && that.$closeButton.fadeIn("fast");
                    that.$element.find(that.isVertical ? ".gui-splitter-vertical" : ".gui-splitter:not(.gui-splitter-vertical)").each(function () {
                        $(this).data("gui.splitter").update();
                    });
                    that.$element.trigger('complete.gui.splitter');
                }
            });
        }
        secondPartAnimateProperties[this.options.sizing] = this.totalSize - this.$splitBar[this.options.outerSize](true) - position;
        this.$secondPart.animate(secondPartAnimateProperties, this.options.animationDuration);
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