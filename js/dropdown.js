(function (window) {
	"use strict";

	var console = window.console,
		$ = window.jQuery,
		gui = window.gui,
		old = $.fn.guiDropdown;

	var Module = function(obj,option){
		this._init(obj,option);
	}

	Module.prototype = {
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

			$(this.obj).find(".dropdown-toggle span").text($(this.obj).find(".dropdown-list li.default").text());

		},
		_toggleList : function(e){

			var $parent = $(this.obj).find(".dropdown-list");

			$parent.addClass("focus");

			$(".dropdown-list").not(".focus").hide();

			if($parent.is(":visible")){
				$parent.hide();

				$(this.obj).find(".dropdown-toggle").removeClass("dropdown-toggle-open");
			}else{
				$parent.show();

				$(this.obj).find(".dropdown-toggle").addClass("dropdown-toggle-open");
			}
			$parent.removeClass("focus");
		},
		_hideList : function(){

			$(".dropdown-list").hide();

			$(".dropdown-toggle").removeClass("dropdown-toggle-open");

		},
		_changeCurList : function(e){

			var txt = $(e.target).text();

			$(this.obj).find(".dropdown-toggle span").text(txt);

			this._hideList();
		},
		_eventHandler : function(){
			var that = this;

			$(this.obj)
				.on('click.gui.dropdown.data-api',function(e){e.stopPropagation();})
				.on('click.gui.dropdown.data-api',".dropdown-toggle",function(e){that._toggleList(e);})
				.on('click.gui.dropdown.data-api',".dropdown-list a",function(e){that._changeCurList(e);})
				.on('mouseover.gui.dropdown.data-api',".dropdown-list a",function(e){$(this).parent().addClass("active")})
				.on('mouseout.gui.dropdown.data-api',".dropdown-list a",function(e){$(".dropdown-list li").removeClass("active")})
		}
	}

	$.fn.guiDropdown = function (option) {

		return this.each(function () {
			new Module(this,option);
		});
	}

	$(document).on('click.gui.dropdown.data-api',function(){Module.prototype._hideList();})

	$.fn.guiDropdown.defaults = {
		
	};

	$.fn.guiDropdown.Constructor = Module;

	$.fn.guiDropdown.noConflict = function () {
		$.fn.guiDropdown = old;
		return this;
	};
})(window);