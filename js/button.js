/*!
 * Bootstrap v3.0.0
 *
 * Copyright 2013 Twitter, Inc
 * Licensed under the Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Designed and built with all the love in the world by @mdo and @fat.
 */

/*!
 * We imported some codes of bootstrap, and added our own's
 */

/* ========================================================================
 * GUI: button.js v0.1.0
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

    var $ = window.jQuery,
        gui = window.gui;

    // BUTTON PUBLIC CLASS DEFINITION
    // ==============================

    var GuiButton = function (element, options) {
        this.$element = $(element);
        this.options = $.extend({}, GuiButton.DEFAULTS, options);
    };

    GuiButton.DEFAULTS = {
        loadingText: 'loading...'
    };

    GuiButton.prototype.setState = function (state) {
        var d = 'disabled',
            $el = this.$element,
            val = $el.is('input') ? 'val' : 'html',
            data = $el.data();

        state = state + 'Text';

        if (!data.resetText) {
            $el.data('resetText', $el[val]());
        }

        $el[val](data[state] || this.options[state]);

        // push to event loop to allow forms to submit
        setTimeout(function () {
            state == 'loadingText' ?
                $el.addClass(d).attr(d, d) :
                $el.removeClass(d).removeAttr(d);
        }, 0);
    };

    GuiButton.prototype.toggle = function () {
        var $parent = this.$element.closest('[data-toggle="buttons"]');

        if ($parent.length) {
            var $input = this.$element.find('input');
            if ($input.prop('type') === 'checkbox') {
                $input.prop('checked', !this.$element.hasClass('active'))
                    .trigger('change');
            } else if ($input.prop('type') === 'radio') {
                $parent.find('.active').removeClass('active');
                if(!$input.prop('checked')) {
                    $input.prop('checked', true).trigger('change');
                }
            }
        }

        this.$element.toggleClass('active');
    };

    // BUTTON PLUGIN DEFINITION
    // ========================

    var old = $.fn.guiButton;

    $.fn.guiButton = function (option) {
        this.each(function () {
            var $this = $(this),
                data = $this.data('gui.button'),
                options = typeof option == 'object' && option;

            if (!data) {
                $this.data('gui.button', (data = new GuiButton(this, options)));
            }

            if (option == 'toggle') {
                data.toggle();
            }
            else if (option) {
                data.setState(option);
            }
        });

        return gui.plugin.patch($.fn.guiButton, this, option);
    }

    $.fn.guiButton.Constructor = GuiButton;

    // NO CONFLICT
    // ===============

    $.fn.guiButton.noConflict = function () {
        $.fn.guiButton = old;
        return this;
    };

    // BUTTON DATA-API
    // ===============

    $(window.document).on('click.gui.button.data-api', '[data-toggle^=button]', function (e) {
        var $btn = $(e.target);
        if (!$btn.hasClass('gui-btn')) {
            $btn = $btn.closest('.gui-btn');
        }
        $btn.guiButton('toggle');
        e.preventDefault();
    });

})(window);