$(function () {

    var $ = window.jQuery;

    module("affix");

    test("should provide no conflict", function () {
        var guiAffix = $.fn.guiAffix.noConflict();
        ok(!$.fn.guiAffix, 'guiAffix was set back to undefined (org value)');
        $.fn.guiAffix = guiAffix;
    });

    test("should be defined on jquery object", function () {
        ok($('<div></div>').guiAffix, 'guiAffix method is defined');
    });

    test("should return element", function () {
        var div = document.createElement("div");
        ok($(div).guiAffix()[0] === div, 'div returned');
    });

})
