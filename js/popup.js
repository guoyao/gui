(function (window) {
	"use strict";

	var console = window.console,
		$ = window.jQuery,
		gui = window.gui,
		old = $.fn.guiPopup;

	$.fn.guiPopup = function (option) {

		var module = {
			_init : function(obj,option){
				this.obj = obj;
				this._initOptions(option);
				this._appendPopup();
				this._eventHandler();
			},
			_initOptions: function (option) {
				this.defaults = $.extend({}, $.fn.guiPopup.defaults, option);
			},
			_appendPopup : function(){
				if($('.' + this.defaults.mainWrapperClass).length === 0){
					$('<div class="' + this.defaults.mainWrapperClass + '">' +
					'<div class="' + this.defaults.contentWrapperClass + '">' +
					'<b class="' + this.defaults.closeBtnWrapperClass + '"></b>' +
					'<div class="' + this.defaults.contentNodeClass + '"></div>' +
					'</div>' +
					'<div class="'+ this.defaults.mainBgClass +'"></div>' +
					'</div>').appendTo(this.defaults.wrapper);
				}
			},
			_setAttributes : function(){
				$guiPopupWindow = $('.' + this.defaults.mainWrapperClass);
				var $guiPopupContent = $('.' + this.defaults.contentWrapperClass),
					$guiPopupCloseBtn = $('.' + this.defaults.closeBtnWrapperClass),
					$guiPopupWindowBg = $('.' + this.defaults.mainBgClass);

				var visibleBody = document.documentElement.clientHeight;
				var bodyHeight = document.body.scrollHeight;//document.body.clientHeight;
				var popWindowHeight = bodyHeight;

				if(visibleBody > bodyHeight){
					popWindowHeight = visibleBody;
				}
				//alert(document.body.scrollHeight)
				//console.log(visibleBody , bodyHeight , document.body.scrollHeight)

				$guiPopupWindow.css({
					'height': popWindowHeight
				});

				$guiPopupWindowBg.css({
					'height': popWindowHeight
				});

				$guiPopupCloseBtn.text(this.defaults.closeBtn.value);
			},
			_eventHandler : function(){

				var that = this;
				var $guiPopupCloseBtn = $('.' + this.defaults.closeBtnWrapperClass);

				var $guiPopupWindow = $('.' + this.defaults.mainWrapperClass);
				var $guiPopupContent = $('.' + this.defaults.contentWrapperClass);
				var $regetGuiPopupCloseBtn = $('.' + this.defaults.closeBtnWrapperClass);
				var $guiPopupContentNode = $('.' + this.defaults.contentNodeClass);

				$(this.obj).click(function () {
					that._setAttributes();
					//var dataurl = $guiPopupBtn.attr('data-url');
					$guiPopupWindow.fadeIn(that.defaults.animationDuration);
					$guiPopupContentNode.html(that.defaults.contentNodes.text);

				});
				$regetGuiPopupCloseBtn.click(function () {
					$guiPopupWindow.fadeOut();
				});
			}
		}
		if (option == 'debug') {
			//for debug
			return module;
		}
		return this.each(function () {
			module._init(this, option);
		});
	}

		/*var defaults = {
			animationDuration: 500,
			bgcolor: 'rgba(0,0,0,0.7)',
			mainWrapperClass: 'gui-popup-window',
			contentWrapperClass: 'gui-popup-content',
			contentNodeClass: 'gui-popup-content-node',
			closeBtnWrapperClass: 'gui-popup-closebtn',
			mainBgClass: 'gui-popup-bg',
			selector: '.',
			contentNodes: {
				text: 'JavaScript expressions can be evaluated as values inside .less files. We recommend using caution with this feature as the LESS will not be compilable by ports and it makes the LESS harder to maintain. If possible, try to think of a function that can be added to achieve the same purpose and ask for it on github. We have plans to allow expanding the default functions available. However, if you still want to use JavaScript in .less, this is done by wrapping the expression with back-ticks:'
			},
			closeBtn: {
				value: 'X',
			}
		};

		//options = $.extend({}, defaults, options);

		function initEach() {
			var $guiPopupBtn = $(this);

			var $guiPopupWindow = $(options.selector + options.mainWrapperClass);

			//$("body").css({"position":"relative"});

			if ($guiPopupWindow.length === 0) {
				$('<div class="' + options.mainWrapperClass + '">' +
					'<div class="' + options.contentWrapperClass + '">' +
					'<b class="' + options.closeBtnWrapperClass + '"></b>' +
					'<div class="' + options.contentNodeClass + '"></div>' +
					'</div>' +
					'<div class="'+ options.mainBgClass +'"></div>' +
					'</div>').appendTo($('body'));

				$guiPopupWindow = $(options.selector + options.mainWrapperClass);
				var $guiPopupContent = $(options.selector + options.contentWrapperClass),
					$guiPopupCloseBtn = $(options.selector + options.closeBtnWrapperClass),
					$guiPopupWindowBg = $(options.selector + options.mainBgClass);

				var visibleBody = document.documentElement.clientHeight;
				var bodyHeight = document.body.clientHeight;
				var popWindowHeight = bodyHeight;

				if(visibleBody > bodyHeight){
					popWindowHeight = visibleBody;
				}

				$guiPopupWindow.css({
					'height': popWindowHeight//$("body")[0].scrollHeight,//document.documentElement.scrollTop
				});
				
				$guiPopupContent.css({

				});
				//$(".gui-popup-bg").css('height',$("body")[0].scrollHeight)
				$guiPopupWindowBg.css({
					'height': popWindowHeight
				});

				$guiPopupCloseBtn.css({
					
				})
					.text(options.closeBtn.value);
			}

			$guiPopupWindow = $(options.selector + options.mainWrapperClass);
			//$guiPopupContent = $(options.selector + options.contentWrapperClass),
			var $regetGuiPopupCloseBtn = $(options.selector + options.closeBtnWrapperClass);
			var $guiPopupContentNode = $(options.selector + options.contentNodeClass);

			$guiPopupBtn.click(function () {
				//var dataurl = $guiPopupBtn.attr('data-url');
				$guiPopupWindow.fadeIn(options.animationDuration);
				$guiPopupContentNode.html(options.contentNodes.text);

			});
			$regetGuiPopupCloseBtn.click(function () {
				$guiPopupWindow.fadeOut();
			});
		}
		return this.each(initEach);
	};*/

	$.fn.guiPopup.defaults = {
		animationDuration: 500,
		bgcolor: 'rgba(0,0,0,0.7)',
		mainWrapperClass: 'gui-popup-window',
		contentWrapperClass: 'gui-popup-content',
		contentNodeClass: 'gui-popup-content-node',
		closeBtnWrapperClass: 'gui-popup-closebtn',
		mainBgClass: 'gui-popup-bg',
		selector: '.',
		wrapper:'body',
		contentNodes: {
			text: 'JavaScript expressions can be evaluated as values inside .less files. We recommend using caution with this feature as the LESS will not be compilable by ports and it makes the LESS harder to maintain. If possible, try to think of a function that can be added to achieve the same purpose and ask for it on github. We have plans to allow expanding the default functions available. However, if you still want to use JavaScript in .less, this is done by wrapping the expression with back-ticks:'
		},
		closeBtn: {
			value: 'X'
		}
	};

	$.fn.guiPopup.noConflict = function () {
		$.fn.guiPopup = old;
		return this;
	};

})(window);
