
$(function (undefined) {

    var $ = window.jQuery,
        $testWrapper = $("#qunit-fixture");
	
	var $testobj = $('<div id="date-picker-test" style="position:relative;">' + 
		'<input class="datepicker_demo" type="text" data-default-date="now"/>' +
		'</div>');

	module("dropdown", {
        setup: function () {
            $testobj.appendTo($testWrapper);
            $(".datepicker_demo").guiDatePicker();
        },
        teardown: function () {
            $testobj.remove();
        }
    });

	/*repeat test for every modules*/
    test("should provide no conflict", function () {
        var guiDatePicker = $.fn.guiDatePicker.noConflict();
        ok(!$.fn.guiDatePicker, 'guiDatePicker was set back to undefined (org value)');
        $.fn.guiDatePicker = guiDatePicker;
    });

    test("should be defined on jquery object", function () {
        ok($testobj.guiDatePicker, 'guiDatePicker method is defined');
    });

    test("should return element", function () {
        ok($testobj.guiDatePicker()[0] == document.getElementById('date-picker-test'), 'document.body returned');
    });
	
	test("should append calender",function(){

		$(".datepicker_demo").trigger("focus");

		var $datePicker = $(".datepicker_demo").next(".gui-date-picker");

		equal($datePicker.length , 1 , "append datepicker node");

	});

	test("check date picker title" , function(){

		$(".datepicker_demo").trigger("focus");

		var today = new Date();

		var monthOfToday = today.getMonth() + 1;

		var yearOfToday = today.getFullYear();

		var dateTitle = yearOfToday.toString() + ' ' + monthOfToday.toString() + '月';

		equal(dateTitle, $(".gui-date-picker").find(".gui-date-title").text() , "check date picker title")

	});

	
});
