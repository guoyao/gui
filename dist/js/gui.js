/**
* gui.js v0.1.0 by @guoyao
* Copyright 2013 Guoyao Wu
* A Graceful And Cross Browser Web UI Framework
* http://www.gui.guoyao.me/
* http://www.apache.org/licenses/LICENSE-2.0
*/
if (!jQuery) { throw new Error("GUI requires jQuery") }

/* ========================================================================
 * GUI: helper.js v0.1.0
 * http://www.gui.guoyao.me/
 * ========================================================================
 * Copyright 2013 Guoyao Wu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */

(function (window) {
    "use strict";

    var console = window.console,
        $ = window.jQuery;

    if (!!console) {
        if (!console.log) {
            console.log = function (value) {
                alert(value);
            };
        }
        if (!console.debug) {
            console.debug = function (value) {
                console.log(value);
            }
        }
    } else {
        console = {
            log: function (value) {
                alert(value);
            },
            debug: function (value) {
                alert(value);
            }
        };
        window.console = console;
    }

    var gui = (function () {
        var browserInfo = {
                isIE: $.browser.msie,
                version: (function () {
                    var version = Number($.browser.version);
                    if (!!document.documentMode) {
                        return Math.min(version, Number(document.documentMode));
                    }
                    return version;
                })()
            },
            plugin = {
                patch: function (plugin, $$elements, option) {
                    if (browserInfo.isIE && !!plugin && $.isFunction(plugin.iePatch)) {
                        plugin.iePatch($$elements, option);
                    }
                    return $$elements;
                },
                isPluginMethodCall: function (option) {
                    return typeof option === "string";
                },
                isPluginInitialize: function (option) {
                    return option === undefined || option === null || typeof option === "object";
                }
            };

        function showHide($element, show, speed, callback) {
            if (show) {
                $element.slideDown(speed, callback);
            } else {
                $element.hide(speed, callback);
            }
        }

        function htmlEncode(str) {
            var div = document.createElement("div");
            div.appendChild(document.createTextNode(str));
            return div.innerHTML;
        }

        function htmlDecode(str) {
            var div = document.createElement("div");
            div.innerHTML = str;
            return div.innerHTML;
        }

        // ratio should be 0..1
        function darken(color, ratio) {
            var red, green, blue, alpha, rgb, hex, dotIndex = -1;
            if (color.indexOf("rgb") != -1) {
                rgb = color.replace('rgb(', '').replace(')', '').split(',');
                red = parseInt($.trim(rgb[0]) * (1 - ratio), 10);
                green = parseInt($.trim(rgb[1]) * (1 - ratio), 10);
                blue = parseInt($.trim(rgb[2]) * (1 - ratio), 10);
                red = red > 255 ? 255 : red;
                green = green > 255 ? 255 : green;
                blue = blue > 255 ? 255 : blue;
                color = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
                if (rgb.length > 3) {
                    alpha = parseFloat($.trim(rgb[3]));
                    alpha = alpha > 1 ? 1 : alpha;
                    color = 'rgb(' + red + ', ' + green + ', ' + blue + ', ' + alpha + ')';
                }
            } else if(color.indexOf("#") != -1) {
                hex = $.trim(color).substr(1);
                if (hex.length == 3)
                    hex = hex.substr(0, 1) + hex.substr(0, 1) + hex.substr(1, 1) + hex.substr(1, 1) + hex.substr(2, 1) + hex.substr(2, 1);
                red = parseInt(hex.substr(0, 2), 16) * (1 - ratio);
                green = parseInt(hex.substr(2, 2), 16) * (1 - ratio);
                blue = parseInt(hex.substr(4, 2), 16) * (1 - ratio);
                red = (red > 255 ? 255 : red).toString(16);
                green = (green > 255 ? 255 : green).toString(16);
                blue = (blue > 255 ? 255 : blue).toString(16);
                dotIndex = red.indexOf(".");
                if (dotIndex != -1)
                    red = red.substring(0, dotIndex);
                dotIndex = green.indexOf(".");
                if (dotIndex != -1)
                    green = green.substring(0, dotIndex);
                dotIndex = blue.indexOf(".");
                if (dotIndex != -1)
                    blue = blue.substring(0, dotIndex);
                red = red.length < 2 ? "0" + red : red;
                green = green.length < 2 ? "0" + green : green;
                blue = blue.length < 2 ? "0" + blue : blue;
                color = "#" + red + green + blue;
            }
            return color;
        }

        return {
            browserInfo: browserInfo,
            plugin: plugin,
            showHide: showHide,
            htmlEncode: htmlEncode,
            htmlDecode: htmlDecode,
            darken: darken
        }
    })();

    if (!!window.gui) {
        $.extend(window.gui, gui);
    } else {
        window.gui = gui;
    }

})(window);

