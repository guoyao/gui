$(function (undefined) {

    var $ = window.jQuery,
        $testWrapper = $("#qunit-fixture");

    var $testobj = $('<div class="dropdown">' +
        '<a class="dropdown-toggle">' +
        'Action' +
        '</a>' +
        '<ul class="dropdown-list">' +
        '<li class="default"><a>111</a></li>' +
        '<li><a>222</a></li>' +
        '<li><a>333</a></li>' +
        '</ul>' +
        '</div>');

    module("dropdown", {
        setup: function () {
            $testobj.appendTo($testWrapper);
            $(".dropdown").guiDropdown();
        },
        teardown: function () {

        }
    });

    /*repeat test for every modules*/
    test("should provide no conflict", function () {
        var guiDropdown = $.fn.guiDropdown.noConflict();
        ok(!$.fn.guiDropdown, 'guiCollapse was set back to undefined (org value)');
        $.fn.guiDropdown = guiDropdown;
    });

    test("should be defined on jquery object", function () {
        ok($(document.body).guiDropdown, 'guiDropdown method is defined');
    });

    test("should return element", function () {
        ok($(document.body).guiDropdown()[0] === document.body, 'document.body returned');
    });

    test("set default list text", function () {

        var defaultTxt = $(".dropdown").find(".dropdown-list .default a").text();

        var toggleTxt = $(".dropdown").find(".dropdown-toggle").text();

        equal(defaultTxt, toggleTxt, "should be the same text");
    });

    test("trigger click on toggle", function () {

        $(".dropdown").find(".dropdown-toggle").trigger("click.gui.dropdown.data-api");

        var list = $(".dropdown").find(".dropdown-list");

        ok(list.is(":visible"), "dropdown list should appear");

    });

    test("trigger click on list", function () {

        $(".dropdown").find(".dropdown-list a").eq(2).trigger("click.gui.dropdown.data-api");

        var curTxt = $(".dropdown").find(".dropdown-list a").eq(2).text();

        var toggleTxt = $(".dropdown").find(".dropdown-toggle").text();

        var list = $(".dropdown").find(".dropdown-list");

        equal(curTxt, toggleTxt, "should be the same text")
        ok(list.is(":not(:visible)"), "dropdown list should disappear");
    });
});