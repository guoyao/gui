
(function (window) {
	"use strict";

	var console = window.console,
		$ = window.jQuery,
		gui = window.gui,
		old = $.fn.guiTooltip;

	$.fn.guiTooltip = function (option) {

		var module = {
			_init : function (obj, option) {
				this.obj = obj;
				this._eventHandler();
			},
			_initOptions : function (option) {
				this.defaults = $.extend({}, $.fn.guiCollapse.defaults, option);
			},
			_findTooltipEle : function(){
				var $tooltipEle = $(this.obj).find("[data-toggle=tooltip]");
				return $tooltipEle;
			},
			_eventHandler : function(){
				var that = this;

				$(this.obj).on("mouseover","[data-toggle=tooltip]",function(e){

					that._appendTooltip(e);

					$(e.target)
						.next(".tooltip")
						.stop()
						.animate({"opacity":1});
				});
				
				$(this.obj).on("mouseout","[data-toggle=tooltip]",function(e){
					$(e.target)
						.next(".tooltip")
						.animate({"opacity":0},function(){$(this).remove()});
				});
			},
			_appendTooltip : function(e){
				if($(e.target).next('.tooltip').length === 0){

					var direction;

					if($(e.target).attr("data-placement") !== undefined){
						direction = $(e.target).attr("data-placement");
					}else{
						direction = "top";
					}

						var $TooltipWp = $('<div class="tooltip"></div>');

						var $TooltipArrow = $('<div class="tooltip-arrow '+ direction +'"></div>');

						var $TooltipInner = $('<div class="tooltip-inner">'+ $(e.target).attr("data-original-title") + '</div>');

						$TooltipWp.append($TooltipArrow).append($TooltipInner);

						$TooltipWp.insertAfter($(e.target));

						this._setTooltipPos(e,$TooltipWp);
				}
			},
			_setTooltipPos : function(e,tooltipEle){

				var pos = this._calTooltipPos(e,tooltipEle);

				tooltipEle.css({"left":pos.left,"top":pos.top});

			},
			_calTooltipPos : function(e,tooltipEle){
				var parentOffset = $(this.obj).offset();

				var targetOffset = $(e.target).offset();

				var tooltipOrgEleWidth = $(e.target).width();
				var tooltipOrgEleHeight = $(e.target).height();

				var w = tooltipEle.outerWidth();
				var h = tooltipEle.outerHeight();

				var direction = $(e.target).attr('data-placement');

				var calculatedLeft,
					calculatedTop;

				switch (direction){
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
				};
				return {left:calculatedLeft,top:calculatedTop}
			}
		}
		return this.each(function () {
			module._init(this, option);
		});
	}

	$.fn.guiTooltip.defaults = {
		
	};

	//for debug
	//$.fn.guiTooltip.debug = module;

	$.fn.guiTooltip.noConflict = function () {
		$.fn.guiTooltip = old;
		return this;
	};
})(window);
