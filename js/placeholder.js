(function (window, undefined) {
	"use strict";

	var console = window.console,
		$ = window.jQuery,
		gui = window.gui,
		old = $.fn.guiPlaceholder;

	var module = function(obj,option){
		this._init(obj,option);
	}

	module.prototype = {
		_inputSize: {},
		_wrapperPosition: {},
		_labelPosition: {},
		_init: function (obj,option) {
			this.obj = obj;
			this._initOptions(option);
			this._getInputPlaceTxt();
			this._addPlaceHolderElem();
			this._EventHandler();
		},
		_initOptions : function(option){
			this.defaults = $.extend({},$.fn.guiPlaceholder.defaults, option);
		},
		_getInputPlaceTxt : function(){
			this.inputPlaceTxt = $(this.obj).attr("data-default-text");
		},
		_getInputId: function () {
			this._inputId = $(this.obj).attr('id');
		},
		_addPlaceHolderElem: function () {
			this._getParentPostion();
			this._calculateLabelPostion();
			this._getInputSize();
			this._getInputId();
			$('<label for=' + this._inputId + '></label>')
				.insertAfter($(this.obj))
				.text(this.inputPlaceTxt)
				.css({
					'width': this._inputSize.width,
					'height': this._inputSize.height,
					'left': this._labelPosition.left + this.defaults.labelOffset.left,
					'top': this._labelPosition.top + this.defaults.labelOffset.top,
					'line-height': this._inputSize.height + 'px',
					'text-indent': this.defaults.labelTextIndent,
					'text-align': this.defaults.labelTextAlign,
					'cursor': 'text',
					'position': 'absolute'
				});
		},
		_getInputSize: function () {
			this._inputSize.width = $(this.obj).outerWidth();
			this._inputSize.height = $(this.obj).outerHeight();
		},
		_getParentPostion: function () {
			this._wrapperPosition.left = $(this.obj).offsetParent().offset().left;
			this._wrapperPosition.top = $(this.obj).offsetParent().offset().top;
		},
		_calculateLabelPostion: function () {
			var inputLeft = $(this.obj).offset().left;
			var inputTop = $(this.obj).offset().top;
			var inputMarginTop = parseInt($(this.obj).css('margin-top'), 10);
			var inputMarginLeft = parseInt($(this.obj).css('margin-left'), 10);

			this._labelPosition.left = Math.abs(this._wrapperPosition.left - inputLeft + inputMarginLeft);
			this._labelPosition.top = Math.abs(this._wrapperPosition.top - inputTop + inputMarginTop);
		},
		_EventHandler: function () {
			var that = this;

			$(this.obj).on("focus",function(){
				$(this)
					.next("label")
					.stop(true, true)
					.fadeOut(that.defaults.animateSpeed);
			});

			$(this.obj).on("blur",function(){
				if($(this).val() === ''){
					$(this)
						.next("label")
						.stop(true, true)
						.fadeIn(that.defaults.animateSpeed);
				}
			});
		}
	};

	$.fn.guiPlaceholder = function (option) {
		return this.each(function(){
			new module(this,option);
		});
	};

	$.fn.guiPlaceholder.defaults = {
		labelTextAlign: 'left',
		labelOffset: {'top': 0, 'left': 0},
		labelTextIndent: '5px',
		animateSpeed: 300
	};

	$.fn.guiPlaceholder.Constructor = module;

	$.fn.guiPlaceholder.noConflict = function () {
		$.fn.guiPlaceholder = old;
		return this;
	};

})(window);
