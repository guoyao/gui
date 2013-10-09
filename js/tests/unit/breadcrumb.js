/**
 * Author: guoyao
 * Time: 09-26-2013 16:27
 * Blog: http://www.guoyao.me
 */

$(function () {

    var $ = window.jQuery,
        $testWrapper = $("#qunit-fixture");

    module("breadcrumb");

    test("should provide no conflict", function () {
        var guiBreadcrumb = $.fn.guiBreadcrumb.noConflict();
        ok(!$.fn.guiBreadcrumb, 'guiBreadcrumb was set back to undefined (org value)');
        $.fn.guiBreadcrumb = guiBreadcrumb;
    });

    test("should be defined on jquery object", function () {
        ok($(document.body).guiBreadcrumb, 'guiBreadcrumb method is defined');
    });

    test("should return element", function () {
        ok($(document.body).guiBreadcrumb()[0] == document.body, 'document.body returned');
    });

    test("should have custom seperator", function () {
        var seperator = ">",
            $breadcrumb = $('<ol class="gui-breadcrumb" data-seperator="' + seperator + '">'
                                     + '<li><a href="#">Home</a></li>'
                                     + '<li><a href="#">Item 1</a></li>'
                                     + '<li><a href="#">Item 2</a></li>'
                                     + '<li><a href="#">Item 3</a></li>'
                                     + '<li><a href="#">Item 4</a></li>'
                                     + '<li class="active">Item 5</li>'
                                 + '</ol>');
        $breadcrumb.guiBreadcrumb();
        equal($breadcrumb.find("> li:nth-child(2) .gui-breadcrumb-sperator").text(), seperator);
    });

    test("should remove siblings after current child which click event triggered", function () {
        var $breadcrumb = $('<ol class="gui-breadcrumb">'
                                     + '<li><a href="#">Home</a></li>'
                                     + '<li><a href="#">Item 1</a></li>'
                                     + '<li><a href="#">Item 2</a></li>'
                                     + '<li><a href="#">Item 3</a></li>'
                                     + '<li><a href="#">Item 4</a></li>'
                                     + '<li class="active">Item 5</li>'
                                   + '</ol>');
        $breadcrumb.appendTo($testWrapper);
        $breadcrumb.guiBreadcrumb();
        $breadcrumb.find("> li:first-child > a").trigger("click");
        equal($breadcrumb.children().length, 1);
        $breadcrumb.remove();
    });

    test("should remove all items with requireSelection option set to false when click event of breadcrumb's first child triggered", function () {
        var $breadcrumb = $('<ol class="gui-breadcrumb" data-require-selection="false">'
                                     + '<li><a href="#">Home</a></li>'
                                     + '<li><a href="#">Item 1</a></li>'
                                     + '<li><a href="#">Item 2</a></li>'
                                     + '<li><a href="#">Item 3</a></li>'
                                     + '<li><a href="#">Item 4</a></li>'
                                     + '<li class="active">Item 5</li>'
                                   + '</ol>');
        $breadcrumb.appendTo($testWrapper);
        $breadcrumb.guiBreadcrumb();
        $breadcrumb.find("> li:first-child > a").trigger("click");
        equal($breadcrumb.children().length, 0);
        $breadcrumb.remove();
    });

    test("should do nothing when href property is url", function () {
        var $breadcrumb = $('<ol class="gui-breadcrumb">'
                                     + '<li><a href="#">Home</a></li>'
                                     + '<li><a href="#">Item 1</a></li>'
                                     + '<li><a href="#">Item 2</a></li>'
                                     + '<li><a href="http://guoyao.me/">Item 3</a></li>'
                                     + '<li><a href="#">Item 4</a></li>'
                                     + '<li class="active">Item 5</li>'
                                   + '</ol>'),
            expected = $breadcrumb.children().length;
        $breadcrumb.appendTo($testWrapper);
        $breadcrumb.guiBreadcrumb();
        $breadcrumb.find("> li:nth-child(4) > a").trigger("click");
        equal($breadcrumb.children().length, expected);
        $breadcrumb.remove();
    });

    test("should do nothing when active child clicked", function () {
        var $breadcrumb = $('<ol class="gui-breadcrumb">'
                                     + '<li><a href="#">Home</a></li>'
                                     + '<li><a href="#">Item 1</a></li>'
                                     + '<li class="active">Item 2</li>'
                                     + '<li><a href="#">Item 3</a></li>'
                                     + '<li><a href="#">Item 4</a></li>'
                                     + '<li><a href="#">Item 5</a></li>'
                                   + '</ol>'),
            expected = $breadcrumb.children().length;
        $breadcrumb.appendTo($testWrapper);
        $breadcrumb.guiBreadcrumb();
        $breadcrumb.find("> li.active:nth-child(3)").trigger("click");
        equal($breadcrumb.children().length, expected);
        $breadcrumb.remove();
    });

    test("last child should have no <a> element", function () {
        var $breadcrumb = $('<ol class="gui-breadcrumb">'
                                     + '<li><a href="#">Home</a></li>'
                                     + '<li><a href="#">Item 1</a></li>'
                                     + '<li><a href="#">Item 2</a></li>'
                                     + '<li><a href="#">Item 3</a></li>'
                                     + '<li><a href="#">Item 4</a></li>'
                                     + '<li class="active">Item 5</li>'
                                   + '</ol>');
        $breadcrumb.appendTo($testWrapper);
        $breadcrumb.guiBreadcrumb();
        $breadcrumb.find("> li:nth-child(3) > a").trigger("click");
        equal($breadcrumb.find("> li:last-child").find("a").length, 0);
        $breadcrumb.remove();
    });

});