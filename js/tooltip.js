(function (window) {
	"use strict";

	var console = window.console,
		$ = window.jQuery,
		gui = window.gui,
		old = $.fn.guiTooltip;

	var Module = function (obj, option) {
		this._init(obj, option);
	}

	Module.prototype = {
		_init: function (obj, option) {
				this.obj = obj;
			this._eventHandler();
		},
		_initOptions: function (option) {
			this.defaults = $.extend({}, $.fn.guiTooltip.defaults, option);
		},
		_eventHandler: function () {
			var that = this;

			$(this.obj).on("mouseover", function (e) {

				if (that._judgeTooltipNode(e)) {

					var $TooltipWp = that._appendTooltip(e);

					that._setTooltipPos(e, $TooltipWp);
				}

				$(this)
					.next(".tooltip")
					.stop()
					.fadeIn();
			});

			$(this.obj).on("mouseout", function (e) {
				$(this)
					.next(".tooltip")
					.fadeOut()
			});
		},
		_judgeTooltipNode: function (e) {
			return $(e.target).next('.tooltip').length === 0;
		},
		_appendTooltip: function (e) {

			var direction;

			if ($(e.target).attr("data-placement") !== undefined) {
				direction = $(e.target).attr("data-placement");
			} else {
				direction = "top";
			}

			var $TooltipWp = $('<div class="tooltip"></div>');

			var $TooltipArrow = $('<div class="tooltip-arrow ' + direction + '"></div>');

			var $TooltipInner = $('<div class="tooltip-inner">' + $(e.target).attr("data-original-title") + '</div>');

			$TooltipWp.append($TooltipArrow).append($TooltipInner);

			$TooltipWp.insertAfter($(e.target));

			return $TooltipWp;

		},
		_setTooltipPos: function (e, tooltipEle) {

			var pos = this._calTooltipPos(e, tooltipEle);

			tooltipEle.css({"left": pos.left, "top": pos.top});

		},
		_calTooltipPos: function (e, tooltipEle) {
			var parentOffset = $(this.obj).offsetParent().offset();

			var targetOffset = $(e.target).offset();

			var tooltipOrgEleWidth = $(e.target).outerWidth();
			var tooltipOrgEleHeight = $(e.target).outerHeight();

			var w = tooltipEle.outerWidth();
			var h = tooltipEle.outerHeight();

			var direction = $(e.target).attr('data-placement');

			var calculatedLeft,
				calculatedTop;

			switch (direction) {
				case "top":
					calculatedLeft = Math.abs(parentOffset.left - targetOffset.left) + tooltipOrgEleWidth / 2 - w / 2;
					calculatedTop = Math.abs(parentOffset.top - targetOffset.top) - h;
					break;
				case "right":
					calculatedLeft = Math.abs(parentOffset.left - targetOffset.left) + tooltipOrgEleWidth;
					calculatedTop = Math.abs(parentOffset.top - targetOffset.top) + tooltipOrgEleHeight / 2 - h / 2;
					break;
				case "bottom":
					calculatedLeft = Math.abs(parentOffset.left - targetOffset.left) + tooltipOrgEleWidth / 2 - w / 2;
					calculatedTop = Math.abs(parentOffset.top - targetOffset.top) + tooltipOrgEleHeight;
					break;
				case "left":
					calculatedLeft = Math.abs(parentOffset.left - targetOffset.left) - w;
					calculatedTop = Math.abs(parentOffset.top - targetOffset.top) + tooltipOrgEleHeight / 2 - h / 2;
					break;
				default:
					calculatedLeft = Math.abs(parentOffset.left - targetOffset.left) + tooltipOrgEleWidth / 2 - w / 2;
					calculatedTop = Math.abs(parentOffset.top - targetOffset.top) - h;
					break;
			}
			return {left: calculatedLeft, top: calculatedTop}
		}
	}

	$.fn.guiTooltip = function (option) {
		return this.each(function () {
			new Module(this, option);
		});
	}

	$.fn.guiTooltip.defaults = {

	};

	$.fn.guiTooltip.Constructor = Module;

	$.fn.guiTooltip.noConflict = function () {
		$.fn.guiTooltip = old;
		return this;
	};
})(window);
