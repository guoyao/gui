/* ========================================================================
 * Graceful-web-ui: helper.js v0.1.0alpha
 * http://www.grace.guoyao.me/
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

    var console = window.console;
    if (!!console) {
        if (!console.log) {
            console.log = function (value) {
                alert(value);
            };
        }
        if (!console.debug) {
            console.debug = function (value) {
                console.log(value);
            }
        }
    } else {
        console = {
            log: function (value) {
                alert(value);
            },
            debug: function (value) {
                alert(value);
            }
        };
        window.console = console;
    }

})(window);
