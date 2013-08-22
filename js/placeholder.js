(function (window, undefined) {
	"use strict";

	var console = window.console,
		$ = window.jQuery,
		grace = window.grace,
		old = $.fn.gracePlaceholder;

	$.fn.gracePlaceholder = function (option) {

		//define object
		var placeholder = {
			defaults: {
				labelText: [],
				labelMargin: '',
				labelTextAlign: 'left',
				labelOffset: {'top': 0, 'left': 0},
				labelTextIndent: '5px',
				animateSpeed: 300,
				inputType: 'input'
			},
			_init: function (obj) {
				$.extend(this.defaults, option);
				this._setInitialVarible(obj);
				this._addPlaceHolderElem();
				this._EventHandler();
				this._destroy();
			},
			_setInitialVarible: function (obj) {
				this.obj = obj;
				this.inputTextObj = this.obj.find(this.defaults.inputType);
			},
			_addPlaceHolderElem: function () {
				for (var i = 0; i < this.inputTextObj.length; i++) {
					this._calculateLabelPostion(i);
					this._getInputSize(i);
					this._getInputId(i);
					$('<label for=' + this._inputId.id + '></label>')
						.insertAfter(this.inputTextObj.eq(i))
						.text(this.defaults.labelText[i])
						.css({'width': this._inputSize.width,
							'height': this._inputSize.height,
							'left': this._labelPosition.left + this.defaults.labelOffset.left,
							'top': this._labelPosition.top + this.defaults.labelOffset.top,
							'margin': this.defaults.labelMargin ? this.defaults.labelMargin : this._inputSize.margin,
							'line-height': this._inputSize.height + 'px',
							'text-indent': this.defaults.labelTextIndent,
							'text-align': this.defaults.labelTextAlign,
							'cursor': 'text',
							'position': 'absolute'});
				}
			},
			_inputId: {},
			_getInputId: function (i) {
				this._inputId.id = this.inputTextObj.eq(i).attr('id');
				return this._inputId;//for unit test
			},
			_inputSize: {},
			_getInputSize: function (i) {
				this._inputSize.width = this.inputTextObj.eq(i).outerWidth();
				this._inputSize.height = this.inputTextObj.eq(i).outerHeight();
				this._inputSize.margin = this.inputTextObj.eq(i).css("margin");
				return this._inputSize;//for unit test
			},
			_wrapperPosition: {},
			_getParentPostion: function () {
				this._wrapperPosition.left = this.obj.offset().left;
				this._wrapperPosition.top = this.obj.offset().top;
				return this._wrapperPosition;//for unit test
			},
			_labelPosition: {},
			_calculateLabelPostion: function (i) {
				this._getParentPostion();
				var inputNodes = this.inputTextObj;
				var inputLeft = inputNodes.eq(i).offset().left;
				var inputTop = inputNodes.eq(i).offset().top;
				var inputMarginTop = parseInt(inputNodes.eq(i).css('margin-top'), 10);
				var inputMarginLeft = parseInt(inputNodes.eq(i).css('margin-left'), 10);
				this._labelPosition.left = Math.abs(this._wrapperPosition.left - inputLeft + inputMarginLeft);
				this._labelPosition.top = Math.abs(this._wrapperPosition.top - inputTop + inputMarginTop);
				return this._labelPosition;//for unit test
			},
			_EventHandler: function () {
				var defaults = this.defaults;
				this.obj.delegate('label', 'mousedown', function (e) {
					e.preventDefault();
				});
				this.obj.delegate(this.defaults.inputType, 'focus', function () {
					$(this).parent().find('label').eq($(this).index(this.inputType)).stop(true, true).fadeOut(defaults.animateSpeed);
				});
				this.obj.delegate(this.defaults.inputType, 'blur', function () {
					if($(this).val() == ''){
						$(this).parent().find('label').eq($(this).index(this.inputType)).stop(true, true).fadeIn(defaults.animateSpeed);
					}
				});
			},
			_destroy: function () {
				delete this._inputId,
					this._inputSize,
					this._wrapperPosition,
					this._labelPosition;
			}
		}

		//$.extend({},placeholder.defaults, option);

		placeholder._init(this);

		return this;
	}

	$.fn.gracePlaceholder.noConflict = function () {
		$.fn.gracePlaceholder = old;
		return this;
	};

})(window);
