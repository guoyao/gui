/**
 * Author: guoyao
 * Time: 10-10-2013 16:55
 * Blog: http://www.guoyao.me
 */

$(function () {

    var $ = window.jQuery,
        $testWrapper = $("#qunit-fixture");


    module("splitter", {
        setup: function () {
            this.$guiSplitter = $('<div class="gui-splitter" style="height: 300px;">'
                                        + '<div class="gui-splitter-part-first">Left</div>'
                                        + '<div class="gui-splitter-part-second">Right</div>'
                                      + '</div>');
        },
        teardown: function () {
            this.$guiSplitter.remove();
            this.$guiSplitter = undefined;
        }
    });

    test("should provide no conflict", function () {
        var guiSplitter = $.fn.guiSplitter.noConflict();
        ok(!$.fn.guiSplitter, 'guiSplitter was set back to undefined (org value)');
        $.fn.guiSplitter = guiSplitter;
    });

    test("should be defined on jquery object", function () {
        ok($(document.body).guiSplitter, 'guiSplitter method is defined');
    });

    test("should return element", function () {
        ok($(document.body).guiSplitter()[0] == document.body, 'document.body returned');
    });

    test("should be right position when split done", function () {
        this.$guiSplitter.appendTo($testWrapper);
        this.$guiSplitter.guiSplitter();
        var guiSplitter = this.$guiSplitter.data("gui.splitter");
        equal(guiSplitter.splitPosition, parseInt(guiSplitter.totalSize * 0.3, 10));
        stop();
        guiSplitter.$element.on("complete.gui.splitter", function () {
            equal(guiSplitter.splitPosition, 0);
            guiSplitter.$element.off("complete.gui.splitter");
            guiSplitter.$element.on("complete.gui.splitter", function () {
                equal(guiSplitter.splitPosition, guiSplitter.savedSplitPosition);
                guiSplitter.$element.off("complete.gui.splitter");
                guiSplitter.$element.on("complete.gui.splitter", function () {
                    equal(guiSplitter.splitPosition, 10);
                    start();
                });
                guiSplitter.splitTo(10);
            });
            guiSplitter.show();
        });
        guiSplitter.hide();
    });

    test("should not less than minSize", function () {
        this.$guiSplitter.width(300);
        this.$guiSplitter.appendTo($testWrapper);
        this.$guiSplitter.guiSplitter({
            minSize: 100
        });
        var guiSplitter = this.$guiSplitter.data("gui.splitter");
        ok(guiSplitter.splitPosition !== parseInt(guiSplitter.totalSize * 0.3, 10));
        equal(guiSplitter.splitPosition, guiSplitter.minSize);
        stop();
        guiSplitter.$element.on("complete.gui.splitter", function () {
            ok(guiSplitter.splitPosition !== 10);
            equal(guiSplitter.splitPosition, guiSplitter.minSize);
            start();
        });
        guiSplitter.splitTo(10);
    });

    test("should not greater than maxSize", function () {
        this.$guiSplitter.width(800);
        this.$guiSplitter.appendTo($testWrapper);
        this.$guiSplitter.guiSplitter({
            maxSize: 200
        });
        var guiSplitter = this.$guiSplitter.data("gui.splitter");
        ok(guiSplitter.splitPosition !== parseInt(guiSplitter.totalSize * 0.3, 10));
        equal(guiSplitter.splitPosition, guiSplitter.maxSize);
        stop();
        guiSplitter.$element.on("complete.gui.splitter", function () {
            ok(guiSplitter.splitPosition !== 500);
            equal(guiSplitter.splitPosition, guiSplitter.maxSize);
            start();
        });
        guiSplitter.splitTo(500);
    });

    test("should not fire complete when start event is prevented", function () {
        this.$guiSplitter.appendTo($testWrapper);
        var duration = 200;
        this.$guiSplitter.guiSplitter({
            animationDuration: duration
        });
        stop();
        this.$guiSplitter.on("start.gui.splitter", function (e) {
            e.preventDefault();
            ok(true);
        }).on("complete.gui.splitter", function () {
                ok(false);
            }).guiSplitter('hide');

        setTimeout(function () {
            start();
        }, duration + 100);
    });

    test("should be right position when split position option is specified", function () {
        this.$guiSplitter.appendTo($testWrapper);
        var position = 99;
        this.$guiSplitter.guiSplitter({
            splitPosition: position
        });
        var guiSplitter = this.$guiSplitter.data("gui.splitter");
        equal(guiSplitter.splitPosition, position);
    });

    test("should not less than minSize when split position option is specified", function () {
        this.$guiSplitter.appendTo($testWrapper);
        var position = 99;
        this.$guiSplitter.guiSplitter({
            minSize: position + 10,
            splitPosition: position
        });
        var guiSplitter = this.$guiSplitter.data("gui.splitter");
        equal(guiSplitter.splitPosition, position + 10);
    });

    test("should not greater than maxSize when split position option is specified", function () {
        this.$guiSplitter.appendTo($testWrapper);
        var position = 99;
        this.$guiSplitter.guiSplitter({
            maxSize: position - 10,
            splitPosition: position
        });
        var guiSplitter = this.$guiSplitter.data("gui.splitter");
        equal(guiSplitter.splitPosition, position - 10);
    });
});