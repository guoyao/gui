/**
 * Author: alfredzh
 * Time: 08-13-2013 10:38
 */

(function (window) {
	"use strict";

	var console = window.console,
		$ = window.jQuery,
		gui = window.gui,
		old = $.fn.guiCollapse;

	var module = {
		_init: function (obj, option) {
			this.obj = obj;
			this._initOptions(option);
			this._recordEleHeight();
			this._eventHandler();
		},
		orgHeight: [],
		//
		_initOptions: function (option) {
			this.defaults = $.extend({}, $.fn.guiCollapse.defaults, option);
		},
		_recordEleHeight: function () {
			var mo = this;
			$(this.obj)
				.find('.' + this.defaults.switchTabClass)
				.each(function (i) {
					if (!$(this).is(":visible")) {
						$(this).show();
						mo.orgHeight[i] = $(this).height();
						$(this).hide();
					} else {
						mo.orgHeight[i] = $(this).height();
					}
				});
			return mo.orgHeight;
		},
		_eventHandler: function () {
			var mo = this;
			$(this.obj)
				.find('.' + this.defaults.switchBtnClass)
				.each(function (i) {
					$(this).click(function (e) {
						//var tabIndex = $(e.target).eq(i);

						var curHeight = $(this).siblings('.' + mo.defaults.switchTabClass).height();
						var tabContent = $(this).siblings('.' + mo.defaults.switchTabClass);

						var animspeed = mo.defaults.animationDuration;
						var toggleClass = mo.defaults.switchBtnToggleClass;

						if (curHeight <= 0 || tabContent.is(":hidden")) {
							tabContent
								.css({display: "block", height: 0, opacity: 0})
								.animate({'height': mo.orgHeight[i], 'opacity': 1}, animspeed);
							$(this).removeClass(toggleClass);
						} else {
							tabContent
								.animate({'height': 0, 'opacity': 0}, animspeed);
							$(this).addClass(toggleClass);
						}
					});
				});
		}
	}

	$.fn.guiCollapse = function (option) {

		return this.each(function () {
			module._init(this, option);
		});
	}

	$.fn.guiCollapse.defaults = {
		switchBtnClass: 'tab-btn',
		switchBtnToggleClass: 'tab-btn-closed',
		switchTabClass: 'tab-content',
		animationDuration: 500
	};

	//for debug
	$.fn.guiCollapse.debug = module;

	$.fn.guiCollapse.noConflict = function () {
		$.fn.guiCollapse = old;
		return this;
	};
})(window);
