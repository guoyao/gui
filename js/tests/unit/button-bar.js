/**
 * Author: guoyao
 * Time: 08-13-2013 10:38
 * Blog: http://www.guoyao.me
 */

$(function () {

    var $ = window.jQuery;

    module("button-bar");

    test("should provide no conflict", function () {
        var guiButtonBar = $.fn.guiButtonBar.noConflict();
        ok(!$.fn.guiButtonBar, 'guiButtonBar was set back to undefined (org value)');
        $.fn.guiButtonBar = guiButtonBar;
    });

    test("should be defined on jquery object", function () {
        ok($(document.body).guiButtonBar, 'guiButtonBar method is defined');
    });

    test("should return element", function () {
        ok($(document.body).guiButtonBar()[0] == document.body, 'document.body returned');
    });

});
