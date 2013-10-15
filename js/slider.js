(function (window, undefined) {
	"use strict";

	var console = window.console,
		$ = window.jQuery,
		gui = window.gui,
		old = $.fn.guiSlider;

	var Module = function (obj, option) {
        this._init(obj, option);
    }

	Module.prototype = {
		curTarget: {},
		//index: [],
		_init: function (obj, option) {
			this.obj = obj;
			this._initOptions(option);
			//this._initVaribles(obj);//this.rangeSelectorBar = $(this.obj).find("." + this.defaults.rangeBarClass);
			this._initNodeWrapper();
			this._initFetchData();
		},
		_initOptions: function (option) {
			this.defaults = $.extend({}, $.fn.guiSlider.defaults, option);
		},
		_initFetchData: function () {
			if (this.defaults.remote.url !== undefined) {
				$.ajax({
					type: this.defaults.remote.type,
					url: this.defaults.remote.url,
					data: this.defaults.remote.data,
					dataType: this.defaults.remote.dataType
				})
					.done(function () {
						this._initElements();
					})
					.fail(function () {
						alert('failed');
					})
			} else if (this.defaults.data.indicatordata !== undefined) {
				this._initElements();
			}
		},
		_initElements: function () {
			this._initBtns();
			this._calculateMoveDistance();
			this._renderRangeBar();
			this._initAddIndicatorText();
			this._eventHandler();
		},
		_initNodeWrapper: function () {
			$('<div class="slider-btn-wrapper"></div>').appendTo(this.obj);
			if (this.defaults.indicatorText) {
				$('<div class="slider-range-indicator"></div>').appendTo(this.obj);
			}
		},
		_initBtns: function () {
			this.index = [];
			for (var i = 0; i < this.defaults.btns.length; i++) {
				this.index[i] = (this.defaults.btns[i] === 'max') ? this.defaults.data.indicatordata.length - 1 : this.defaults.btns[i];

				$('<a class="btn"></a>')
					.appendTo($(this.obj).find(".slider-btn-wrapper"))
					.css({
						"left": this.index[i] / (this.defaults.data.indicatordata.length - 1) * 100 + "%",
						"margin-left": -(this.defaults.btnSize.width / 4),
						"margin-top": -(this.defaults.btnSize.height / 4)
					});
			}
		},
		_initAddIndicatorText: function () {
			if (this.defaults.indicatorText) {
				for (var i = 0; i < this.defaults.data.indicatordata.length; i++) {
					$('<span>' + this.defaults.data.indicatordata[i] + '</span>')
						.appendTo($(this.obj).find(".slider-range-indicator"))
						.css({
							"left": i / (this.defaults.data.indicatordata.length - 1) * 100 + "%",
							"margin-left": -$(this.obj).find(".slider-range-indicator span")
								.eq(i)
								.width()
								/ 2 +
								$(this.obj)
									.find(".btn")
									.outerWidth()
									/ 4
						});
				}
				//console.log(parseInt($(this.obj).find(".slider-range-indicator span").outerWidth(), 10) * this.defaults.data.indicatordata.length , $(this.obj).find(".slider-btn-wrapper").outerWidth())
				if (parseInt($(this.obj).find(".slider-range-indicator span").outerWidth(), 10) * this.defaults.data.indicatordata.length > $(this.obj).find(".slider-btn-wrapper").outerWidth()) {
					for (var j = 0; j < this.defaults.data.indicatordata.length; j++) {
						if (j % 2 === 0) {
							$(this.obj).find(".slider-range-indicator span")
								.eq(j)
								.css({
									"top": $(this.obj).find(".slider-range-indicator span").height()
								});
						}
					}
				}
			}
		},
		_eventHandler: function () {
			var that = this;

			$(this.obj).find(".slider-btn-wrapper").on("mousedown",function(e){
				e.preventDefault();

				that._saveTarget(e);
			});
			$(document).on("mousemove",function (e) {
				e.stopPropagation();
				that._refreshPosition(e);
			});
			$(document).on("mouseup",function (e) {
				that._destroyTarget();
			});
		},
		_checkMoveStep: function () {
			return Math.abs(this.curX - this.orgX) > this.moveDistance * this.defaults.step * 0.8;
		},
		_calculateMoveDirection: function () {
			if (this._checkMoveStep()) {
				if (this.curX - this.orgX > 0) {
					return 1;
				} else if (this.curX - this.orgX < 0) {
					return -1;
				}
			}
		},
		_calculateMoveDistance: function () {
			this.moveDistance = (parseInt($(this.obj).find(".slider-btn-wrapper").width(), 10)) / (this.defaults.data.indicatordata.length - 1);
			this.moveDistance = Math.round(this.moveDistance);
		},
		_refreshPosition: function (e) {
			this.curX = e.pageX;
			if (this.curTarget.className === 'btn') {
				if (this._calculateMoveDirection() === 1 && this.index[$(this.curTarget).index()] < this.defaults.data.indicatordata.length - 1) {

					this.index[$(this.curTarget).index()] += this.defaults.step;
					$(this.curTarget)
						.css({"left": (this.index[$(this.curTarget).index()] / (this.defaults.data.indicatordata.length - 1) * 100 + "%")});

					this.orgX = $(this.curTarget).offset().left + parseInt($(this.curTarget).width(), 10) / 2;
				} else if (this._calculateMoveDirection(e) === -1 && this.index[$(this.curTarget).index()] > 0) {

					this.index[$(this.curTarget).index()] -= this.defaults.step;
					$(this.curTarget)
						.css({"left": (this.index[$(this.curTarget).index()] / (this.defaults.data.indicatordata.length - 1) * 100 + "%")});

					this.orgX = $(this.curTarget).offset().left + parseInt($(this.curTarget).width(), 10) / 2;
				}
			}
			this._refreshRangeBarPosition();
		},
		_renderRangeBar: function () {
			if (this.defaults.rangeBar) {
				if ($(this.obj).find(".slider-range-button").length <= 0) {
					$('<a class="slider-range-button"></a>').appendTo($(this.obj).find(".slider-btn-wrapper"));
				}
				this._refreshRangeBarPosition();
			}
		},
		_refreshRangeBarPosition: function (e) {
			var btnLeft = [];
			if (this.curTarget.className === "slider-range-button") {
				if (this._calculateMoveDirection() === 1 && this._checkRangeBarMoveRange()) {
					for (var i = 0; i < this.index.length; i++) {
						this.index[i] += this.defaults.step;
						$(this.obj)
							.find(".btn")
							.eq(i)
							.css({"left": (this.index[i] / (this.defaults.data.indicatordata.length - 1) * 100 + "%")});
					}
					this.orgX = this.curX;
				} else if (this._calculateMoveDirection() === -1 && this._checkRangeBarMoveRange()) {
					for (var j = 0; j < this.index.length; j++) {
						this.index[j] -= this.defaults.step;
						$(this.obj)
							.find("." + this.defaults.btnClass)
							.eq(j)
							.css({"left": (this.index[j] / (this.defaults.data.indicatordata.length - 1) * 100 + "%")});
					}
					this.orgX = this.curX;
				}
			}
			for (var k = 0; k < $(this.obj).find(".btn").length; k++) {
				btnLeft.push(parseInt($(this.obj)
					.find("." + this.defaults.btnClass)
					.get(k)
					.style.left,10) / 100 * parseInt($(this.obj).find(".slider-btn-wrapper").css("width")));
			}
			var rangeBar = Math.abs(btnLeft[0] - btnLeft[1]);
			$(this.obj)
				.find(".slider-range-button")
				.css({'width': rangeBar,
					'left': btnLeft[0] - btnLeft[1] > 0 ? btnLeft[1] + this.defaults.btnSize.width / 4 : btnLeft[0] + this.defaults.btnSize.width / 4});
		},
		_checkRangeBarMoveRange: function () {
			if (this._calculateMoveDirection() === 1) {
				for (var i = 0; i < this.index.length; i++) {
					if (this.index[i] + 1 > this.defaults.data.indicatordata.length - 1) {
						return false;
					}
				}
				return true;
			}
			if (this._calculateMoveDirection() === -1) {
				for (var j = 0; j < this.index.length; j++) {
					if (this.index[j] - 1 < 0) {
						return false;
					}
				}
				return true;
			}
		},
		_saveTarget: function (e) {
			this.curTarget = e.target;
			this.orgX = e.pageX;

			//this.curOffset = parseInt(e.target.style.left, 10);
		},
		/*_checkTarget: function (e) {
			return this.curTarget === e.target;
		},*/
		_destroyTarget: function () {
			this.curTarget = {};
		}
	}

	$.fn.guiSlider = function (option) {
		return this.each(function () {
            new Module(this, option);
        });
	}

	$.fn.guiSlider.defaults = {
		step: 1,
		btnClass: 'btn',
		btns: [0, 'max'],
		btnSize: {
			width: 30,
			height: 30
		},
		rangeBar: true,
		/*rangeBarClass: 'slider-range-button',
		btnWrapperClass: 'slider-btn-wrapper',
		indicatorTextClass: 'slider-range-indicator',*/
		indicatorText: true,
		data: {
			indicatordata: []
		},
		remote: {}//'type':'POST','url':'','data':'','dataType':'JSON'
	}

	$.fn.guiSlider.Constructor = Module;

	$.fn.guiSlider.noConflict = function () {
		$.fn.guiSlider = old;
		return this;
	};

})(window);