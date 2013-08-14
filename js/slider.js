(function (window) {
	"use strict";

	var document = window.document,
		console = window.console,
		$ = window.jQuery,
		grace = window.grace;

	$.fn.graceSlider = function (options) {

		var defaults = {
			range:true,
			rangebar:false,
			step:1,
			minclass:'btn-1',
			maxclass:'btn-2'
		};

		options = $.extend({}, defaults, options);

		function initEach() {
			var $graceSlider = $(this);

			var dataDemo = {date:['09/01','09/03','09/04','09/05','09/06','09/07','09/01','09/03','09/04','09/06','09/07','09/01','09/03']};

			//inital event handler
			var mousedownIndicator = false;
			var orgX,
				curX,
				//curLeft,
				indicator = false,
				objOrgLeft;

			$graceSlider.find('.btn-1').mousedown(function(e){
				mousedownIndicator = true;
				orgX = e.pageX;
				objOrgLeft = _getElementLeft($('.btn-1')) /  _getElementWidth($('.range-selector-btn')) + "%";

			});
			$graceSlider.find('.btn-1').mousemove(function(e){
				curX = e.pageX;
				if(indicator) {
					if(Math.abs(orgX - curX) > options.step){

					}
				}
			});

			var _getElementLeft = function(obj){
				var left  = parseInt(obj.css("left"));
				return left;
			}
			var _getElementWidth = function(obj){
				var width = parseInt(obj.css("width"));
				return width;
			}
		}

		return this.each(initEach);
	};

})(window);
