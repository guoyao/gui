(function (window) {
	"use strict";

	var console = window.console,
		$ = window.jQuery,
		gui = window.gui,
		old = $.fn.guiDropdown;

	var module = function(obj,option){
		this._init(obj,option);
	}

	module.prototype = {
		_init : function(obj,option){
			this.obj = obj;
			this._initOptions(option);
			this._defaultList();
			this._eventHandler();
		},
		_initOptions : function (option) {
			this.defaults = $.extend({}, $.fn.guiDropdown.defaults, option);
		},
		_defaultList : function(){

			$(this.obj).find(".dropdown-toggle").text($(this.obj).find(".dropdown-list li.default").text());

			if(this.defaults.caret === true){
				$('<span class="caret">')
					.appendTo($(this.obj).find(".dropdown-toggle"));
			}
		},
		_toggleList : function(e){
			var $parent = $(e.target).parent(".dropdown").find(".dropdown-list");
			if($parent.is(":hidden")){
				$parent.show();
			}else{
				$parent.hide();
			}
		},
		_hideList : function(){
			$(".dropdown-list").hide();
		},
		_changeCurList : function(e){
			var txt = $(e.target).text();

			$(this.obj).find(".dropdown-toggle").text(txt);

			if(this.defaults.caret === true){
				$('<span class="caret">')
					.appendTo($(this.obj).find(".dropdown-toggle"));
			}

			this._hideList();
		},
		_eventHandler : function(){
			var that = this;

			$(document)
				.on('click.gui.dropdown.data-api',this._hideList)
				.on('click.gui.dropdown.data-api',".dropdown",function(e){e.stopPropagation()})
				.on('click.gui.dropdown.data-api',".dropdown",function(e){that._toggleList(e);})
				.on('click.gui.dropdown.data-api',".dropdown-list a",function(e){that._changeCurList(e);})
		}
	}

	$.fn.guiDropdown = function (option) {

		return this.each(function () {
			new module(this,option);
			//module._init(this, option);
		});
	}

	$.fn.guiDropdown.defaults = {
		caret : true
	};

	$.fn.guiDropdown.Constructor = module;

	$.fn.guiDropdown.noConflict = function () {
		$.fn.guiDropdown = old;
		return this;
	};
})(window);