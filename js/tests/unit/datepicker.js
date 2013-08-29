
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
	test("init calender wrapper",function(){
		
		moduleDebug._appendElem();
		
		var $appendedHtml = $("#qunit-fixture");
		
		equal( $("div", $appendedHtml).length,3,"3 div appended")
		equal( $("a", $appendedHtml).length,4,"4 a appended")
		equal( $("table", $appendedHtml).length,1,"1 table appended")
	});
	
	test("the function which set the date object",function(){
		/*_initNewDate */
////////////////////////////////////////////get local date variable
		var year = moduleDebug._initNewDate().year,
			month = moduleDebug._initNewDate().month,
			date = moduleDebug._initNewDate().date;
		//get compare date variable	
		var curyear = testDateObj.getFullYear(),
			curmonth = testDateObj.getMonth(),
			curdate = testDateObj.getDate();
			
		deepEqual(year,curyear,"initial the year variable");
		deepEqual(month,curmonth,"initial the month variable");
		deepEqual(date,curdate,"initial the date variable");
	});
	
    test("mod year object after click button",function(){
		/* _recalYearFactory ** _recalMonthFactory */
		//counting the next year value
			moduleDebug._recalYearFactory(1);
		//init local function to set/get date	
		var nextFullYear = moduleDebug.newDate['year'];
		
		//counting the prev year value
			moduleDebug._recalYearFactory(-1);
		//init local function to set/get date
		var prevFullYear = moduleDebug.newDate['year'];
		
		//counting the next year value
			moduleDebug._recalMonthFactory(1);
		//init local function to set/get date	
		var nextMonth = moduleDebug.newDate['month'];
		
		//counting the prev year value
			moduleDebug._recalMonthFactory(-1);
		//init local function to set/get date
		var prevMonth = moduleDebug.newDate['month'];
			
		deepEqual(nextFullYear , year + 1 , "calculate the next year");
		deepEqual(prevFullYear , year , "calculate the prev year");
		deepEqual(nextMonth , testDateObj.getMonth() + 1 , "calculate the next month");
		deepEqual(prevMonth , testDateObj.getMonth() , "calculate the prev month");
	});
	
	test("calculate the title format",function(){
		//set test title format
		var curYear = testDateObj.getFullYear(),
			curMonth = (testDateObj.getMonth() + 1),
			titleformate = curYear + '\n' + curMonth + '月';
		
		deepEqual(titleformate,moduleDebug._calTitle(),"title set as current time")
	});
	
	test("calculate the first day of month and total days of a month",function(){
		//set the test date
		var curyear = testDateObj.getFullYear(),
			curmonth = testDateObj.getMonth() + 1;
		//get first date of week
		var fristDayOfWeek = new Date(curyear,curmonth,1).getDay();
		//get total dates of month
		var totalDateOfWeek = new Date(curyear,curmonth,0).getDate();
		deepEqual(moduleDebug._calFirstDay(),fristDayOfWeek,"first day of month")
		deepEqual(moduleDebug._calTotalDate(),totalDateOfWeek,"first day of month")
	});
	
	test("output date value",function(){
		//will return after set current date and set type to number to the value
		moduleDebug._setActiveDate(date);
		var curDate = moduleDebug.newDate['date'];
		deepEqual(curDate,date,"shold be the same type and value")
	});
	
	test("get input property",function(){
		//clear calender
		moduleDebug._clearCalender();
		
		var dateWp = $('.' + moduleDebug.defaults.dates);
		
		
		
	});
});
