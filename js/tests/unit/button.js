/**
 * Author: guoyao
 * Time: 09-10-2013 17:13
 * Blog: http://www.guoyao.me
 */

$(function () {

    var $ = window.jQuery;

    module("button");

    test("should provide no conflict", function () {
        var guiButton = $.fn.guiButton.noConflict();
        ok(!$.fn.guiButton, 'guiButton was set back to undefined (org value)');
        $.fn.guiButton = guiButton;
    });

    test("should be defined on jquery object", function () {
        ok($(document.body).guiButton, 'guiButton method is defined');
    });

    test("should return element", function () {
        ok($(document.body).guiButton()[0] == document.body, 'document.body returned');
    });

});
