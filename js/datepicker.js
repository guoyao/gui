(function (window, undefined) {
	"use strict";

	var console = window.console,
		$ = window.jQuery,
		grace = window.grace,
		old = $.fn.guiDatePicker;

	var module = {
		_init:function(obj,option){
			this.obj = obj;
			this._initOptions(option);
			this._initNewDate();
			this._getNewDate();
			//this._setNowHighlight();
			this._appendElem();
			this._iptFocus();
		},
		//
		_calNowHighlight : function(){
			var now = new Date(),
				nowYear = now.getFullYear(),
				nowMonth = now.getMonth();
			var objCur = this._getNewDate();
			var objCurYear = objCur.year,
				objCurMonth = objCur.month;
			if(nowYear == objCurYear && nowMonth == objCurMonth){
				return true;
			}
		},
		//tested
		_initOptions:function(option){
			this.defaults = $.extend({},$.fn.guiDatePicker.defaults,option);
		},
		//tested
		_initNewDate :function(){
			var initNewDate = this.defaults.initNewDate;
			
			this._setNewDate('year',initNewDate.getFullYear());
			this._setNewDate('month',initNewDate.getMonth());
			this._setNewDate('date',initNewDate.getDate());
		},
		//tested
		_setNewDate : function(type,value){
			this.obj.data(type,value);
		},
		//tested
		_getNewDate : function(){
			var date = {};
				date.year = $(this.obj).data('year');
				date.month = $(this.obj).data('month');
				date.date = $(this.obj).data('date');
			return date;
		},
		//tested
		_initDatePickerPos : function(){
			var inputOffset = this._getInputProp(),
				left = inputOffset.left,
				top = inputOffset.top + inputOffset.h;

			$('.' + this.defaults.mainWrapper)
				.css({'left' : left,
						'top' : top
				})
		},
		//
		_getInputProp : function(){
			var inputNode = $(this.obj) || undefined,
				prop = [];
			if(inputNode){
				prop.left = inputNode.offset().left,
				prop.top = inputNode.offset().top,
				prop.h = parseInt(inputNode.outerHeight(),10),
				prop.w = parseInt(inputNode.outerWidth(),10);
			}
			return prop;
		},
		//tested
		_setCalender : function(){
			var totalDate = this._calTotalDate();
			var daysPerWeek = 7;
			var trIndex = 0;
			var datesObj = $('.' + this.defaults.mainWrapper).find('.' + this.defaults.dates);
			
			for (var j = 0;j < totalDate; j++){
				if(datesObj.find("td").length % daysPerWeek === 0){

					trIndex++;

					$('<tr><td><a>'+ (j + 1) +'</a></td></tr>')
						.appendTo(datesObj);

				}else{
					$('<td><a>'+ (j + 1) +'</a></td>')
						.appendTo(datesObj.find("tr").eq(trIndex));
				}
			}
		},
		//tested
		_appendEmptyCalenderWp : function(){
			var firstDay = this._calFirstDay();
			var datesObj = $('.' + this.defaults.mainWrapper).find('.' + this.defaults.dates);

			for(var i = 0; i < firstDay; i++){
				$('<td><span></span></td>')
					.appendTo(datesObj.find("tr").eq(0));
			}
		},
		//tested
		_clearCalender : function(){
			var datesObj = $('.' + this.defaults.mainWrapper).find('.' + this.defaults.dates);
			datesObj.html('<tr></tr>');
		},
		//tested
		_calFirstDay:function(){
			var curYear = this._getNewDate().year,
				curMonth = this._getNewDate().month,
				curDate = this._getNewDate().date;

			return new Date(curYear,curMonth,1).getDay();
		},
		//tested
		_calTotalDate:function(){
			var curYear = this._getNewDate().year,
				curMonth = this._getNewDate().month,
				curDate = this._getNewDate().date;

			return new Date(curYear,curMonth,0).getDate();
		},
		//tested
		_recalYearFactory:function(cal){
			var curYear = this._getNewDate().year;
			if(cal === 1){
				this._setNewDate('year',curYear + 1);
			}else if(cal === -1){
				this._setNewDate('year',curYear - 1);
			}
		},
		//tested
		_recalMonthFactory:function(cal){
			var curMonth = this._getNewDate().month;
			if(cal === 1){
				if(curMonth < 11){
					this._setNewDate('month',curMonth + 1);
				}else{
					this._setNewDate('month',0);
				}
			}else if(cal === -1){
				if(curMonth > 0){
					this._setNewDate('month',curMonth - 1);
				}else{
					this._setNewDate('month',11);
				}
			}
		},
		//tested 
		_calTitle:function(){
			var curYear = this._getNewDate().year,
				curMonth = this._getNewDate().month + 1,
				titleformat = curYear + '\n' + curMonth + '月';

			return titleformat;
		},
		//tested
		_setTitle:function(){
			var title = $('.' + this.defaults.mainWrapper).find('.' + this.defaults.title);
			return title.html(this._calTitle());
		},
		//tested step by step
		_rerenderCalender : function(){
			this._initDatePickerPos();
			this._clearCalender();
			this._appendEmptyCalenderWp();
			this._setCalender();
			this._highlightToday();
			this._setTitle();
		},
		//bind focus several times
		_iptFocus :function(){
			var mo = this,
				dateInputObj = $(this.obj);

			dateInputObj.focus(function(e){
				mo.obj = $(e.target);
				mo._rerenderCalender();
				$('.' + mo.defaults.mainWrapper)
					.stop(true,true)
					.fadeIn();
				//mo.obj = $(e.target);
				mo._highCurLightDate();
				mo._highlightToday();
			});
		},
		//test covered by the others
		_eventHandler:function(){
			var mo = this,
				mainWrapper = $('.' + this.defaults.mainWrapper),
				prevYearObj = mainWrapper.find('.' + this.defaults.prevYearBtn),
				nextYearObj = mainWrapper.find('.' + this.defaults.nextYearBtn),

				prevMonthObj = mainWrapper.find('.' + this.defaults.prevMonthBtn),
				nextMonthObj = mainWrapper.find('.' + this.defaults.nextMonthBtn),

				//dateInputObj = $(this.obj),
				datesObj = mainWrapper.find('.' + this.defaults.dates);
			//prev year
			prevYearObj.click(function(){

				mo._recalYearFactory(-1);
				mo._rerenderCalender();
			});
			//next year
			nextYearObj.click(function(){

				mo._recalYearFactory(1);
				mo._rerenderCalender();
			});
			//prev month
			prevMonthObj.click(function(){

				mo._recalMonthFactory(-1);
				mo._rerenderCalender();
			});
			//next month
			nextMonthObj.click(function(){

				mo._recalMonthFactory(1);
				mo._rerenderCalender();
			});
			//get calender interactive button
			datesObj.on('click','a',function(e){
				
				var getActiveDate = e.target.innerText;

				mainWrapper
					.stop(true,true)
					.fadeOut();

				mo._setActiveDate(getActiveDate);
				mo._setInputVal();
			});
		},
		//tested
		_setActiveDate : function(num){
			this._setNewDate('date',parseInt(num,10));
		},
		//
		_setInputVal : function(){
			var curYear = this._getNewDate().year,
				curMonth = this._getNewDate().month + 1,
				curDate = this._getNewDate().date;

			var spliter = this.defaults.dateSpliter;

			var inputVal = curYear + spliter + curMonth + spliter + curDate;

			$(this.obj).val(inputVal);
		},
		//
		_highCurLightDate : function(index){
			var curYear = this._getNewDate().year,
				curMonth = this._getNewDate().month,
				curDate = this._getNewDate().date;
			var firstDay = this._calFirstDay();
			var tdIndex = curDate + firstDay -1;
			var dateObj = $('.' + this.defaults.mainWrapper).find('.' + this.defaults.dates + ' td');
			dateObj.eq(tdIndex).addClass(this.defaults.curDateClass);
		},
		//
		_highlightToday : function(){
			if(this._calNowHighlight()){
				var now = new Date();
				var nowDate = now.getDate();
				var firstDay = this._calFirstDay();
				var tdIndex = nowDate + firstDay - 1;
				var dateObj = $('.' + this.defaults.mainWrapper).find('.' + this.defaults.dates + ' td');
				dateObj.eq(tdIndex).addClass(this.defaults.todayClass);
			}
		},
		//tested
		_appendElem : function(){
			if($('.' + this.defaults.mainWrapper).length === 0){
				$('<div class=' + this.defaults.mainWrapper +' style="display:none;position: absolute;">' + 
					'<div class='+ this.defaults.header +'>' + 
						'<a class='+ this.defaults.prevYearBtn +'>&lt;&lt;</a>' + 
						'<a class='+ this.defaults.nextYearBtn +'>&gt;&gt;</a>' + 
						'<a class='+ this.defaults.prevMonthBtn +'>&lt;</a>' + 
						'<a class='+ this.defaults.nextMonthBtn +'>&gt;</a>' + 
						'<div class='+ this.defaults.title +'></div>' + 
					'</div>' + 
					'<table class='+ this.defaults.calender +'>' + 
						'<thead class='+ this.defaults.week +'>'+
							'<tr></tr>' + 
						'</thead>' + 
						'<tbody class='+ this.defaults.dates +'>' + 
							'<tr></tr>' + 
						'</tbody>' + 
					'</table>' + 
				'</div>').appendTo(this.defaults.topNode);

				this._eventHandler();

				this._addWeekTitle();
			}
		},
		_addWeekTitle : function(){
			var weekTitle = this.defaults.weekTitle;
			var weekTitleNode = $('.' + this.defaults.mainWrapper).find('.' + this.defaults.week + ' tr');

			for(var i = 0; i < weekTitle.length; i++){
				$('<th><span>' + weekTitle[i] + '</span></th>').appendTo(weekTitleNode);
			}
		}
	}
	
	$.fn.guiDatePicker = function (option) {
		
		module._init(this, option);

		return this;
	}

	$.fn.guiDatePicker.defaults = {
		mainWrapper : "gui-date-picker",
		nextYearBtn : "gui-date-ny-btn",
		prevYearBtn : "gui-date-py-btn",
		title : "gui-date-title",
		calender : "gui-date-calender",
		week : "gui-date-week",
		dates : "gui-date-dates",
		header : "gui-date-header",
		prevMonthBtn : "gui-date-pm-btn",
		nextMonthBtn : "gui-date-nm-btn",
		curDateClass : "gui-date-current-date",
		todayClass : "gui-date-today",
		//dateInput : "gui-date-input",
		topNode : "body",
		initNewDate : new Date(),
		dateSpliter : '-',
		weekTitle : ['日','一','二','三','四','五','六']
	}

	$.fn.guiDatePicker.noConflict = function () {
		$.fn.guiDatePicker = old;
		return this;
	};

	//for debug
	$.fn.guiDatePicker.debug = module;

})(window);