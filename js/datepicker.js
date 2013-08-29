(function (window, undefined) {
	"use strict";

	var console = window.console,
		$ = window.jQuery,
		grace = window.grace,
		old = $.fn.graceDatePicker;

	var module = {
		//newDate:[],
		dayInCh : ['日','一','二','三','四','五','六'],
		orgDay : ['Sun','Mon','Tue','Thu','Fri','Sat'],
		_init:function(obj,option){
			this.obj = obj;
			this._initOptions(option);
			//this._setNewDate();
			this._initNewDate();
			this._getNewDate();
			this._appendElem();
			this._iptFocus();
			//this._setTitle();
			//this._appendEmptyCalenderWp();
			//this._setCalender();
			//this._initDatePickerPos();
			//this._eventHandler();
		},
		//tested
		_initOptions:function(option){
			this.defaults = $.extend({},$.fn.graceDatePicker.defaults,option);
		},
		//tested
		//_initNewDate : function(){
			//var initNewDate = this.defaults.initNewDate;
			//this.newDate['year'] = initNewDate.getFullYear();
			//this.newDate['month'] = initNewDate.getMonth();
			//this.newDate['date'] = initNewDate.getDate();
		//},
		//
		_initNewDate :function(){
			var initNewDate = this.defaults.initNewDate;
			
			$(this.obj)
				.data({
					'year':initNewDate.getFullYear(),
					'month':initNewDate.getMonth(),
					'date':initNewDate.getDate()
					});
		},
		_setNewDate : function(type,value){
			this.obj.data(type,value);
		},
		_getNewDate : function(){
			var date = {};
				date.year = $(this.obj).data('year');
				date.month = $(this.obj).data('month');
				date.date = $(this.obj).data('date');
			return date;
		},
		//
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
				prop['left'] = inputNode.offset().left,
				prop['top'] = inputNode.offset().top,
				prop['h'] = parseInt(inputNode.outerHeight(),10),
				prop['w'] = parseInt(inputNode.outerWidth(),10);
			}
			return prop;
		},
		//
		_setCalender : function(){
			var totalDate = this._calTotalDate();
			var daysPerWeek = 7;
			var trIndex = 0;
			var datesObj = $('.' + this.defaults.dates);
			
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
		//
		_appendEmptyCalenderWp : function(){
			var firstDay = this._calFirstDay();
			var datesObj = $('.' + this.defaults.dates);

			for(var i = 0; i < firstDay; i++){
				$('<td><span></span></td>')
					.appendTo(datesObj.find("tr").eq(0));
			}
		},
		//
		_clearCalender : function(){
			var datesObj = $('.' + this.defaults.dates);
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
				//this.newDate['year'] -= 1;
				this._setNewDate('year',curYear - 1);
			}
		},
		//tested
		_recalMonthFactory:function(cal){
			var curMonth = this._getNewDate().month;
			if(cal === 1){
				if(curMonth < 11){
					this._setNewDate('month',curMonth + 1);
					//this.newDate['month'] += 1;
				}else{
					this._setNewDate('month',1);
					//this.newDate['month'] = 0;
				}
			}else if(cal === -1){
				if(curMonth > 0){
					this._setNewDate('month',curMonth - 1);
				}else{
					this._setNewDate('month',12);
				}
			}
		},
		//tested 
		_calTitle:function(){
			var curYear = this._getNewDate().year,
				curMonth = this._getNewDate().month,
				titleformat = curYear + '\n' + curMonth + '月';

			return titleformat;
		},
		//
		_setTitle:function(){
			var title = $('.' + this.defaults.title);
			return title.html(this._calTitle());
		},
		//
		_rerenderCalender : function(){
			this._initDatePickerPos();
			this._clearCalender();
			this._appendEmptyCalenderWp();
			this._setCalender();
			this._setTitle();
		},
		//focus to show clender
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
			});
		},
		//
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
			this._setNewDate('date',parseInt(num));
		},
		//
		_setInputVal : function(){
			var curYear = this._getNewDate().year,
				curMonth = this._getNewDate().month,
				curDate = this._getNewDate().date;

			var spliter = this.defaults.dateSpliter;

			var inputVal = curYear + spliter + curMonth + spliter + curDate;

			$(this.obj).val(inputVal);
		},
		//tested
		_appendElem : function(){
			if($('.' + this.defaults.mainWrapper).length === 0){
				$('<div class=' + this.defaults.mainWrapper +'>\
					<div class='+ this.defaults.header +'>\
						<a class='+ this.defaults.prevYearBtn +'></a>\
						<a class='+ this.defaults.nextYearBtn +'></a>\
						<a class='+ this.defaults.prevMonthBtn +'></a>\
						<a class='+ this.defaults.nextMonthBtn +'></a>\
						<div class='+ this.defaults.title +'></div>\
					</div>\
					<table class='+ this.defaults.calender +'>\
						<thead class='+ this.defaults.week +'>\
						</thead>\
						<tbody class='+ this.defaults.dates +'>\
							<tr></tr>\
						</tbody>\
					</table>\
				</div>').appendTo(this.defaults.topNode);

				this._eventHandler();
			}
		}
	}
	
	$.fn.graceDatePicker = function (option) {
		
		module._init(this, option);

		return this;
	}

	$.fn.graceDatePicker.defaults = {
		mainWrapper : "grace-date-picker",
		nextYearBtn : "grace-date-ny-btn",
		prevYearBtn : "grace-date-py-btn",
		title : "grace-date-title",
		calender : "grace-date-calender",
		week : "grace-date-week",
		dates : "grace-date-dates",
		header : "grace-date-header",
		prevMonthBtn : "grace-date-pm-btn",
		nextMonthBtn : "grace-date-nm-btn",
		//dateInput : "grace-date-input",
		topNode : "body",
		initNewDate : new Date(),
		dateSpliter : '-'

	}

	$.fn.graceDatePicker.noConflict = function () {
		$.fn.graceDatePicker = old;
		return this;
	};

	//for debug
	$.fn.graceDatePicker.debug = module;

})(window);