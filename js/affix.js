/* ========================================================================
 * GUI: affix.js v0.2.0
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
        old = $.fn.guiAffix;

    $.fn.guiAffix = function (option) {
        this.each(function () {
            var $this = $(this),
                data = $this.data();

            $this.css("position", "fixed");
            data.offset = data.offset || {};
            if (typeof data.offset != "object") {
                data.offset = {top: data.offset, left: data.offset};
            }
            if (data.offsetTop === 0 || data.offsetTop) data.offset.top = data.offsetTop;
            if (data.offsetBottom === 0 || data.offsetBottom) data.offset.bottom = data.offsetBottom;
            if (data.offsetLeft === 0 || data.offsetLeft) data.offset.left = data.offsetLeft;
            if (data.offsetRight === 0 || data.offsetRight) data.offset.right = data.offsetRight;

            if (option) {
                if (typeof option.offset === "object") {
                    $.extend(data, option);
                } else if (option.offset === 0 || (typeof option.offset === "string" && option.offset)) {
                    data.offset = {top: option.offset, left: option.offset};
                }
            }

            $this.css(data.offset);
        });

        return gui.plugin.patch($.fn.guiAffix, this, option);
    };

    // AFFIX NO CONFLICT
    // =================

    $.fn.guiAffix.noConflict = function () {
        $.fn.guiAffix = old;
        return this;
    };

    // AFFIX DATA-API
    // ==============

    $(function () {
        $(".js-affix").guiAffix();
    });

})(window);
