(function (window) {
	"use strict";

	var document = window.document,
		console = window.console,
		$ = window.jQuery,
		grace = window.grace;

	$.fn.gracePopup = function (options) {

		var defaults = {
			animationDuration: 500,
			bgcolor: 'rgba(0,0,0,0.7)',
			bgWrapperClass: 'grace-popup-window',
			contentWrapperClass: 'grace-popup-content',
			contentNodeClass: 'grace-popup-content-node',
			closeBtnWrapperClass: 'grace-popup-closebtn',
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
			var $gracePopupBtn = $(this);

			var $gracePopupWindow = $(options.selector + options.bgWrapperClass);

			if ($gracePopupWindow.length < 1) {
				$('<div class="' + options.bgWrapperClass + '" style="display:none;">' +
					'<div class="' + options.contentWrapperClass + '">' +
					'<b class="' + options.closeBtnWrapperClass + '"></b>' +
					'<div class="' + options.contentNodeClass + '"></div>' +
					'</div>' +
					'</div>').appendTo($('body'));

				$gracePopupWindow = $(options.selector + options.bgWrapperClass);
				var $gracePopupContent = $(options.selector + options.contentWrapperClass),
					$gracePopupCloseBtn = $(options.selector + options.closeBtnWrapperClass);

				$gracePopupWindow.css({'background': options.bgcolor,
					'width': '100%',
					'height': 1000,
					'z-index': 9999,
					'position': 'absolute',
					'top': 0,
					'left': 0
				});
				$gracePopupContent.css({'min-width': 500,
					'max-width': 1000,
					'min-height': 500,
					'background': 'white',
					'margin': '5% auto 0',
					'position': 'relative'
				});
				$gracePopupCloseBtn.css({'width': options.closeBtn.width,
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

			$gracePopupWindow = $(options.selector + options.bgWrapperClass);
			//$gracePopupContent = $(options.selector + options.contentWrapperClass),
			var $regetGracePopupCloseBtn = $(options.selector + options.closeBtnWrapperClass);
			var $gracePopupContentNode = $(options.selector + options.contentNodeClass);

			$gracePopupBtn.click(function () {
				//var dataurl = $gracePopupBtn.attr('data-url');
				$gracePopupWindow.fadeIn(options.animationDuration);
				$gracePopupContentNode.html(options.contentNodes.text);
			});
			$regetGracePopupCloseBtn.click(function () {
				$gracePopupWindow.fadeOut();
			});
		}

		return this.each(initEach);
	};

})(window);
