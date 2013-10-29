/* ========================================================================
 * GUI: helper.js v0.2.0
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

    if (!$.browser) {
        $.browser = (function () {
            var uaMatch = function (ua) {
                ua = ua.toLowerCase();

                var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
                    /(webkit)[ \/]([\w.]+)/.exec(ua) ||
                    /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
                    /(msie) ([\w.]+)/.exec(ua) ||
                    ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
                    [];

                return {
                    browser: match[1] || "",
                    version: match[2] || "0"
                };
            };
            var matched = uaMatch(navigator.userAgent),
                browser = {};

            if (matched.browser) {
                browser[matched.browser] = true;
                browser.version = matched.version;
            }

            // Chrome is Webkit, but Webkit is also Safari.
            if (browser.chrome) {
                browser.webkit = true;
            } else if (browser.webkit) {
                browser.safari = true;
            }

           return browser;
        })();
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

        function removeChildAfter($$children, childOrIndex) {
            if (typeof childOrIndex !== "number")  {
                childOrIndex = $$children.index(childOrIndex);
            }
            $$children.each(function (index, child) {
                if (index > childOrIndex) {
                    $(child).remove();
                }
            });
        }

        /**
         * href strip for ie6, 7
         * @param href
         */
        function stripHref(href) {
            return href && href.replace(/.*(?=#[^\s]*$)/, "");
        }

        function isPercentage(str) {
            return typeof str === "string" && str.indexOf("%") !== -1;
        }

        return {
            browserInfo: browserInfo,
            plugin: plugin,
            darken: darken,
            removeChildAfter: removeChildAfter,
            stripHref: stripHref,
            isPercentage: isPercentage
        }
    })();

    // Expose gui to the global object
    if (!!window.gui) {
        $.extend(window.gui, gui);
    } else {
        window.gui = gui;
    }

    // Expose gui as an AMD module
    if (typeof define === "function" && define.amd) {
        define( "gui", [], function () { return gui; } );
    }

})(window);
