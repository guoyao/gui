(function (window) {
	"use strict";

	var document = window.document,
		console = window.console,
		$ = window.jQuery,
		grace = window.grace;

	$.fn.graceCollapse = function (options) {

		var defaults = {
			switchBtnClass:'.tab-btn',
			switchTabClass:'.tab-content',
			animationDuration: 500
		};

		options = $.extend({}, defaults, options);

		function initEach() {
			var $graceCollapse = $(this);
			
			$graceCollapse.find(options.switchBtnClass).each(function(){
				var tabContent = $(this).siblings(options.switchTabClass);
				var orgHeight;
				if(!tabContent.is(":visible")){
					tabContent.show();
					orgHeight = tabContent.height();
					tabContent.hide();
				}else{
					orgHeight = tabContent.height();
				}
				$(this).click(function(){
					var curHeight = $(this).siblings(options.switchTabClass).height();
					if(curHeight <= 0 || tabContent.is(":hidden")){
						tabContent.css({display:"block", height:0,opacity:0}).animate({'height': orgHeight,'opacity': 1},options.animationDuration);
					}else{
						tabContent.animate({'height':0,'opacity': 0},options.animationDuration);
					}
				});
			});
		}

		return this.each(initEach);
	};

})(window);
