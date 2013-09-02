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

	/*$.fn.guiCollapse = function (options) {

		var defaults = {
			switchBtnClass:'.tab-btn',
			switchBtnToggleClass:'tab-btn-closed',
			switchTabClass:'.tab-content',
			animationDuration: 500
		};

		options = $.extend({}, defaults, options);

		function initEach() {
			var $guiCollapse = $(this);
			
			$guiCollapse.find(options.switchBtnClass).each(function(){
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
						$(this).removeClass(options.switchBtnToggleClass);
					}else{
						tabContent.animate({'height':0,'opacity': 0},options.animationDuration);
						$(this).addClass(options.switchBtnToggleClass);
					}
				});
			});
		}

		return this.each(initEach);
	};*/
	
	var module = {
		_init : function(obj,option){
			this.obj = obj;
			this._initOptions(option);
			this._recordEleHeight();
			this._eventHandler();
		},
		orgHeight : [],
		//good
		_initOptions : function(option){
			this.defaults = $.extend({},$.fn.guiCollapse.defaults,option);
		},
		_recordEleHeight : function(){
			var mo = this;
			this.obj
				.find('.' + this.defaults.switchTabClass)
				.each(function(i){
					if(!$(this).is(":visible")){
						$(this).show();
						mo.orgHeight[i] = $(this).height();
						$(this).hide();
					}else{
						mo.orgHeight[i] = $(this).height();
					}
			});
			return mo.orgHeight;
		},
		_eventHandler : function(){
			var mo = this;
			this.obj
				.find('.' + this.defaults.switchBtnClass)
				.each(function(i){
					$(this).click(function(e){
						//var tabIndex = $(e.target).eq(i);

						var curHeight = $(this).siblings('.' + mo.defaults.switchTabClass).height();
						var tabContent = $(this).siblings('.' + mo.defaults.switchTabClass);

						var animspeed = mo.defaults.animationDuration;
						var toggleClass = mo.defaults.switchBtnToggleClass;
						
						if(curHeight <= 0 || tabContent.is(":hidden")){
							tabContent.css({display:"block", height:0,opacity:0}).animate({'height': mo.orgHeight[i],'opacity': 1},animspeed);
							$(this).removeClass(toggleClass);
						}else{
							tabContent.animate({'height':0,'opacity': 0},animspeed);
							$(this).addClass(toggleClass);
						}
					});
				});
		}
	}
	
	$.fn.guiCollapse = function(option) {
		
		module._init(this,option);
		
		return this.each(function(){});
	}
	
	$.fn.guiCollapse.defaults = {
		switchBtnClass:'tab-btn',
		switchBtnToggleClass:'tab-btn-closed',
		switchTabClass:'tab-content',
		animationDuration: 500
	};

	$.fn.guiCollapse.noConflict = function () {
		$.fn.guiCollapse = old;
		return this;
	};

	//for debug
	$.fn.guiCollapse.debug = module;

})(window);