/* ========================================================================
 * GUI: nav.js v0.1.0
 * http://www.gui.guoyao.me/
 * ========================================================================
 * Copyright 2013 Guoyao Wu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */

(function (window) {
    "use strict";

    var console = window.console,
        $ = window.jQuery,
        gui = window.gui,
        old = $.fn.guiNav;

    var GuiNav = function (element) {
        this.$element = $(element);
    };

//    $.extend(GuiNav.prototype, {});

    $.fn.guiNav = function (option) {

        var defaults = {
                backgroundColor: "#eeeeee",
                border: "",
                itemWidth: "120px",
                itemHeight: "30px",
                itemOverColor: "#d5d5d5",
                itemFadeIn: true,
                animationDuration: 500
            },
            isMethodCall = gui.plugin.isPluginMethodCall(option);

        function initEach($guiNav) {
            var isVertical = $guiNav.hasClass("gui-nav-vertical"),
                options = $.extend({}, defaults, option, $guiNav.data("option"));

            $guiNav.css({
                backgroundColor: options.backgroundColor,
                border: options.border
            }).find("ul").css({
                    backgroundColor: options.backgroundColor,
                    border: options.border
                });

            $guiNav.find("a").css({
                width: options.itemWidth,
                height: options.itemHeight,
                lineHeight: options.itemHeight
            }).hover(function () {
                    $(this).css("backgroundColor", options.itemOverColor);
                }, function () {
                    $(this).css("backgroundColor", options.backgroundColor);
                });

            if (isVertical) {
                $guiNav.css("width", options.itemWidth)
                    .find("ul").css("left", options.itemWidth);
            } else {
                $guiNav.css("height", options.itemHeight)
                    .find("ul ul").css("left", options.itemWidth);
            }

            if (options.itemFadeIn) {
                $guiNav.find("li").hover(function () {
                    $(this).children("ul").css("opacity", 0).animate({opacity: 1}, options.animationDuration);
                }, function () {
                });
            }
        }

        this.each(function () {
            var $guiNav = $(this);
            var data = $guiNav.data('gui.nav');
            if (!data) {
                $guiNav.data('gui.nav', (data = new GuiNav(this)))
            }
            if (isMethodCall) {
                data[option]();
            } else {
                initEach($guiNav);
            }
        });

        return gui.plugin.patch($.fn.guiNav, this, option);
    };

    $.fn.guiNav.Constructor = GuiNav;

    // NO CONFLICT
    // ===============

    $.fn.guiNav.noConflict = function () {
        $.fn.guiNav = old;
        return this;
    };

})(window);

/* ========================================================================
 * GUI: tab.js v0.1.0
 * http://www.gui.guoyao.me/
 * ========================================================================
 * Copyright 2013 Guoyao Wu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */

(function (window) {
    "use strict";

    var console = window.console,
        $ = window.jQuery,
        gui = window.gui,
        old = $.fn.guiTab;

    var GuiTab = function (element) {
        this.$element = $(element);
    };

    $.extend(GuiTab.prototype, {
        show: function () {
            var $li = this.$element.closest(".gui-tab > .tabs > li");
            if ($li.hasClass('active')) {
                return;
            }
            $li.trigger("click");
        }
    });

    $.fn.guiTab = function (option) {

        var isMethodCall = gui.plugin.isPluginMethodCall(option);

        function showHideTabContent($tabItem, show) {
            var selector = $tabItem.data("target");
            if (!selector) {
                var linkItem = $tabItem.children("a");
                if (linkItem && linkItem.length > 0) {
                    selector = linkItem[0].getAttribute("href");
                    selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ""); //strip for ie6, 7
                }
            }
            if(selector) {
                gui.showHide($(selector), show);
            }
        }

        function initEach($guiTab) {
            var $activeTabItem = null,
                $$tabItems = $guiTab.children(".tabs").children("li");

            $$tabItems.each(function (index) {
                var $tabItem = $(this);
                if (index === 0) {
                    $activeTabItem = $tabItem;
                }
                if ($tabItem.hasClass("active")) {
                    if ($activeTabItem) {
                        $activeTabItem.removeClass("active");
                    }
                    $activeTabItem = $tabItem;
                }
            });

            if (!$activeTabItem) {
                return;
            }

            $activeTabItem.addClass("active");

            showHideTabContent($activeTabItem, true);

            $$tabItems.click(function () {
                var $this = $(this);
                if (!$this.hasClass("active")) {
                    if ($activeTabItem) {
                        $activeTabItem.removeClass("active");
                        showHideTabContent($activeTabItem, false);
                    }
                    $activeTabItem = $this;
                    $activeTabItem.addClass("active");
                    showHideTabContent($activeTabItem, true);
                }
                return false;
            });

        }

        this.each(function () {
            var $guiTab = $(this);
            var data = $guiTab.data('gui.tab');
            if (!data) {
                $guiTab.data('gui.tab', (data = new GuiTab(this)))
            }
            if (isMethodCall) {
                data[option]();
            } else {
                initEach($guiTab);
            }
        });

        return gui.plugin.patch($.fn.guiTab, this, option);
    };

    $.fn.guiTab.Constructor = GuiTab;

    // NO CONFLICT
    // ===============

    $.fn.guiTab.noConflict = function () {
        $.fn.guiTab = old;
        return this;
    };
})(window);
/**
 * Author: alfredzh
 * Time: 08-13-2013 10:38
 */

