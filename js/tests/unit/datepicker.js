
$(function (undefined) {

    var $ = window.jQuery;
	var moduleDebug;
	
	/*the default time for test
		change the value as you want as the date formate*/
	/*month counting start from 0, so remember to add 1 for test output variable*/	
		
	var year = 1980,month = 2,date = 3;
	var testDate = [year,month,date];
	var testDateObj = new Date(testDate);
	
	/*extend settings for the plugin*/
	option = {
		initNewDate : new Date(testDate)
	}
	
	/*global set for test*/
    module("DatePicker",{
		setup:function(){
			//set test environment
			moduleDebug = $.fn.graceDatePicker.debug;
			moduleDebug._initOptions(option);
			//moduleDebug._initNewDate();
			//make calender append to the test area
			moduleDebug.defaults.topNode = "#qunit-fixture";
			//append test input
			$("#qunit-fixture").append('<input class="test-input" type="test"/>');
			//set local obj
			moduleDebug.obj = $(".test-input");
		},teardown:function(){
			//destroy calender element
			$('.' + moduleDebug.defaults.mainWrapper).remove();
			//destroy graceDatePicker module
			moduleDebug = undefined;
		}
	});

	/*repeat test for every modules*/
    test("should provide no conflict", function () {
        var graceDatePicker = $.fn.graceDatePicker.noConflict();
        ok(!$.fn.graceDatePicker, 'graceTab was set back to undefined (org value)');
        $.fn.graceDatePicker = graceDatePicker;
    });

    test("should be defined on jquery object", function () {
        ok($(document.body).graceDatePicker, 'graceDatePicker method is defined');
    });

    test("should return element", function () {
        ok($(document.body).graceDatePicker()[0] == document.body, 'document.body returned');
    });
	
	
	/*specific test for local functions*/
	/* _appendElem() */
	test("init calender wrapper",function(){
		
		moduleDebug._appendElem();
		
		var $appendedHtml = $("#qunit-fixture").find('.' + moduleDebug.defaults.mainWrapper);
		
		equal( $("div", $appendedHtml).length,2,"3 div appended")
		equal( $("a", $appendedHtml).length,4,"4 a appended")
		equal( $("table", $appendedHtml).length,1,"1 table appended")
	});
	/* _initNewDate() _getNewDate() */
	test("the function which set the input data",function(){
		//init local variable
		moduleDebug._initNewDate();
		//get local date variable
		var year = moduleDebug._getNewDate().year,
			month = moduleDebug._getNewDate().month,
			date = moduleDebug._getNewDate().date;
		//get compare date variable	
		var curyear = moduleDebug.obj.data('year'),
			curmonth = moduleDebug.obj.data('month'),
			curdate = moduleDebug.obj.data('date');
			
		deepEqual(year,curyear,"initial the year variable");
		deepEqual(month,curmonth,"initial the month variable");
		deepEqual(date,curdate,"initial the date variable");
	});
	/* _recalYearFactory() _recalMonthFactory() */
    test("mod year object after click button",function(){
		/* _recalYearFactory ** _recalMonthFactory */
		moduleDebug._setNewDate('year',year);
		moduleDebug._setNewDate('month',month);
		moduleDebug._setNewDate('date',date);
		//counting the next year value
			moduleDebug._recalYearFactory(1);
		//init local function to set/get date	
		var nextFullYear = moduleDebug.obj.data('year');
		
		//counting the prev year value
			moduleDebug._recalYearFactory(-1);
		//init local function to set/get date
		var prevFullYear = moduleDebug.obj.data('year');
		
		//counting the next year value
			moduleDebug._recalMonthFactory(1);
		//init local function to set/get date	
		var nextMonth = moduleDebug.obj.data('month');
		
		//counting the prev year value
			moduleDebug._recalMonthFactory(-1);
		//init local function to set/get date
		var prevMonth = moduleDebug.obj.data('month');
		//console.log(moduleDebug.obj)
			
		deepEqual(nextFullYear , year + 1 , "calculate the next year");
		deepEqual(prevFullYear , year , "calculate the prev year");
		deepEqual(nextMonth , month + 1 , "calculate the next month");
		deepEqual(prevMonth , month , "calculate the prev month");
	});
	/* _calTitle() */
	test("calculate the title format",function(){
		//init test data
		moduleDebug._setNewDate('year',year)
		moduleDebug._setNewDate('month',month)
		moduleDebug._setNewDate('date',date)
		//set test title format
		var curYear = year,
			curMonth = month,
			titleformate = curYear + '\n' + curMonth + '月';
		
		deepEqual(titleformate,moduleDebug._calTitle(),"title set as current time")
	});
	/* _calFirstDay() _calTotalDate() */
	test("calculate the first day of month and total days of a month",function(){
		//init test data
		moduleDebug._setNewDate('year',year)
		moduleDebug._setNewDate('month',month)
		moduleDebug._setNewDate('date',date)
		//set the test date
		var curyear = year,
			curmonth = month;
		//get first date of week
		var fristDayOfWeek = new Date(curyear,curmonth,1).getDay();
		//get total dates of month
		var totalDateOfWeek = new Date(curyear,curmonth,0).getDate();
		deepEqual(fristDayOfWeek ,moduleDebug._calFirstDay(),"first day of month")
		deepEqual(totalDateOfWeek ,moduleDebug._calTotalDate(),"first day of month")
	});
	/* _setActiveDate() */
	test("output date value",function(){
		//init test data
		moduleDebug._setNewDate('year',year)
		moduleDebug._setNewDate('month',month)
		moduleDebug._setNewDate('date',date)
		//will return after set current date and set type to number to the value
		moduleDebug._setActiveDate(date);
		var curDate = moduleDebug.obj.data('date');
		deepEqual(curDate,date,"shold be the same type and value")
	});
	/*_getInputProp()*/
	test("get input property",function(){
		//clear calender
		var input = moduleDebug._getInputProp();
		
		var objOffset = moduleDebug.obj.offset();
		var objW = moduleDebug.obj.outerWidth();
		var objH = moduleDebug.obj.outerHeight();
		
		var dateWp = $('.' + moduleDebug.defaults.dates);
		deepEqual(objOffset.left , input.left,"same left offset value!")
		deepEqual(objOffset.top , input.top,"same top offset value!")
		deepEqual(objH , input.h,"same outerHeight value!")
		deepEqual(objW , input.w,"same outerWidth value!")
	});
	/* _initDatePickerPos()	_clearCalender() _appendEmptyCalenderWp() _setCalender() _setTitle()*/
	test("calender render and rerender function collection",function(){
		//init test data
		moduleDebug._setNewDate('year',year)
		moduleDebug._setNewDate('month',month)
		moduleDebug._setNewDate('date',date)
		//init test calender wrapper
		moduleDebug._appendElem();
		
		//get clear target wrapper
		var calenderDates = $('.' + moduleDebug.defaults.mainWrapper).find('.' + moduleDebug.defaults.dates)
		//set calender position
		moduleDebug._initDatePickerPos();
		//clear calender date
		moduleDebug._clearCalender();
		
		deepEqual($("tr",calenderDates).length , 1,"calender date should be ereased!")
		
		/*---------------------------------------------------------*/
		
		//calculate the first day of the month
		var firstDay = moduleDebug._calFirstDay();
		//append empty elements before first day
		moduleDebug._appendEmptyCalenderWp();
		
		deepEqual($("tr td",calenderDates).length , firstDay,"calender date should be ereased!")
		
		/*---------------------------------------------------------*/
		
		//get total dates of the month
		var totalDate = moduleDebug._calTotalDate();
		//set the dates to calender
		moduleDebug._setCalender();
		
		deepEqual($("td",calenderDates).length , firstDay + totalDate,"calender date should be ereased!")
		
		/*---------------------------------------------------------*/
		//get the title element
		var title = $('.' + moduleDebug.defaults.mainWrapper).find('.' + moduleDebug.defaults.title);
		//set date to title
		moduleDebug._setTitle();
		
		deepEqual(title.html() , moduleDebug._calTitle(),"calender date should be ereased!")
		
	});
});
