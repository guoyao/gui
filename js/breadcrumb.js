/* ========================================================================
 * GUI: breadcrumb.js v0.2.0
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

    var document = window.document,
        console = window.console,
        $ = window.jQuery,
        gui = window.gui,
        old = $.fn.guiBreadcrumb;

    // COLLAPSE PUBLIC CLASS DEFINITION
    // ================================

    var GuiBreadcrumb = function (element, options) {
        this.$element = $(element);
        this.options = options;
    };

    GuiBreadcrumb.prototype.init = function () {
        if (this.options.seperator) {
            var seperator = this.options.seperator;
            this.$element.find("> li:not(:first-child)").each(function () {
                var $this = $(this);
                $this.addClass("gui-with-seperator");
                if ($this.find(".gui-breadcrumb-sperator").length === 0) {
                    $('<span class="gui-breadcrumb-sperator">' + seperator + '</span>').prependTo($this);
                }
            });
        }
        this.update();
    };

    GuiBreadcrumb.prototype.update = function () {
        var $lastChild = this.$element.children("li:last-child");
        if ($lastChild) {
            $lastChild.addClass("active");
            var $link = $lastChild.children("a");
            if ($link) {
                $link.replaceWith($link.text());
            }
        }
    };

    /**
     * remove child after param childOrIndex
     * @param childOrIndex
     */
    GuiBreadcrumb.prototype.removeAfter = function (childOrIndex) {
        var $$children = this.$element.children("li");
        if (typeof childOrIndex !== "number")  {
            childOrIndex = $$children.index(childOrIndex);
        }
        gui.removeChildAfter($$children, childOrIndex);
        if (childOrIndex === 0 && !this.options.requireSelection) {
            this.$element.empty();
        }
        this.update();
    };

    // COLLAPSE PLUGIN DEFINITION
    // ==========================

    $.fn.guiBreadcrumb = function (option) {
        this.each(function () {
            var $this = $(this),
                data = $this.data('gui.breadcrumb');

            if (!data) {
                $this.data('gui.breadcrumb', (data = new GuiBreadcrumb(this, $.extend({}, $.fn.guiBreadcrumb.defaults, $this.data(), typeof option == 'object' && option))));
            }
            data.init();
        });
        return gui.plugin.patch($.fn.guiBreadcrumb, this, option);
    };

    $.fn.guiBreadcrumb.defaults = {
        requireSelection: true
    };

    $.fn.guiBreadcrumb.Constructor = GuiBreadcrumb;


    // COLLAPSE NO CONFLICT
    // ====================

    $.fn.guiBreadcrumb.noConflict = function () {
        $.fn.guiBreadcrumb = old;
        return this;
    };

    // BREADCRUMB DATA-API
    // =================

    $(document).on('click.gui.breadcrumb.data-api', '.gui-breadcrumb > li a', function () {
        var $this = $(this),
            href = $this.attr('href');

        if (href) {
            href = gui.stripHref(href); //strip for ie6, 7
        }
        if (!href || href == "#" || href.indexOf("javascript") === 0) {
            var $li = $this.closest("li"),
                $breadcrumb = $li.closest(".gui-breadcrumb");

            $breadcrumb.data("gui.breadcrumb").removeAfter($li);
            return false;
        }
    });

})(window);