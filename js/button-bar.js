/* ========================================================================
 * GUI: button-bar.js v0.2.0
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
        console = window.console,
        gui = window.gui,
        old = $.fn.guiButtonBar;

    $.fn.guiButtonBar = function (option) {
        var defaults = {
            selectedIndex: -1
            },
            options = $.extend({}, defaults, option);

        this.each(function () {
            var $this = $(this),
                data = $this.data(),
                $$children;
            if (data.toggle && data.toggle.indexOf("buttons") != -1) {
                if (options.selectedIndex > -1) {
                    $$children = $this.children(".gui-btn");
                    if (options.selectedIndex < $$children.length) {
                        $($$children[0]).guiButton("toggle");
                    }
                }
            }
        });

        return gui.plugin.patch($.fn.guiButtonBar, this, option);
    };

    // NO CONFLICT
    // ===============

    $.fn.guiButtonBar.noConflict = function () {
        $.fn.guiButtonBar = old;
        return this;
    };
})(window);