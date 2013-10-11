(function (window, undefined) {
    "use strict";

    var console = window.console,
        $ = window.jQuery,
        gui = window.gui,
        old = $.fn.guiDatePicker;

    var Module = function (obj, option) {
        this._init(obj, option);
    }

    Module.prototype = {
        _init: function (obj, option) {
            this.obj = obj;
            this._initOptions(option);
            this._initNewDate();
            this._getNewDate();
            //this._setNowHighlight();
            this._appendElem();
            //this._iptFocus();
            this._eventHandler();
        },
        _calNowHighlight: function () {
            var now = new Date(),
                nowYear = now.getFullYear(),
                nowMonth = now.getMonth();
            var objCur = this._getNewDate();
            var objCurYear = objCur.year,
                objCurMonth = objCur.month;
            if (nowYear == objCurYear && nowMonth == objCurMonth) {
                return true;
            }
        },
        _initOptions: function (option) {
            this.defaults = $.extend({}, $.fn.guiDatePicker.defaults, option);
        },
        _initNewDate: function () {
            var initNewDate = this.defaults.initNewDate;

            this._setNewDate('year', initNewDate.getFullYear());
            this._setNewDate('month', initNewDate.getMonth());
            this._setNewDate('date', initNewDate.getDate());
        },
        _setNewDate: function (type, value) {
            $(this.obj).data(type, value);
        },
        _getNewDate: function () {
            var date = {};
            date.year = $(this.obj).data('year');
            date.month = $(this.obj).data('month');
            date.date = $(this.obj).data('date');
            return date;
        },
        _initDatePickerPos: function () {
            var inputOffset = this._getInputProp(),
                left = inputOffset.left,
                top = inputOffset.top + inputOffset.h;

            $('.gui-date-picker')
                .css({
                    'left': left,
                    'top': top
                })
        },
        _getInputProp: function () {
            var inputNode = $(this.obj) || undefined,
                prop = [];
            if (inputNode) {
                prop.left = inputNode.offset().left,
                prop.top = inputNode.offset().top,
                prop.h = parseInt(inputNode.outerHeight(), 10),
                prop.w = parseInt(inputNode.outerWidth(), 10);
            }
            return prop;
        },
        _setCalender: function () {
            var totalDate = this._calTotalDate();
            var daysPerWeek = 7;
            var trIndex = 0;
            var datesObj = $('.gui-date-picker').find('.gui-date-dates');

            for (var j = 0; j < totalDate; j++) {
                if (datesObj.find("td").length % daysPerWeek === 0) {

                    trIndex++;

                    $('<tr><td><a>' + (j + 1) + '</a></td></tr>')
                        .appendTo(datesObj);

                } else {
                    $('<td><a>' + (j + 1) + '</a></td>')
                        .appendTo(datesObj.find("tr").eq(trIndex));
                }
            }
        },
        _appendEmptyCalenderWp: function () {
            var firstDay = this._calFirstDay();
            var datesObj = $('.gui-date-picker').find('.gui-date-dates');

            for (var i = 0; i < firstDay; i++) {
                $('<td><span></span></td>')
                    .appendTo(datesObj.find("tr").eq(0));
            }
        },
        _clearCalender: function () {
            var datesObj = $('.gui-date-picker').find('.gui-date-dates');
            datesObj.html('<tr></tr>');
        },
        _calFirstDay: function () {
            var curYear = this._getNewDate().year,
                curMonth = this._getNewDate().month,
                curDate = this._getNewDate().date;

            return new Date(curYear, curMonth, 1).getDay();
        },
        _calTotalDate: function () {
            var curYear = this._getNewDate().year,
                curMonth = this._getNewDate().month,
                curDate = this._getNewDate().date;

            return new Date(curYear, curMonth, 0).getDate();
        },
        _recalYearFactory: function (cal) {
            var curYear = this._getNewDate().year;
            if (cal === 1) {
                this._setNewDate('year', curYear + 1);
            } else if (cal === -1) {
                this._setNewDate('year', curYear - 1);
            }
        },
        _recalMonthFactory: function (cal) {
            var curMonth = this._getNewDate().month;
            if (cal === 1) {
                if (curMonth < 11) {
                    this._setNewDate('month', curMonth + 1);
                } else {
                    this._setNewDate('month', 0);
                }
            } else if (cal === -1) {
                if (curMonth > 0) {
                    this._setNewDate('month', curMonth - 1);
                } else {
                    this._setNewDate('month', 11);
                }
            }
        },
        _calTitle: function () {
            var curYear = this._getNewDate().year,
                curMonth = this._getNewDate().month + 1,
                titleformat = curYear + '\n' + curMonth + '月';

            return titleformat;
        },
        _setTitle: function () {
            var $title = $('.gui-date-picker').find('.gui-date-title');
            return $title.html(this._calTitle());
        },
        _rerenderCalender: function () {
            this._initDatePickerPos();
            this._clearCalender();
            this._appendEmptyCalenderWp();
            this._setCalender();
            this._highlightToday();
            this._setTitle();
        },
        /*_iptFocus :function(){
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
         },*/
        _eventHandler: function () {
            var that = this,
                $mainWrapper = $('.gui-date-picker'),
                $prevYearObj = $mainWrapper.find('.gui-date-py-btn'),
                $nextYearObj = $mainWrapper.find('.gui-date-ny-btn'),

                $prevMonthObj = $mainWrapper.find('.gui-date-pm-btn'),
                $nextMonthObj = $mainWrapper.find('.gui-date-nm-btn'),

            //dateInputObj = $(this.obj),
                $datesObj = $mainWrapper.find('.gui-date-dates');
            //prev year
            $prevYearObj.click(function () {

                that._recalYearFactory(-1);
                that._rerenderCalender();
            });
            //next year
            $nextYearObj.click(function () {

                that._recalYearFactory(1);
                that._rerenderCalender();
            });
            //prev month
            $prevMonthObj.click(function () {

                that._recalMonthFactory(-1);
                that._rerenderCalender();
            });
            //next month
            $nextMonthObj.click(function () {

                that._recalMonthFactory(1);
                that._rerenderCalender();
            });
            //get calender interactive button
            $datesObj.on('click', 'a', function (e) {

                var getActiveDate = e.target.innerText;

                $mainWrapper
                    .stop(true, true)
                    .fadeOut();

                that._setActiveDate(getActiveDate);
                that._setInputVal();
            });

            $(document).on("click", function () {
                $('.gui-date-picker').fadeOut();
            });

            $(this.obj).on("click", function (e) {
                e.stopPropagation();
            })

            $(this.obj).on("focus", function (e) {
                that.obj = $(e.target);
                that._rerenderCalender();
                $('.gui-date-picker')
                    .stop(true, true)
                    .fadeIn();
                //mo.obj = $(e.target);
                that._highCurLightDate();
                that._highlightToday();
            });
        },
        _setActiveDate: function (num) {
            this._setNewDate('date', parseInt(num, 10));
        },
        _setInputVal: function () {
            var curYear = this._getNewDate().year,
                curMonth = this._getNewDate().month + 1,
                curDate = this._getNewDate().date;

            var spliter = this.defaults.dateSpliter;

            var inputVal = curYear + spliter + curMonth + spliter + curDate;

            $(this.obj).val(inputVal);
        },
        _highCurLightDate: function (index) {
            var curYear = this._getNewDate().year,
                curMonth = this._getNewDate().month,
                curDate = this._getNewDate().date;
            var firstDay = this._calFirstDay();
            var tdIndex = curDate + firstDay - 1;
            var dateObj = $('.gui-date-picker').find('.gui-date-dates td');
            dateObj.eq(tdIndex).addClass("gui-date-current-date");
        },
        _highlightToday: function () {
            if (this._calNowHighlight()) {
                var now = new Date();
                var nowDate = now.getDate();
                var firstDay = this._calFirstDay();
                var tdIndex = nowDate + firstDay - 1;
                var dateObj = $('.gui-date-picker').find('.gui-date-dates td');
                dateObj.eq(tdIndex).addClass("gui-date-today");
            }
        },
        _appendElem: function () {
            //if($('.' + this.defaults.mainWrapper).length === 0){
            $('<div class="gui-date-picker">' +
                '<div class="gui-date-header">' +
                '<a class="gui-date-py-btn">&lt;&lt;</a>' +
                '<a class="gui-date-ny-btn">&gt;&gt;</a>' +
                '<a class="gui-date-pm-btn">&lt;</a>' +
                '<a class="gui-date-nm-btn">&gt;</a>' +
                '<div class="gui-date-title"></div>' +
                '</div>' +
                '<table class="gui-date-calender">' +
                '<thead class="gui-date-week">' +
                '<tr></tr>' +
                '</thead>' +
                '<tbody class="gui-date-dates">' +
                '<tr></tr>' +
                '</tbody>' +
                '</table>' +
                '</div>').insertAfter($(this.obj));//.appendTo(this.defaults.topNode);

            //this._eventHandler();

            this._addWeekTitle();
            //}
        },
        _addWeekTitle: function () {
            var weekTitle = this.defaults.weekTitle;
            var weekTitleNode = $('.gui-date-picker').find('.gui-date-week tr');

            for (var i = 0; i < weekTitle.length; i++) {
                $('<th><span>' + weekTitle[i] + '</span></th>').appendTo(weekTitleNode);
            }
        }
    }

    $.fn.guiDatePicker = function (option) {
        return this.each(function () {
            new Module(this, option);
        });
    }

    $.fn.guiDatePicker.defaults = {
        /*mainWrapper: "gui-date-picker",
        nextYearBtn: "gui-date-ny-btn",
        prevYearBtn: "gui-date-py-btn",
        title: "gui-date-title",
        calender: "gui-date-calender",
        week: "gui-date-week",
        dates: "gui-date-dates",
        header: "gui-date-header",
        prevMonthBtn: "gui-date-pm-btn",
        nextMonthBtn: "gui-date-nm-btn",
        curDateClass: "gui-date-current-date",
        todayClass: "gui-date-today",
        //dateInput : "gui-date-input",
       */
        initNewDate: new Date(),
        dateSpliter: '-',
        weekTitle: ['日', '一', '二', '三', '四', '五', '六']
    }

    $.fn.guiDatePicker.Constructor = Module;

    $.fn.guiDatePicker.noConflict = function () {
        $.fn.guiDatePicker = old;
        return this;
    };

})(window);