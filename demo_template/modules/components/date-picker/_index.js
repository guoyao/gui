require(["jquery", "prettify", "gui"], function ($, prettify) {
    $(".datepicker_demo").guiDatePicker();
	$(".datepicker_demo_2").guiDatePicker({initNewDate:new Date(1980,1,1)});
    prettify.prettyPrint();
});
