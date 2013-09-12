//
(function (window, undefined) {
	"use strict";

	var console = window.console,
		$ = window.jQuery,
		gui = window.gui,
		old = $.fn.guiCarousel;

	$.fn.guiCarousel = function (option) {

		var module = {
			_init: function (obj, option) {
				this.obj = obj;
				this._initOptions(option);
				this._eventHandler();
				this._initAutoSlide();
			},
			_autoAnim: true,
			_initOptions: function (option) {
				this.defaults = $.extend({}, $.fn.guiCarousel.defaults, option);
			},
			_eventHandler: function () {
				var that = this;

				$(this.obj)
					.find('[data-slide=next]')
					.on("click", function (e) {

						e.preventDefault();

						var nextPram = that._calNextItemIndex();

						that._toSlide(nextPram.num, nextPram.dir, that);
						that._refreshIndicator(that);
					});

				$(this.obj)
					.hover(function () {
						that._autoAnim = false;
					}, function () {
						that._autoAnim = true;
					})
				$(this.obj)
					.find('[data-slide=prev]')
					.on("click", function (e) {

						e.preventDefault();

						var prevPram = that._calPrevItemIndex();

						that._toSlide(prevPram.num, prevPram.dir, that);
						that._refreshIndicator(that);
					});
				$(this.obj)
					.find(this.defaults.indicators + " li")
					.on("click", function (e) {

						var targetClicked = e.target;

						var nextPram = that._calIndicatorBtnIndex(targetClicked);
						var curItemIndex = that._getCurrentItemIndex();

						if(nextPram.num != curItemIndex){
							that._toSlide(nextPram.num, nextPram.dir, that);
							that._refreshIndicator(that);
						}
					})
			},
			_getCurrentItemIndex: function () {

				var curIndex = $(this.obj).find(".carousel-inner .active.item").index();

				return curIndex;
			},
			_calNextItemIndex: function () {

				var lastIndex = $(this.obj).find(".carousel-inner").find(".item").last().index();

				var nextIndex;

				if (this._getCurrentItemIndex() === lastIndex) {
					nextIndex = 0;
				} else {
					nextIndex = this._getCurrentItemIndex() + 1;
				}
				return {num: nextIndex, dir: "next"};
			},
			_calPrevItemIndex: function () {

				var lastIndex = $(this.obj).find(".carousel-inner").find(".item").last().index();

				var prevIndex;

				if (this._getCurrentItemIndex() === 0) {
					prevIndex = lastIndex;
				} else {
					prevIndex = this._getCurrentItemIndex() - 1;
				}
				return {num: prevIndex, dir: "prev"};
			},
			_calIndicatorBtnIndex: function (target) {

				var nextIndex = parseInt($(target).attr("data-slide-to"), 10);

				var curIndex = this._getCurrentItemIndex();

				var direction;

				if (nextIndex > curIndex) {
					direction = "next";
				} else {
					direction = "prev";
				}
				return {num: nextIndex, dir: direction};
			},
			_refreshIndicator: function (that) {

				$(that.obj)
					.find(".carousel-inner .active.item")
					.promise()
					.done(function () {

						var index = $(that.obj).find(".carousel-inner .prev.item ,.carousel-inner .next.item").index();

						$(that.obj)
							.find('.carousel-indicators li')
							.eq(index)
							.addClass("active")
							.siblings()
							.removeClass("active");
					})
			},
			_toSlide: function (num, dir, that) {
				var $activeObj = $(that.obj).find(".carousel-inner .active.item");
				var $otherObj = $(that.obj).find(".carousel-inner .item");

				if (!$activeObj.is(":animated")) {

					switch (dir) {
						case "next":

							$otherObj.eq(num).addClass("next").css({"left": "100%"});

							$activeObj.stop(false, true).animate(
								{"left": "-100%"}
								, "linear", function () {
									$activeObj.removeClass("active");
								});

							$otherObj.eq(num).stop(false, true).animate({
								"left": "0"
							}, "linear", function () {
								$otherObj.eq(num)
									.removeClass("next")
									.addClass("active");
							});

							break;
						case "prev":

							$otherObj.eq(num).addClass("prev").css({"left": "-100%"});

							$activeObj.stop(false, true).animate(
								{"left": "100%"}
								, "linear", function () {
									$activeObj.removeClass("active");
								});

							$otherObj.eq(num).stop(false, true).animate({
								"left": "0"
							}, "linear", function () {
								$otherObj.eq(num)
									.removeClass("prev")
									.addClass("active");
							});

							break;
					}
				}
			},
			_initAutoSlide: function () {
				var animTime = this.defaults.animTime;
				var autoSlide = this.defaults.autoSlide;
				var that = this;

				if (autoSlide) {
					var t = setInterval(function () {
						that._autoSlide()
					}, animTime);
				}
			},
			_autoSlide: function () {
				if (this._autoAnim) {
					$(this.obj)
						.find('[data-slide=prev]')
						.trigger("click");
				}
			}
		};

		//for debug
		if(option == 'debug'){
			return module;
		}

		return this.each(function () {
			module._init(this, option);
		});
	};

	$.fn.guiCarousel.defaults = {
		indicators: ".carousel-indicators",
		inner: ".carousel-inner",
		innerItem: ".item",
		prevBtn: ".carousel-control-left",
		nextBtn: ".carousel-control-right",
		animSpeed: 500,
		animTime: 5000,
		hoverToStop: true,
		autoSlide: true
	};

	$.fn.guiCarousel.noConflict = function () {
		$.fn.guiCarousel = old;
		return this;
	};

	//for debug
	//$.fn.guiCarousel.debug = module;

})(window);