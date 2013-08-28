(function (window) {
	"use strict";

	var document = window.document,
		console = window.console,
		$ = window.jQuery,
		gui = window.gui;

	$.fn.guiPopup = function (options) {

		var defaults = {
			animationDuration: 500,
			bgcolor: 'rgba(0,0,0,0.7)',
			bgWrapperClass: 'gui-popup-window',
			contentWrapperClass: 'gui-popup-content',
			contentNodeClass: 'gui-popup-content-node',
			closeBtnWrapperClass: 'gui-popup-closebtn',
			selector: '.',
			contentNodes: {
				text: 'JavaScript expressions can be evaluated as values inside .less files. We recommend using caution with this feature as the LESS will not be compilable by ports and it makes the LESS harder to maintain. If possible, try to think of a function that can be added to achieve the same purpose and ask for it on github. We have plans to allow expanding the default functions available. However, if you still want to use JavaScript in .less, this is done by wrapping the expression with back-ticks:'
			},
			closeBtn: {
				value: 'X',
				background: 'gray',
				fontColor: 'white',
				lineHeight: '100px',
				fontSize: 40,
				border: '1px solid #eee',
				width: 100,
				height: 100,
				position: 'absolute',
				top: -100,
				right: -100,
				cursor: 'pointer'
			}
		};

		options = $.extend({}, defaults, options);

		function initEach() {
			var $guiPopupBtn = $(this);

			var $guiPopupWindow = $(options.selector + options.bgWrapperClass);

			if ($guiPopupWindow.length < 1) {
				$('<div class="' + options.bgWrapperClass + '" style="display:none;">' +
					'<div class="' + options.contentWrapperClass + '">' +
					'<b class="' + options.closeBtnWrapperClass + '"></b>' +
					'<div class="' + options.contentNodeClass + '"></div>' +
					'</div>' +
					'</div>').appendTo($('body'));

				$guiPopupWindow = $(options.selector + options.bgWrapperClass);
				var $guiPopupContent = $(options.selector + options.contentWrapperClass),
					$guiPopupCloseBtn = $(options.selector + options.closeBtnWrapperClass);

				$guiPopupWindow.css({'background': options.bgcolor,
					'width': '100%',
					'height': 1000,
					'z-index': 9999,
					'position': 'absolute',
					'top': 0,
					'left': 0
				});
				$guiPopupContent.css({'min-width': 500,
					'max-width': 1000,
					'min-height': 500,
					'background': 'white',
					'margin': '5% auto 0',
					'position': 'relative'
				});
				$guiPopupCloseBtn.css({'width': options.closeBtn.width,
					'height': options.closeBtn.height,
					'display': 'block',
					'position': options.closeBtn.position,
					'top': options.closeBtn.top,
					'right': options.closeBtn.right,
					'background': options.closeBtn.background,
					'color': options.closeBtn.fontColor,
					'font-size': options.closeBtn.fontSize,
					'line-height': options.closeBtn.lineHeight,
					'cursor': options.closeBtn.cursor,
					'text-align':'center'
				})
					.text(options.closeBtn.value);
			}

			$guiPopupWindow = $(options.selector + options.bgWrapperClass);
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
	};

})(window);