(function (window) {
	"use strict";

	var document = window.document,
		console = window.console,
		$ = window.jQuery,
		gui = window.gui;

	$.fn.guiCollapse = function (options) {

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
	};

})(window);

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

(function (window, undefined) {
	"use strict";

	var console = window.console,
		$ = window.jQuery,
		gui = window.gui,
		old = $.fn.guiSlider;

	var module = {
		_init: function (obj, option) {
			this._mergeOptions(option);
			this._initVaribles(obj);
			this._initNodeWrapper();
			this._initFetchData();
		},
		_mergeOptions: function (option) {
			this.defaults = $.extend({}, $.fn.guiSlider.defaults, option);
		},
		//_sliceSelectorSymbol: function (name) {
			//var reg = /[.#]*/;
			//return name = name.replace(reg, '');
		//},
		_initFetchData: function () {
			if (this.defaults.remote.url !== undefined) {
				$.ajax({
					type: this.defaults.remote.type,
					url: this.defaults.remote.url,
					data: this.defaults.remote.data,
					dataType: this.defaults.remote.dataType
				})
					.done(function () {
						this._initElements();
					})
					.fail(function () {
						alert('failed');
					})
			} else if (this.defaults.data.indicatordata !== undefined) {
				this._initElements();
			}
		},
		_initElements: function () {
			this._initBtns();
			this._calculateMoveDistance();
			this._eventCapture();
			this._renderRangeBar();
			this._initAddIndicatorText();
		},
		curTarget: {},
		index: [],
		_initVaribles: function (obj) {
			this.obj = obj;
			if (this.defaults.rangeBar) {
				this.rangeSelectorBar = this.obj.find("." + this.defaults.rangeBarClass);
			}
		},
		_initNodeWrapper: function () {
			$('<div class="' + this.defaults.btnWrapperClass + '"></div>').appendTo(this.obj);
			if (this.defaults.indicatorText) {
				$('<div class="' + this.defaults.indicatorTextClass + '"></div>').appendTo(this.obj);
			}
		},
		_initBtns: function () {
			for (var i = 0; i < this.defaults.btns.length; i++) {
				this.index[i] = (this.defaults.btns[i] === 'max') ? this.defaults.data.indicatordata.length - 1 : this.defaults.btns[i];

				$('<a class="' + this.defaults.btnClass + '"></a>')
					.appendTo($("." + this.defaults.btnWrapperClass))
					.css({
						"left": this.index[i] / (this.defaults.data.indicatordata.length - 1) * 100 + "%",
						"width": this.defaults.btnSize.width,
						"height": this.defaults.btnSize.height,
						"margin-left": -(this.defaults.btnSize.width / 4),
						"margin-top": -(this.defaults.btnSize.height / 4)
					});
			}
		},
		_initAddIndicatorText: function () {
			if (this.defaults.indicatorText) {
				for (var i = 0; i < this.defaults.data.indicatordata.length; i++) {
					$('<span>' + this.defaults.data.indicatordata[i] + '</span>')
						.appendTo($("." + this.defaults.indicatorTextClass))
						.css({
							"left": i / (this.defaults.data.indicatordata.length - 1) * 100 + "%",
							"margin-left": - $("." + this.defaults.indicatorTextClass)
												.find('span')
												.eq(i)
												.width()
												 / 2 + 
											 $("." + this.defaults.btnWrapperClass)
												.find("." + this.defaults.btnClass)
												.outerWidth()
												 / 4
							});
				}
				if (parseInt($("." + this.defaults.indicatorTextClass).find("span").outerWidth(), 10) * this.defaults.data.indicatordata.length > $("." + this.defaults.rangeBarClass).outerWidth()) {
					for (var j = 0; j < this.defaults.data.indicatordata.length; j++) {
						if (j % 2 === 0) {
							$("." + this.defaults.indicatorTextClass)
								.find("span")
								.eq(j)
								.css({
									"top" : $("." + this.defaults.indicatorTextClass)
												.find("span")
												.height()
								});
						}
					}
				}
			}
		},
		_eventCapture: function () {
			var slider = this;
			$("." + this.defaults.btnWrapperClass).mousedown(function (e) {
				e.preventDefault();
				slider._saveTarget(e);
			});
			$(document).mousemove(function (e) {
				slider._refreshPosition(e);
			});
			$(document).mouseup(function (e) {
				slider._destroyTarget();
			});
		},
		_checkMoveStep: function () {
			return Math.abs(this.curX - this.orgX) > this.moveDistance * this.defaults.step * 0.8;
		},
		_calculateMoveDirection: function () {
			if (this._checkMoveStep()) {
				if (this.curX - this.orgX > 0) {
					return 1;
				} else if (this.curX - this.orgX < 0) {
					return -1;
				}
			}
		},
		_calculateMoveDistance: function () {
			this.moveDistance = (parseInt($("." + this.defaults.btnWrapperClass).width(), 10)) / (this.defaults.data.indicatordata.length - 1);
			this.moveDistance = Math.round(this.moveDistance);
		},
		_refreshPosition: function (e) {
			this.curX = e.pageX;
			if (this.curTarget.className === 'btn') {
				if (this._calculateMoveDirection() === 1 && this.index[$(this.curTarget).index()] < this.defaults.data.indicatordata.length - 1) {

					this.index[$(this.curTarget).index()] += this.defaults.step;
					$(this.curTarget)
						.css({"left": (this.index[$(this.curTarget).index()] / (this.defaults.data.indicatordata.length - 1) * 100 + "%")});

					this.orgX = $(this.curTarget).offset().left + parseInt($(this.curTarget).width(), 10) / 2;
				} else if (this._calculateMoveDirection(e) === -1 && this.index[$(this.curTarget).index()] > 0) {

					this.index[$(this.curTarget).index()] -= this.defaults.step;
					$(this.curTarget)
						.css({"left": (this.index[$(this.curTarget).index()] / (this.defaults.data.indicatordata.length - 1) * 100 + "%")});

					this.orgX = $(this.curTarget).offset().left + parseInt($(this.curTarget).width(), 10) / 2;
				}
			}
			this._refreshRangeBarPosition();
		},
		_renderRangeBar: function () {
			if (this.defaults.rangeBar) {
				if ($("." + this.defaults.btnWrapperClass).find("." + this.defaults.rangeBarClass).length <= 0) {
					$('<a class="' + this.defaults.rangeBarClass + '"></a>').appendTo($("." + this.defaults.btnWrapperClass));
				}
				this._refreshRangeBarPosition();
			}
		},
		_refreshRangeBarPosition: function (e) {
			var btnLeft = [];
			if (this.curTarget.className === this.defaults.rangeBarClass) {
				if (this._calculateMoveDirection() === 1 && this._checkRangeBarMoveRange()) {
					for (var i = 0; i < this.index.length; i++) {
						this.index[i] += this.defaults.step;
						$("." + this.defaults.btnWrapperClass)
							.find("." + this.defaults.btnClass)
							.eq(i)
							.css({"left": (this.index[i] / (this.defaults.data.indicatordata.length - 1) * 100 + "%")});
					}
					this.orgX = this.curX;
				} else if (this._calculateMoveDirection() === -1 && this._checkRangeBarMoveRange()) {
					for (var j = 0; j < this.index.length; j++) {
						this.index[j] -= this.defaults.step;
						$("." + this.defaults.btnWrapperClass)
							.find("." + this.defaults.btnClass)
							.eq(j)
							.css({"left": (this.index[j] / (this.defaults.data.indicatordata.length - 1) * 100 + "%")});
					}
					this.orgX = this.curX;
				}
			}
			for (var k = 0; k < $("." + this.defaults.btnWrapperClass).find("." + this.defaults.btnClass).length; k++) {
				btnLeft.push(parseInt($("." + this.defaults.btnWrapperClass)
											.find("." + this.defaults.btnClass)
											.eq(k)
											.css("left")
										, 10));
			}
			var rangeBar = Math.abs(btnLeft[0] - btnLeft[1]);
			$("." + this.defaults.btnWrapperClass)
				.find("." + this.defaults.rangeBarClass)
				.css({'width': rangeBar,
					'left': btnLeft[0] - btnLeft[1] > 0 ? btnLeft[1] + this.defaults.btnSize.width / 4 : btnLeft[0] + this.defaults.btnSize.width / 4});
		},
		_checkRangeBarMoveRange: function () {
			if (this._calculateMoveDirection() === 1) {
				for (var i = 0; i < this.index.length; i++) {
					if (this.index[i] + 1 > this.defaults.data.indicatordata.length - 1) {
						return false;
					}
				}
				return true;
			}
			if (this._calculateMoveDirection() === -1) {
				for (var j = 0; j < this.index.length; j++) {
					if (this.index[j] - 1 < 0) {
						return false;
					}
				}
				return true;
			}
		},
		_saveTarget: function (e) {
			this.curTarget = e.target;
			this.orgX = e.pageX;
			//this.curOffset = parseInt(e.target.style.left, 10);
		},
		_checkTarget: function (e) {
			return this.curTarget === e.target;
		},
		_destroyTarget: function () {
			this.curTarget = "";
		}
	}

	$.fn.guiSlider = function (option) {

		module._init(this, option);

		return this;
	}

	$.fn.guiSlider.defaults = {
		step: 1,
		btnClass: 'btn',
		btns: [0, 'max'],
		btnSize: {
			width: 30,
			height: 30
		},
		rangeBar: true,
		rangeBarClass: 'slider-range-button',
		btnWrapperClass: 'slider-btn-wrapper',
		indicatorTextClass: 'slider-range-indicator',
		indicatorText: true,
		data: {
			indicatordata: []
		},
		remote: {}//'type':'POST','url':'','data':'','dataType':'JSON'
	}

	$.fn.guiSlider.noConflict = function () {
		$.fn.guiSlider = old;
		return this;
	};

	//for debug
	$.fn.guiSlider.debug = module;

})(window);
(function (window, undefined) {
	"use strict";

	var console = window.console,
		$ = window.jQuery,
		gui = window.gui,
		old = $.fn.guiPlaceholder;

	$.fn.guiPlaceholder = function (option) {

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
					$(this).parent().find('label').eq($(this).index(defaults.inputType)).stop(true, true).fadeOut(defaults.animateSpeed);
				});
				this.obj.delegate(this.defaults.inputType, 'blur', function () {
					if($(this).val() === ''){
						$(this).parent().find('label').eq($(this).index(defaults.inputType)).stop(true, true).fadeIn(defaults.animateSpeed);
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

	$.fn.guiPlaceholder.noConflict = function () {
		$.fn.guiPlaceholder = old;
		return this;
	};

})(window);

(function (window, undefined) {
	"use strict";

	var console = window.console,
		$ = window.jQuery,
		grace = window.grace,
		old = $.fn.guiDatePicker;

	var module = {
		_init:function(obj,option){
			this.obj = obj;
			this._initOptions(option);
			this._initNewDate();
			this._getNewDate();
			this._appendElem();
			this._iptFocus();
		},
		//tested
		_initOptions:function(option){
			this.defaults = $.extend({},$.fn.guiDatePicker.defaults,option);
		},
		//tested
		_initNewDate :function(){
			var initNewDate = this.defaults.initNewDate;
			
			this._setNewDate('year',initNewDate.getFullYear());
			this._setNewDate('month',initNewDate.getMonth());
			this._setNewDate('date',initNewDate.getDate());
		},
		//tested
		_setNewDate : function(type,value){
			this.obj.data(type,value);
		},
		//tested
		_getNewDate : function(){
			var date = {};
				date.year = $(this.obj).data('year');
				date.month = $(this.obj).data('month');
				date.date = $(this.obj).data('date');
			return date;
		},
		//tested
		_initDatePickerPos : function(){
			var inputOffset = this._getInputProp(),
				left = inputOffset.left,
				top = inputOffset.top + inputOffset.h;

			$('.' + this.defaults.mainWrapper)
				.css({'left' : left,
						'top' : top
				})
		},
		//
		_getInputProp : function(){
			var inputNode = $(this.obj) || undefined,
				prop = [];
			if(inputNode){
				prop.left = inputNode.offset().left,
				prop.top = inputNode.offset().top,
				prop.h = parseInt(inputNode.outerHeight(),10),
				prop.w = parseInt(inputNode.outerWidth(),10);
			}
			return prop;
		},
		//tested
		_setCalender : function(){
			var totalDate = this._calTotalDate();
			var daysPerWeek = 7;
			var trIndex = 0;
			var datesObj = $('.' + this.defaults.mainWrapper).find('.' + this.defaults.dates);
			
			for (var j = 0;j < totalDate; j++){
				if(datesObj.find("td").length % daysPerWeek === 0){

					trIndex++;

					$('<tr><td><a>'+ (j + 1) +'</a></td></tr>')
						.appendTo(datesObj);

				}else{
					$('<td><a>'+ (j + 1) +'</a></td>')
						.appendTo(datesObj.find("tr").eq(trIndex));
				}
			}
		},
		//tested
		_appendEmptyCalenderWp : function(){
			var firstDay = this._calFirstDay();
			var datesObj = $('.' + this.defaults.mainWrapper).find('.' + this.defaults.dates);

			for(var i = 0; i < firstDay; i++){
				$('<td><span></span></td>')
					.appendTo(datesObj.find("tr").eq(0));
			}
		},
		//tested
		_clearCalender : function(){
			var datesObj = $('.' + this.defaults.mainWrapper).find('.' + this.defaults.dates);
			datesObj.html('<tr></tr>');
		},
		//tested
		_calFirstDay:function(){
			var curYear = this._getNewDate().year,
				curMonth = this._getNewDate().month,
				curDate = this._getNewDate().date;

			return new Date(curYear,curMonth,1).getDay();
		},
		//tested
		_calTotalDate:function(){
			var curYear = this._getNewDate().year,
				curMonth = this._getNewDate().month,
				curDate = this._getNewDate().date;

			return new Date(curYear,curMonth,0).getDate();
		},
		//tested
		_recalYearFactory:function(cal){
			var curYear = this._getNewDate().year;
			if(cal === 1){
				this._setNewDate('year',curYear + 1);
			}else if(cal === -1){
				this._setNewDate('year',curYear - 1);
			}
		},
		//tested
		_recalMonthFactory:function(cal){
			var curMonth = this._getNewDate().month;
			if(cal === 1){
				if(curMonth < 11){
					this._setNewDate('month',curMonth + 1);
				}else{
					this._setNewDate('month',0);
				}
			}else if(cal === -1){
				if(curMonth > 0){
					this._setNewDate('month',curMonth - 1);
				}else{
					this._setNewDate('month',11);
				}
			}
		},
		//tested 
		_calTitle:function(){
			var curYear = this._getNewDate().year,
				curMonth = this._getNewDate().month + 1,
				titleformat = curYear + '\n' + curMonth + '月';

			return titleformat;
		},
		//tested
		_setTitle:function(){
			var title = $('.' + this.defaults.mainWrapper).find('.' + this.defaults.title);
			return title.html(this._calTitle());
		},
		//tested step by step
		_rerenderCalender : function(){
			this._initDatePickerPos();
			this._clearCalender();
			this._appendEmptyCalenderWp();
			this._setCalender();
			this._setTitle();
		},
		//bind focus several times
		_iptFocus :function(){
			var mo = this,
				dateInputObj = $(this.obj);

			dateInputObj.focus(function(e){
				mo.obj = $(e.target);
				mo._rerenderCalender();
				$('.' + mo.defaults.mainWrapper)
					.stop(true,true)
					.fadeIn();
				//mo.obj = $(e.target);
				mo._highCurLightDate();
			});
		},
		//test covered by the past
		_eventHandler:function(){
			var mo = this,
				mainWrapper = $('.' + this.defaults.mainWrapper),
				prevYearObj = mainWrapper.find('.' + this.defaults.prevYearBtn),
				nextYearObj = mainWrapper.find('.' + this.defaults.nextYearBtn),

				prevMonthObj = mainWrapper.find('.' + this.defaults.prevMonthBtn),
				nextMonthObj = mainWrapper.find('.' + this.defaults.nextMonthBtn),

				//dateInputObj = $(this.obj),
				datesObj = mainWrapper.find('.' + this.defaults.dates);
			//prev year
			prevYearObj.click(function(){

				mo._recalYearFactory(-1);
				mo._rerenderCalender();
			});
			//next year
			nextYearObj.click(function(){

				mo._recalYearFactory(1);
				mo._rerenderCalender();
			});
			//prev month
			prevMonthObj.click(function(){

				mo._recalMonthFactory(-1);
				mo._rerenderCalender();
			});
			//next month
			nextMonthObj.click(function(){

				mo._recalMonthFactory(1);
				mo._rerenderCalender();
			});
			//get calender interactive button
			datesObj.on('click','a',function(e){
				
				var getActiveDate = e.target.innerText;

				mainWrapper
					.stop(true,true)
					.fadeOut();

				mo._setActiveDate(getActiveDate);
				mo._setInputVal();
			});
		},
		//tested
		_setActiveDate : function(num){
			this._setNewDate('date',parseInt(num,10));
		},
		//
		_setInputVal : function(){
			var curYear = this._getNewDate().year,
				curMonth = this._getNewDate().month + 1,
				curDate = this._getNewDate().date;

			var spliter = this.defaults.dateSpliter;

			var inputVal = curYear + spliter + curMonth + spliter + curDate;

			$(this.obj).val(inputVal);
		},
		//
		_highCurLightDate : function(index){
			var curYear = this._getNewDate().year,
				curMonth = this._getNewDate().month,
				curDate = this._getNewDate().date;
			var firstDay = this._calFirstDay();
			var tdIndex = curDate + firstDay -1;
			var dateObj = $('.' + this.defaults.mainWrapper).find('.' + this.defaults.dates + ' td');
			dateObj.eq(tdIndex).addClass(this.defaults.curDateClass);
		},
		//tested
		_appendElem : function(){
			if($('.' + this.defaults.mainWrapper).length === 0){
				$('<div class=' + this.defaults.mainWrapper +' style="display:none;position: absolute;">' + 
					'<div class='+ this.defaults.header +'>' + 
						'<a class='+ this.defaults.prevYearBtn +'>&lt;&lt;</a>' + 
						'<a class='+ this.defaults.nextYearBtn +'>&gt;&gt;</a>' + 
						'<a class='+ this.defaults.prevMonthBtn +'>&lt;</a>' + 
						'<a class='+ this.defaults.nextMonthBtn +'>&gt;</a>' + 
						'<div class='+ this.defaults.title +'></div>' + 
					'</div>' + 
					'<table class='+ this.defaults.calender +'>' + 
						'<thead class='+ this.defaults.week +'>'+
							'<tr></tr>' + 
						'</thead>' + 
						'<tbody class='+ this.defaults.dates +'>' + 
							'<tr></tr>' + 
						'</tbody>' + 
					'</table>' + 
				'</div>').appendTo(this.defaults.topNode);

				this._eventHandler();

				this._addWeekTitle();
			}
		},
		_addWeekTitle : function(){
			var weekTitle = this.defaults.weekTitle;
			var weekTitleNode = $('.' + this.defaults.mainWrapper).find('.' + this.defaults.week + ' tr');

			for(var i = 0; i < weekTitle.length; i++){
				$('<th><span>' + weekTitle[i] + '</span></th>').appendTo(weekTitleNode);
			}
		}
	}
	
	$.fn.guiDatePicker = function (option) {
		
		module._init(this, option);

		return this;
	}

	$.fn.guiDatePicker.defaults = {
		mainWrapper : "gui-date-picker",
		nextYearBtn : "gui-date-ny-btn",
		prevYearBtn : "gui-date-py-btn",
		title : "gui-date-title",
		calender : "gui-date-calender",
		week : "gui-date-week",
		dates : "gui-date-dates",
		header : "gui-date-header",
		prevMonthBtn : "gui-date-pm-btn",
		nextMonthBtn : "gui-date-nm-btn",
		curDateClass : "gui-date-current-date",
		//dateInput : "gui-date-input",
		topNode : "body",
		initNewDate : new Date(),
		dateSpliter : '-',
		weekTitle : ['日','一','二','三','四','五','六']
	}

	$.fn.guiDatePicker.noConflict = function () {
		$.fn.guiDatePicker = old;
		return this;
	};

	//for debug
	$.fn.guiDatePicker.debug = module;

})(window);
/* ========================================================================
 * Copyright 2013 andy zhang
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */

(function (window) {
    "use strict";

    var console = window.console,
        $ = window.jQuery,
        gui = window.gui,
        old = $.fn.guiPanel;

    var GuiPanel = function (element) {
        this.$element = $(element);
    };

    $.extend(GuiPanel.prototype, {
        show: function () {
            var $headerdiv = this.$element.find("> .panelsa-btn");
            if ($headerdiv.hasClass('panelsa-a-closed')) {
                console.debug("this is return");
                return;
            }
            $headerdiv.trigger("click");
        },
        hidden: function () {
            var $headerdiv1 = this.$element.find("> .panelsa-btn");
            if ($headerdiv1.hasClass('panelsa-a-opened')) {
                return;
            }
            $headerdiv1.trigger("click");
        }
    });

    $.fn.guiPanel = function (option) {

        var defaults = {
                animationDuration: 500,
                title: "test Title"
            },
            isMethodCall = gui.plugin.isPluginMethodCall(option);

        function initEach($guiPnl) {
            var options = $.extend({}, defaults, option, $guiPnl.data("option"));

            $guiPnl.find(".panelsa-btn").each(function () {
                var $this=$(this);
                if ($this.attr('class').indexOf("opened") != -1) {
                    $this.prepend('<div>' + options.title + '</div>');
                    $this.addClass('panelsa-a-opened');
                } else {
                    $this.prepend('<div>' + options.title + '</div>');
                    $this.addClass('panelsa-a-closed');
                }

                var tabContent = $this.siblings(".panelsa-content");

                var orgHeight;
                if (!tabContent.is(":visible")) {
                    tabContent.show();
                    orgHeight = tabContent.height();
                    tabContent.hide();
                } else {
                    orgHeight = tabContent.height();
                }
                $this.click(function () {
                    var $this1=$(this);
                    if ($this1.attr('class').indexOf("opened") != -1) {
                        $this1.removeClass('panelsa-a-opened');
                        $this1.addClass('panelsa-a-closed');
                    }
                    else {
                        $this1.removeClass('panelsa-a-closed');
                        $this1.addClass('panelsa-a-opened');
                    }
                    var curHeight =$this1.siblings(".panelsa-content").height();
                    if (curHeight <= 0 || tabContent.is(":hidden")) {
                        tabContent.css({ display: "block", height: 0, opacity: 0 }).animate({ height: orgHeight, opacity: 1 }, options.animationDuration);
                    } else {
                        tabContent.animate({ height: 0, opacity: 0 }, options.animationDuration);
                    }
                });
            });
        }

        this.each(function () {
            var $guiPnl = $(this);
            var data = $guiPnl.data('gui.pnl');
            if (!data) {
                $guiPnl.data('gui.pnl', (data = new GuiPanel(this)))
            }
            if (isMethodCall) {
                data[option]();
            } else {
                initEach($guiPnl);
            }
        });

        return gui.plugin.patch($.fn.guiPanel, this, option);
    };

    $.fn.guiPanel.Constructor = GuiPanel;

    // NO CONFLICT
    // ===============

    $.fn.guiPanel.noConflict = function () {
        $.fn.guiPanel = old;
        return this;
    };

})(window);
/* ========================================================================
 * GUI: button.js v0.1.0
 * http://www.gui.guoyao.me/
 * ========================================================================
 * Copyright 2013 Guoyao Wu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */

(function (window) {
    "use strict";

    var $ = window.jQuery,
        gui = window.gui,
        old = $.fn.guiButton;

    $.fn.guiButton = function (option) {
        return gui.plugin.patch($.fn.guiButton, this, option);
    };

    // NO CONFLICT
    // ===============

    $.fn.guiButton.noConflict = function () {
        $.fn.guiButton = old;
        return this;
    };
})(window);
/* ========================================================================
 * GUI: nav-ie-patch.js v0.1.0
 * http://www.gui.guoyao.me/
 * ========================================================================
 * Copyright 2013 Guoyao Wu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */

(function (window) {
    "use strict";

    var console = window.console,
        $ = window.jQuery,
        gui = window.gui;

    function setMaxHeight($$elements, childSelector, modifiedValue) {
        $$elements.each(function () {
            var $element = $(this),
                maxHeight = 0;
            $element.children(childSelector).each(function () {
                var height = $(this).height();
                if (height > maxHeight) {
                    maxHeight = height;
                }
            });
            if ($.isNumeric(modifiedValue)) {
                maxHeight += modifiedValue;
            }
            $element.height(maxHeight);
        });
    }

    //
    // Navs
    // --------------------------------------------------

    if(!!$.fn.guiNav) {
        $.fn.guiNav.iePatch = function ($$guiNav, option) {
            if (gui.plugin.isPluginInitialize(option)) {
                if (gui.browserInfo.version <= 6) { // lte IE 6
                    $$guiNav.find("li").hover(function () {
                        $(this).children("ul").css("display", "block");
                    }, function () {
                        $(this).children("ul").css("display", "none");
                    });
                    $$guiNav.each(function () {
                        var $guiNav = $(this),
                            isVertical = $guiNav.hasClass("gui-nav-vertical");
                        if (!isVertical) {
                            $guiNav.children("li").css("float", "left");
                        }
                    });
                }
            }
            return $$guiNav;
        };
    }

    //
    // Tabs
    // --------------------------------------------------

    if(!!$.fn.guiTab) {
        $.fn.guiTab.iePatch = function ($$guiTab, option) {
            if (gui.plugin.isPluginInitialize(option)) {
                if (gui.browserInfo.version <= 7) { // lte IE 7
                    setMaxHeight($$guiTab.children(".tabs"), "li", -1);
                }
            }
            return $$guiTab;
        };
    }

    //
    // Button
    // --------------------------------------------------

    if(!!$.fn.guiButton) {
        $.fn.guiButton.iePatch = function ($$guiButton, option) {
            if (gui.browserInfo.version <= 9) {
                $("a.disabled").click(function () {
                    return false;
                });
            }
            if (gui.browserInfo.version <= 6) { // lte IE 6
                $$guiButton.each(function () {
                    var $this = $(this);
                    var backgroundColor = $this.css("background-color");
                    var hoverBackgroundColor = gui.darken(backgroundColor, 0.08);
                    if ($this.hasClass("disabled") || $this.attr("disabled")) {
                        $this.css("cursor", "not-allowed");
                    } else {
                        $this.hover(function () {
                            $this.css("background-color", hoverBackgroundColor);
                        }, function () {
                            $this.css("background-color", backgroundColor);
                        });
                    }
                });
            }
            return $$guiButton;
        };
    }

})(window);
