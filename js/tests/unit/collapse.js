
$(function (undefined) {

	var $ = window.jQuery,
        $testWrapper = $("#qunit-fixture");

	module("collapse");

	/*repeat test for every modules*/
	test("should provide no conflict", function () {
		var guiCollapse = $.fn.guiCollapse.noConflict();
		ok(!$.fn.guiCollapse, 'guiCollapse was set back to undefined (org value)');
		$.fn.guiCollapse = guiCollapse;
	});

	test("should be defined on jquery object", function () {
		ok($(document.body).guiCollapse, 'guiCollapse method is defined');
	});

	test("should return element", function () {
		ok($(document.body).guiCollapse()[0] === document.body, 'document.body returned');
	});

    test("should show a collapsible element", function () {
        var $el = $('<div class="gui-collapsible gui-collapsed">something</div>').appendTo($testWrapper);
        equal($el.css('display'), 'none',  'display equals none');
        stop();
        $el.on('shown.gui.collapse', function () {
            ok(!$el.hasClass('gui-collapsed'), 'has no class gui-collapsed');
            ok($el.css('display') !== 'none',  'display not equals none');
            $el.remove();
            start();
        }).guiCollapse('show');
    });

    test("should hide a collapsible element", function () {
        var $el = $('<div class="gui-collapsible">something</div>').appendTo($testWrapper);
        ok($el.css('display') !== 'none',  'display not equals none');
        stop();
        $el.on('hidden.gui.collapse', function () {
            ok($el.hasClass('gui-collapsed'), 'has class gui-collapsed');
            equal($el.css('display'), 'none', 'display equals none');
            $el.remove();
            start();
        }).guiCollapse('hide');
    });

    test("should not fire shown when show is prevented", function () {
        stop();
        $('<div class="gui-collapsible gui-collapsed"/>')
            .on('show.gui.collapse', function (e) {
                e.preventDefault();
                ok(true);
                start();
            })
            .on('shown.gui.collapse', function () {
                ok(false);
            })
            .guiCollapse('show');
    });

    test("should not fire hidden when hide is prevented", function () {
        stop();
        $('<div class="gui-collapsible"/>')
            .on('hide.gui.collapse', function (e) {
                e.preventDefault();
                ok(true);
                start();
            })
            .on('hidden.gui.collapse', function () {
                ok(false);
            })
            .guiCollapse('hide');
    });

    test("should remove gui-collapsed class to target when collapse shown", function () {
        stop();

        var $btn = $('<a data-toggle="collapse" href="#test1"></a>')
            .appendTo($testWrapper);

        var $collapsible = $('<div id="test1" class="gui-collapsible gui-collapsed"></div>')
            .appendTo($testWrapper)
            .on('shown.gui.collapse', function () {
                ok(!$collapsible.hasClass('gui-collapsed'));
                $btn.remove();
                $collapsible.remove();
                start();
            });

        $btn.click();
    });

    test("should add gui-collapsed class to target when collapse hidden", function () {
        stop();

        var $btn = $('<a data-toggle="collapse" href="#test1"></a>')
            .appendTo($testWrapper);

        var $collapsible = $('<div id="test1" class="gui-collapsible"></div>')
            .appendTo($testWrapper)
            .on('hidden.gui.collapse', function () {
                ok($collapsible.hasClass('gui-collapsed'));
                $btn.remove();
                $collapsible.remove();
                start();
            });

        $btn.click();
    });

    test("should add gui-collapsed class to inactive accordion targets", function () {
        stop();

        var $accordion = $('<div id="accordion"><div class="accordion-group"></div><div class="accordion-group"></div><div class="accordion-group"></div></div>')
            .appendTo($testWrapper);

        var $btn1 = $('<a data-toggle="collapse" href="#body1"></a>')
            .appendTo($accordion.find('.accordion-group').eq(0));

        var $collapsible1 = $('<div id="body1" class="gui-collapsible"></div>')
            .appendTo($accordion.find('.accordion-group').eq(0));

        var $btn2 = $('<a data-toggle="collapse" href="#body2"></a>')
            .appendTo($accordion.find('.accordion-group').eq(1));

        var $collapsible2 = $('<div id="body2" class="gui-collapsible"></div>')
            .appendTo($accordion.find('.accordion-group').eq(1));

        var $btn3 = $('<a data-toggle="collapse" href="#body3"></a>')
            .appendTo($accordion.find('.accordion-group').eq(2));

        var $collapsible3 = $('<div id="body3" class="gui-collapsible gui-collapsed" data-parent="#accordion"></div>')
            .appendTo($accordion.find('.accordion-group').eq(2))
            .on('shown.gui.collapse', function () {
                ok($collapsible1.hasClass('gui-collapsed'));
                ok($collapsible2.hasClass('gui-collapsed'));
                ok(!$collapsible3.hasClass('gui-collapsed'));
                $accordion.remove();
                start();
            });

        $btn3.click();
    })
});