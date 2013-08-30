/* ========================================================================
 * GUI: helper.js v0.1.0
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
        $ = window.jQuery;

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

    var gui = (function () {
        var browserInfo = {
                isIE: $.browser.msie,
                version: (function () {
                    var version = Number($.browser.version);
                    if (!!document.documentMode) {
                        return Math.min(version, Number(document.documentMode));
                    }
                    return version;
                })()
            },
            plugin = {
                patch: function (plugin, $$elements, option) {
                    if (browserInfo.isIE && !!plugin && $.isFunction(plugin.iePatch)) {
                        plugin.iePatch($$elements, option);
                    }
                    return $$elements;
                },
                isPluginMethodCall: function (option) {
                    return typeof option === "string";
                },
                isPluginInitialize: function (option) {
                    return option === undefined || option === null || typeof option === "object";
                }
            };

        function showHide($element, show, speed, callback) {
            if (show) {
                $element.slideDown(speed, callback);
            } else {
                $element.hide(speed, callback);
            }
        }

        function htmlEncode(str) {
            var div = document.createElement("div");
            div.appendChild(document.createTextNode(str));
            return div.innerHTML;
        }

        function htmlDecode(str) {
            var div = document.createElement("div");
            div.innerHTML = str;
            return div.innerHTML;
        }

        // ratio should be 0..1
        function darken(color, ratio) {
            var red, green, blue, alpha, rgb, hex, dotIndex = -1;
            if (color.indexOf("rgb") != -1) {
                rgb = color.replace('rgb(', '').replace(')', '').split(',');
                red = parseInt($.trim(rgb[0]) * (1 - ratio), 10);
                green = parseInt($.trim(rgb[1]) * (1 - ratio), 10);
                blue = parseInt($.trim(rgb[2]) * (1 - ratio), 10);
                red = red > 255 ? 255 : red;
                green = green > 255 ? 255 : green;
                blue = blue > 255 ? 255 : blue;
                color = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
                if (rgb.length > 3) {
                    alpha = parseFloat($.trim(rgb[3]));
                    alpha = alpha > 1 ? 1 : alpha;
                    color = 'rgb(' + red + ', ' + green + ', ' + blue + ', ' + alpha + ')';
                }
            } else if(color.indexOf("#") != -1) {
                hex = $.trim(color).substr(1);
                if (hex.length == 3)
                    hex = hex.substr(0, 1) + hex.substr(0, 1) + hex.substr(1, 1) + hex.substr(1, 1) + hex.substr(2, 1) + hex.substr(2, 1);
                red = parseInt(hex.substr(0, 2), 16) * (1 - ratio);
                green = parseInt(hex.substr(2, 2), 16) * (1 - ratio);
                blue = parseInt(hex.substr(4, 2), 16) * (1 - ratio);
                red = (red > 255 ? 255 : red).toString(16);
                green = (green > 255 ? 255 : green).toString(16);
                blue = (blue > 255 ? 255 : blue).toString(16);
                dotIndex = red.indexOf(".");
                if (dotIndex != -1)
                    red = red.substring(0, dotIndex);
                dotIndex = green.indexOf(".");
                if (dotIndex != -1)
                    green = green.substring(0, dotIndex);
                dotIndex = blue.indexOf(".");
                if (dotIndex != -1)
                    blue = blue.substring(0, dotIndex);
                red = red.length < 2 ? "0" + red : red;
                green = green.length < 2 ? "0" + green : green;
                blue = blue.length < 2 ? "0" + blue : blue;
                color = "#" + red + green + blue;
            }
            return color;
        }

        return {
            browserInfo: browserInfo,
            plugin: plugin,
            showHide: showHide,
            htmlEncode: htmlEncode,
            htmlDecode: htmlDecode,
            darken: darken
        }
    })();

    if (!!window.gui) {
        $.extend(window.gui, gui);
    } else {
        window.gui = gui;
    }

})(window);
