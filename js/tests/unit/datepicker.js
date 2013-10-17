$(function (undefined) {

    var $ = window.jQuery;

    module("datepicker");

    test("should provide no conflict", function () {
        var guiDatePicker = $.fn.guiDatePicker.noConflict();
        ok(!$.fn.guiDatePicker, 'guiDatePicker was set back to undefined (org value)');
        $.fn.guiDatePicker = guiDatePicker;
    });

    test("should be defined on jquery object", function () {
        var div = $("<div></div>")
        ok(div.guiDatePicker, 'guiDatePicker method is defined');
    });

    test("should return element", function () {
        var div = $("<div></div>")
        ok(div.guiDatePicker() == div, 'document.body returned');
    });

    test("should append calender", function () {

        var $inputElem = $('<input id="datepicker_demo" type="text"/>');

        $inputElem.appendTo("#qunit-fixture").guiDatePicker();

        var $datePicker = $("#datepicker_demo").next(".gui-date-picker");

        equal($datePicker.length, 1, "append datepicker node");

    });

    test("check date picker title", function () {
        //check date picker title

        var $inputElem = $('<input id="datepicker_demo" type="text"/>');

        $inputElem.appendTo("#qunit-fixture").guiDatePicker();

        $inputElem.focus();

        var today = new Date();

        var monthOfToday = today.getMonth() + 1;

        var yearOfToday = today.getFullYear();

        var dateTitle = yearOfToday + ' ' + monthOfToday + '月';

        equal(dateTitle, $(".gui-date-picker").find(".gui-date-title").text(), "check date picker title");
    });

    test("check total dates of this month", function () {
        //check total dates of this month

        var $inputElem = $('<input id="datepicker_demo" type="text"/>');

        $inputElem.appendTo("#qunit-fixture").guiDatePicker();

        $inputElem.focus();

        var today = new Date();

        today.setMonth(today.getMonth() + 1);

        today.setDate(0);

        var totalDates = today.getDate();

        equal(totalDates, $(".gui-date-picker").find(".gui-date-dates a").length, "check total dates of this month");
    });

    test("change month", function () {
        //same date
        var $inputElem = $('<input id="datepicker_demo" type="text"/>');

        $inputElem.appendTo("#qunit-fixture").guiDatePicker();

        $inputElem
            .focus()
            .next(".gui-date-picker")
            .find(".gui-date-pm-btn")
            .click();

        var today = new Date();

        var curMonth = today.getMonth() + 1;
        var curYear = today.getFullYear();

        if (curMonth - 1 > 1) {
            curMonth = curMonth - 1;
        } else {
            curMonth = 12;
        }

        var title = curYear + ' ' + curMonth + '月';

        equal(title, $inputElem.next(".gui-date-picker").find(".gui-date-title").text(), "same date");

        $inputElem
            .focus()
            .next(".gui-date-picker")
            .find(".gui-date-nm-btn")
            .click();

        today = new Date();

        if (curMonth + 1 < 12) {
            curMonth = curMonth + 1;
        } else {
            curMonth = 1;
        }

        title = curYear + ' ' + curMonth + '月';

        equal(title, $inputElem.next(".gui-date-picker").find(".gui-date-title").text(), "same date");

    });

    test("change year", function () {
        //same date
        var $inputElem = $('<input id="datepicker_demo" type="text"/>');

        $inputElem.appendTo("#qunit-fixture").guiDatePicker();

        $inputElem
            .focus()
            .next(".gui-date-picker")
            .find(".gui-date-py-btn")
            .click();

        var today = new Date();

        var curMonth = today.getMonth() + 1;
        var curYear = today.getFullYear();

        curYear -= 1;

        var title = curYear + ' ' + curMonth + '月';

        equal(title, $inputElem.next(".gui-date-picker").find(".gui-date-title").text(), "same date");

        $inputElem
            .focus()
            .next(".gui-date-picker")
            .find(".gui-date-ny-btn")
            .click();

        curYear += 1;

        title = curYear + ' ' + curMonth + '月';

        equal(title, $inputElem.next(".gui-date-picker").find(".gui-date-title").text(), "same date");

    });

    test("set input value to selected date", function () {

        var $inputElem = $('<input id="datepicker_demo" type="text"/>');

        $inputElem.appendTo("#qunit-fixture").guiDatePicker();

        $inputElem
            .focus()
            .next(".gui-date-picker")
            .find(".gui-date-dates a")
            .last()
            .click();

        today = new Date();

        var curMonth = today.getMonth() + 1;
        var curYear = today.getFullYear();

        today.setMonth(today.getMonth() + 1);
        today.setDate(0);

        var totalDates = today.getDate();

        var dateSpliter = $.fn.guiDatePicker.defaults.dateSpliter;

        var inputDate = curYear + dateSpliter + curMonth + dateSpliter + totalDates;

        equal(inputDate, $inputElem.val(), "should get the same value");
    });
});
