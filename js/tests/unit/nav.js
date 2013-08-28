/**
 * Author: guoyao
 * Time: 08-13-2013 10:38
 * Blog: http://www.guoyao.me
 */

$(function () {

    var $ = window.jQuery;

    module("navs");

    test("should provide no conflict", function () {
        var guiNav = $.fn.guiNav.noConflict();
        ok(!$.fn.guiNav, 'guiNav was set back to undefined (org value)');
        $.fn.guiNav = guiNav;
    });

    test("should be defined on jquery object", function () {
        ok($(document.body).guiNav, 'guiNav method is defined');
    });

    test("should return element", function () {
        ok($(document.body).guiNav()[0] == document.body, 'document.body returned');
    });

});
