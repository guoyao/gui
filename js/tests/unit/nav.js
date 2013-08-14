/**
 * Author: guoyao
 * Time: 08-13-2013 10:38
 * Blog: http://www.guoyao.me
 */

$(function () {

    var $ = window.jQuery;

    module("navs");

    test("should provide no conflict", function () {
        var graceNav = $.fn.graceNav.noConflict();
        ok(!$.fn.graceNav, 'graceNav was set back to undefined (org value)');
        $.fn.graceNav = graceNav;
    });

    test("should be defined on jquery object", function () {
        ok($(document.body).graceNav, 'graceNav method is defined');
    });

    test("should return element", function () {
        ok($(document.body).graceNav()[0] == document.body, 'document.body returned');
    });

});
