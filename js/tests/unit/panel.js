/**
 * Author: andy zhang
 * Time: 08-15-2013 10:00
 */

$(function () {

    var $ = window.jQuery;

    module("panel");

    test("should the titlename", function () {

        // equal( $(document.body).gracePanelsa()[0], "dds22222",$(this).attr("class"));
        ok(true, "test title ok");
    });

    test("should be defined on jquery object", function () {
        ok($(document.body).gracePanel, 'gracePanelsa method is defined');
    });

    test("should return element", function () {
        ok($(document.body).gracePanel()[0] == document.body, 'document.body returned');
    });


    test("should activate element by tab id", function () {
        var panelHTML =
            '<div class="grace-panelsa">'
                + '<div class="panelsa-btn"></div>'
                + '<div class="panelsa-content">'
                + 'JavaScript expressions can be evaluated as values inside .less files. We recommend'
                + '</div>'
                + '</div>';

        $(panelHTML).appendTo("#qunit-fixture");
        var $gracePanel = $("#qunit-fixture").find(".grace-panelsa");

        $gracePanel.gracePanel({title: "header content"});

        var $headerDiv = $gracePanel.find(".panelsa-btn");
        var $contentDiv = $gracePanel.find(".panelsa-content");

        ok($headerDiv.children().length == 1, "this div has add the title");

        equal($headerDiv.children().eq(0).text(), "header content", "this plugns title is " + $headerDiv.children().eq(0).text());

        equal($contentDiv.attr("class"), "panelsa-content", $contentDiv.attr("class"));


        equal($headerDiv.attr("class"), "panelsa-btn panelsa-a-closed", "show div" + $headerDiv.attr("class"));


        $gracePanel.gracePanel("hidden");

       equal($headerDiv.attr("class"), "panelsa-btn panelsa-a-opened", "hidden div" + $headerDiv.attr("class"));

       ok($contentDiv.is(":visible"), " div is hidden " + $contentDiv.is(":visible"));

       // $gracePanel.gracePanel("show");

       // equal($headerDiv.attr("class"), "panelsa-btn panelsa-a-closed", "show div" + $headerDiv.attr("class"));

      // ok($contentDiv.is(":visible"), " div is show " + $contentDiv.is(":visible"));


    });

});
