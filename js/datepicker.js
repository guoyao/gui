(function (window, undefined) {
	"use strict";

	var console = window.console,
		$ = window.jQuery,
		gui = window.gui,
		old = $.fn.guiDatePicker;

	var module = {
		newDate:[],
		dayInCh : ['日','一','二','三','四','五','六'],
		orgDay : ['Sun','Mon','Tue','Thu','Fri','Sat'],
		_init:function(obj,option){
			this.obj = obj;
			this._initOptions(option);
			this._initNewDate();
			this._appendElem();
			this._setTitle();
			this._appendEmptyCalenderWp();
			this._setCalender();
			this._eventHandler();
			this._initDatePickerPos();
		},
		//tested
		_initOptions:function(option){
			this.defaults = $.extend({},$.fn.guiDatePicker.defaults,option);
			//console.log(this.defaults.mainWrapper)
		},
		//tested
		_initNewDate : function(){
			var initNewDate = this.defaults.initNewDate;
			this.newDate['year'] = initNewDate.getFullYear();
			this.newDate['month'] = initNewDate.getMonth();
			this.newDate['date'] = initNewDate.getDate();
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
			var inputNode = $('.' + this.defaults.dateInput) | undefined,
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
					//datesObj
						//.find("tr")
						//.eq(trIndex)
						//.append('<td><a>'+ (j + 1) +'</a></td>');
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
					.appendTo(datesObj
					.find("tr")
					.eq(0));
			}
		},
		_clearCalender : function(){
			var datesObj = $('.' + this.defaults.dates);
			datesObj.html('<tr></tr>');
		},
		//tested
		_calFirstDay:function(){
			var curYear = this.newDate['year'],
				curMonth = this.newDate['month'] + 1,
				curDate = this.newDate['date'];

			return new Date(curYear,curMonth,1).getDay();
		},
		//tested
		_calTotalDate:function(){
			var curYear = this.newDate['year'],
				curMonth = this.newDate['month'] + 1,
				curDate = this.newDate['date'];

			return new Date(curYear,curMonth,0).getDate();
		},
		//tested
		_recalYearFactory:function(cal){
			if(cal === 1){
				this.newDate['year'] += 1;
			}else if(cal === -1){
				this.newDate['year'] -= 1;
			}
			return this.newDate['year'];
		},
		//tested
		_recalMonthFactory:function(cal){
			if(cal === 1){
				if(this.newDate['month'] < 11){
					this.newDate['month'] += 1;
				}else{
					this.newDate['month'] = 0;
				}
			}else if(cal === -1){
				if(this.newDate['month'] > 0){
					this.newDate['month'] -= 1;
				}else{
					this.newDate['month'] = 11;
				}
			}
			return this.newDate['year'];
		},
		//tested 
		_calTitle:function(){
			var curYear = this.newDate['year'],
				curMonth = (this.newDate['month'] + 1),
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
			this._clearCalender();
			this._appendEmptyCalenderWp();
			this._setCalender();
			this._setTitle();
		},
		//
		_eventHandler:function(){
			var mo = this,
				mainWrapper = $('.' + mo.defaults.mainWrapper),
				prevYearObj = $('.' + this.defaults.prevYearBtn),
				nextYearObj = $('.' + this.defaults.nextYearBtn),

				prevMonthObj = $('.' + this.defaults.prevMonthBtn),
				nextMonthObj = $('.' + this.defaults.nextMonthBtn),

				dateInputObj = $('.' + this.defaults.dateInput),
				datesObj = $('.' + this.defaults.dates);
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

			//focus to show clender
			dateInputObj.focus(function(e){

				mainWrapper
					.stop(true,true)
					.fadeIn();
			});
			//get calender interactive button
			datesObj.on('click','a',function(e){

				var getActiveText = e.target.innerText;

				mainWrapper
					.stop(true,true)
					.fadeOut();

				mo._setActiveDate(getActiveText);
				mo._setInputText();
			});
		},
		//
		_setActiveDate : function(text){
			this.newDate['date'] = parseInt(text);
		},
		//
		_setInputText : function(){
			var curYear = this.newDate['year'],
				curMonth = this.newDate['month'] + 1,
				curDate = this.newDate['date'];

			var spliter = this.defaults.dateSpliter;

			var inputVal = curYear + spliter + curMonth + spliter + curDate;

			$('.' + this.defaults.dateInput).val(inputVal);
		},
		//
		_appendElem : function(){
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
		dateInput : "gui-date-input",
		topNode : "body",
		initNewDate : new Date(),
		dateSpliter : '-'

	}

	$.fn.guiDatePicker.noConflict = function () {
		$.fn.guiDatePicker = old;
		return this;
	};

	//for debug
	$.fn.guiDatePicker.debug = module;

})(window);