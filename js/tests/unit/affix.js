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
 * We imported some codes of bootstrap, and added added our own's
 */

$(function () {

    var $ = window.jQuery;

    module("affix");

    test("should provide no conflict", function () {
        var guiAffix = $.fn.guiAffix.noConflict();
        ok(!$.fn.guiAffix, 'guiAffix was set back to undefined (org value)');
        $.fn.guiAffix = guiAffix;
    });

    /*test("should be defined on jquery object", function () {
        ok($(document.body).guiAffix, 'guiAffix method is defined');
    });

    test("should return element", function () {
        ok($(document.body).guiAffix()[0] == document.body, 'document.body returned');
    });*/

})
