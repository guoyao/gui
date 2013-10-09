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

        function removeChildAfter($$children, childOrIndex) {
            if (typeof childOrIndex !== "number")  {
                childOrIndex = $$children.index(childOrIndex);
            }
            $$children.each(function (index, child) {
                if (index > childOrIndex) {
                    $(child).remove();
                }
            });
        }

        /**
         * href strip for ie6, 7
         * @param href
         */
        function stripHref(href) {
            return href && href.replace(/.*(?=#[^\s]*$)/, "");
        }

        return {
            browserInfo: browserInfo,
            plugin: plugin,
            darken: darken,
            removeChildAfter: removeChildAfter,
            stripHref: stripHref
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

    $.fn.guiNav = function (option) {

        var defaults = {
            styleName: "",
            itemFadeIn: true,
            animationDuration: 500
        };

        option = $.extend(defaults, option);

        this.each(function () {
            var $guiNav = $(this),
                isVertical = $guiNav.hasClass("gui-nav-vertical");

            if (option.styleName) {
                $guiNav.addClass(option.styleName);
            }

            $guiNav.find("li").mouseenter(function () {
                var $navItem = $(this),
                    $$subMenu = $navItem.children("ul");
                $$subMenu.css("left", (isVertical || !$navItem.parent().hasClass("gui-nav")) ? $navItem.width() : 0);
                if (option.itemFadeIn) {
                    $$subMenu.css("opacity", 0).animate({opacity: 1}, option.animationDuration);
                }
            });
        });

        return gui.plugin.patch($.fn.guiNav, this, option);
    };

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
                    selector = gui.stripHref(selector); //strip for ie6, 7
                }
            }
            if(selector) {
                var $selector = $(selector);
                if (show) {
                    $selector.slideDown();
                }
                else {
                    $selector.hide();
                }
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
/* ========================================================================
 * Bootstrap: collapse.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#collapse
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
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

/* ========================================================================
 * GUI: collapse.js v0.1.0
 * http://www.gui.guoyao.me/
 * ========================================================================
 * Copyright 2013 Guoyao Wu
 * ======================================================================== */

 (function (window) {
	"use strict";

	var document = window.document,
        console = window.console,
		$ = window.jQuery,
		gui = window.gui,
		old = $.fn.guiCollapse;
/*
<<<<<<< HEAD
	var module = function(obj,option){
		this._init(obj,option);
	}

	module.prototype = {
		_init: function (obj, option) {
			this.obj = obj;
			this._initOptions(option);
			this._recordEleHeight();
			this._eventHandler();
		},
		orgHeight: [],
		//
		_initOptions: function (option) {
			this.defaults = $.extend({}, $.fn.guiCollapse.defaults, option);
		},
		_recordEleHeight: function () {
			var mo = this;
			$(this.obj)
				.find('.' + this.defaults.switchTabClass)
				.each(function (i) {
					if (!$(this).is(":visible")) {
						$(this).show();
						mo.orgHeight[i] = $(this).height();
						$(this).hide();
					} else {
						mo.orgHeight[i] = $(this).height();
					}
				});
			return mo.orgHeight;
		},
		_eventHandler: function () {
			var mo = this;
			$(this.obj)
				.find('.' + this.defaults.switchBtnClass)
				.each(function (i) {
					$(this).click(function (e) {
						//var tabIndex = $(e.target).eq(i);

						var curHeight = $(this).siblings('.' + mo.defaults.switchTabClass).height();
						var tabContent = $(this).siblings('.' + mo.defaults.switchTabClass);

						var animspeed = mo.defaults.animationDuration;
						var toggleClass = mo.defaults.switchBtnToggleClass;

						if (curHeight <= 0 || tabContent.is(":hidden")) {
							tabContent
								.css({display: "block", height: 0, opacity: 0})
								.animate({'height': mo.orgHeight[i], 'opacity': 1}, animspeed);
							$(this).removeClass(toggleClass);
						} else {
							tabContent
								.animate({'height': 0, 'opacity': 0}, animspeed);
							$(this).addClass(toggleClass);
						}
					});
				});
		}
	}

	$.fn.guiCollapse = function (option) {

		return this.each(function () {
			new module(this,option);
			//module._init(this, option);
		});
	}

	$.fn.guiCollapse.defaults = {
		switchBtnClass: 'tab-btn',
		switchBtnToggleClass: 'tab-btn-closed',
		switchTabClass: 'tab-content',
		animationDuration: 500
	};

	//for debug
	$.fn.guiCollapse.Constructor = module;
=======
*/
    // COLLAPSE PUBLIC CLASS DEFINITION
    // ================================

    var GuiCollapse = function (element, options) {
        this.$element = $(element);
        this.options = options;
        if (options.parent) {
            this.$parent = $(options.parent);
        }
        this.transitioning = false;
        if (options.toggle) {
            this.toggle();
        }
    };

    GuiCollapse.prototype.show = function () {
        if (this.transitioning || !this.$element.hasClass('gui-collapsed')) {
            return;
        }

        var startEvent = $.Event('show.gui.collapse');
        this.$element.trigger(startEvent);
        if (startEvent.isDefaultPrevented()) {
            return;
        }

        var actives = this.$parent && this.$parent.find('.gui-collapsible:not(.gui-collapsed)');
        if (actives && actives.length) {
            actives.guiCollapse('hide');
        }

        this.transitioning = true;
        var that = this;
        that.$element.slideDown(400, function () {
            that.transitioning = false;
            that.$element.removeClass('gui-collapsed');
            that.$element.trigger('shown.gui.collapse');
        });
    };

    GuiCollapse.prototype.hide = function () {
        if (this.transitioning || this.$element.hasClass('gui-collapsed')) {
            return;
        }

        var startEvent = $.Event('hide.gui.collapse');
        this.$element.trigger(startEvent);
        if (startEvent.isDefaultPrevented()) {
            return;
        }

        this.transitioning = true;
        var that = this;
        that.$element.slideUp(400, function () {
            that.transitioning = false;
            that.$element.addClass('gui-collapsed');
            that.$element.trigger('hidden.gui.collapse');
        });
    };

    GuiCollapse.prototype.toggle = function () {
        if (!this.transitioning) {
            this[this.$element.hasClass('gui-collapsed') ? 'show' : 'hide']();
        }
    };


    // COLLAPSE PLUGIN DEFINITION
    // ==========================

    $.fn.guiCollapse = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('gui.collapse');

            if (!data) {
                $this.data('gui.collapse', (data = new GuiCollapse(this, $.extend({}, $.fn.guiCollapse.defaults, $this.data(), typeof option == 'object' && option))));
            }
            if (gui.plugin.isPluginMethodCall(option)) {
                data[option]();
            }
        })
    };

    $.fn.guiCollapse.defaults = {
        toggle: false
    };

    $.fn.guiCollapse.Constructor = GuiCollapse;


    // COLLAPSE NO CONFLICT
    // ====================
//>>>>>>> 8aa611db3915f048d66ffccb306b541812b2d917

	$.fn.guiCollapse.noConflict = function () {
		$.fn.guiCollapse = old;
		return this;
	};

     // COLLAPSE DATA-API
     // =================

     $(document).on('click.gui.collapse.data-api', '[data-toggle=collapse]', function (e) {
         var $this = $(this),
             href,
             target  = $this.attr('data-target') || e.preventDefault() || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]*$)/, ''); //strip for ie6, 7

         if (target) {
             $(target).guiCollapse("toggle");
         }
         return false;
     });
})(window);

(function (window) {
	"use strict";

	var console = window.console,
		$ = window.jQuery,
		gui = window.gui,
		old = $.fn.guiPopup;



	$.fn.guiPopup = function (option) {

		//console.log(this.module)

		//if (option == 'debug') {
			//for debug
			//return module;
		//}
		return this.each(function () {
			$.fn.guiPopup.module._init(this, option);
		});
	}

	$.fn.guiPopup.module = {
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

				$guiPopupCloseBtn.text(this.defaults.closeBtn.text);
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
					//$guiPopupContentNode.html(that.defaults.contentNodes.text);
					$guiPopupContentNode[that.defaults.contentNodes.html ? 'html' : 'text'](that.defaults.contentNodes.contents);

				});
				$regetGuiPopupCloseBtn.click(function () {
					$guiPopupWindow.fadeOut();
				});
			}
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
		mainWrapperClass: 'gui-popup-window',
		contentWrapperClass: 'gui-popup-content',
		contentNodeClass: 'gui-popup-content-node',
		closeBtnWrapperClass: 'gui-popup-closebtn',
		mainBgClass: 'gui-popup-bg',
		wrapper:'body',
		contentNodes: {
			html:false,
			contents: 'JavaScript expressions can be evaluated as values inside .less files. We recommend using caution with this feature as the LESS will not be compilable by ports and it makes the LESS harder to maintain. If possible, try to think of a function that can be added to achieve the same purpose and ask for it on github. We have plans to allow expanding the default functions available. However, if you still want to use JavaScript in .less, this is done by wrapping the expression with back-ticks:'
		},
		closeBtn: {
			text: 'X'
		}
	};

	$.fn.guiPopup.noConflict = function () {
		$.fn.guiPopup = old;
		return this;
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
							"margin-left": -$("." + this.defaults.indicatorTextClass)
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
									"top": $("." + this.defaults.indicatorTextClass)
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
			$("." + this.defaults.btnWrapperClass).on("mousedown",function (e) {
				e.preventDefault();
				slider._saveTarget(e);
			});
			$(document).on("mousemove",function (e) {
				slider._refreshPosition(e);
			});
			$(document).on("mouseup",function (e) {
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

		//define object
	var module = {
		_inputId: {},
		_inputSize: {},
		_wrapperPosition: {},
		_labelPosition: {},
		_init: function (obj,option) {
			this.obj = $(obj);
			this._initOptions(option);
			this._getInputEle();
			this._addPlaceHolderElem();
			this._EventHandler();
			},
		//tested
		_initOptions : function(option){
			this.defaults = $.extend({},$.fn.guiPlaceholder.defaults, option);
		},
		//tesetd
		_getInputEle : function () {
			this.inputTextObj = this.obj.find(this.defaults.inputType);
		},
		//tested
		_addPlaceHolderElem: function () {
			this._getParentPostion();
			for (var i = 0; i < this.inputTextObj.length; i++) {
				this._calculateLabelPostion(i);
				this._getInputSize(i);
				this._getInputId(i);
				$('<label for=' + this._inputId.id + '></label>')
					.insertAfter(this.inputTextObj.eq(i))
					.text(this.defaults.labelText[i])
					.css({
						'width': this._inputSize.width,
						'height': this._inputSize.height,
						'left': this._labelPosition.left + this.defaults.labelOffset.left,
						'top': this._labelPosition.top + this.defaults.labelOffset.top,
						//'margin': this.defaults.labelMargin ? this.defaults.labelMargin : this._inputSize.margin,
						'line-height': this._inputSize.height + 'px',
						'text-indent': this.defaults.labelTextIndent,
						'text-align': this.defaults.labelTextAlign,
						'cursor': 'text',
						'position': 'absolute'
					});
			}
		},
		//tested
		_getInputId: function (i) {
			this._inputId.id = this.inputTextObj.eq(i).attr('id');
			//return this._inputId;//for unit test
		},
		//tested
		_getInputSize: function (i) {
			this._inputSize.width = this.inputTextObj.eq(i).outerWidth();
			this._inputSize.height = this.inputTextObj.eq(i).outerHeight();
			this._inputSize.margin = this.inputTextObj.eq(i).css("margin");
			//return this._inputSize;//for unit test
		},
		//tested
		_getParentPostion: function () {
			this._wrapperPosition.left = this.obj.offset().left;
			this._wrapperPosition.top = this.obj.offset().top;
			//return this._wrapperPosition;//for unit test
		},
		//tested
		_calculateLabelPostion: function (i) {
			var inputNodes = this.inputTextObj;
			var inputLeft = inputNodes.eq(i).offset().left;
			var inputTop = inputNodes.eq(i).offset().top;
			var inputMarginTop = parseInt(inputNodes.eq(i).css('margin-top'), 10);
			var inputMarginLeft = parseInt(inputNodes.eq(i).css('margin-left'), 10);

			this._labelPosition.left = Math.abs(this._wrapperPosition.left - inputLeft + inputMarginLeft);
			this._labelPosition.top = Math.abs(this._wrapperPosition.top - inputTop + inputMarginTop);
			//return this._labelPosition;//for unit test
		},
		//tested
		_EventHandler: function () {
			var defaults = this.defaults;
			this.obj.delegate('label', 'mousedown', function (e) {
				e.preventDefault();
			});
			this.obj.delegate(this.defaults.inputType, 'focus', function () {
				$(this)
					.parent()
					.find('label')
					.eq($(this).index(defaults.inputType))
					.stop(true, true)
					.fadeOut(defaults.animateSpeed);
			});
			this.obj.delegate(this.defaults.inputType, 'blur', function () {
				if($(this).val() === ''){
					$(this)
						.parent()
						.find('label')
						.eq($(this).index(defaults.inputType))
						.stop(true, true)
						.fadeIn(defaults.animateSpeed);
				}
			});
		}
	}

	$.fn.guiPlaceholder = function (option) {

		//$.extend({},placeholder.defaults, option);

		return this.each(function(){
			module._init(this,option);
		});
	}

	$.fn.guiPlaceholder.defaults = {
		labelText: [],
		//labelMargin: '',
		labelTextAlign: 'left',
		labelOffset: {'top': 0, 'left': 0},
		labelTextIndent: '5px',
		animateSpeed: 300,
		inputType: 'input'
	};

	//for debug
	$.fn.guiPlaceholder.debug = module;

	$.fn.guiPlaceholder.noConflict = function () {
		$.fn.guiPlaceholder = old;
		return this;
	};

})(window);

/*!
 * Bootstrap v3.0.0
 *
 * Copyright 2013 Twitter, Inc
 * Licensed under the Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Designed and built with all the love in the world by @mdo and @fat.
 */

/*!
 * We imported some codes of bootstrap, and added our own's
 */

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
        gui = window.gui;

    // BUTTON PUBLIC CLASS DEFINITION
    // ==============================

    var GuiButton = function (element, options) {
        this.$element = $(element);
        this.options = $.extend({}, GuiButton.DEFAULTS, options);
    };

    GuiButton.DEFAULTS = {
        loadingText: 'loading...'
    };

    GuiButton.prototype.setState = function (state) {
        var d = 'disabled',
            $el = this.$element,
            val = $el.is('input') ? 'val' : 'html',
            data = $el.data();

        state = state + 'Text';

        if (!data.resetText) {
            $el.data('resetText', $el[val]());
        }

        $el[val](data[state] || this.options[state]);

        // push to event loop to allow forms to submit
        setTimeout(function () {
            state == 'loadingText' ?
                $el.addClass(d).attr(d, d) :
                $el.removeClass(d).removeAttr(d);
        }, 0);
    };

    GuiButton.prototype.toggle = function () {
        var $parent = this.$element.closest('[data-toggle="buttons"]');

        if ($parent.length) {
            var $input = this.$element.find('input');
            if ($input.prop('type') === 'checkbox') {
                $input.prop('checked', !this.$element.hasClass('active'))
                    .trigger('change');
            } else if ($input.prop('type') === 'radio') {
                $parent.find('.active').removeClass('active');
                if(!$input.prop('checked')) {
                    $input.prop('checked', true).trigger('change');
                }
            }
        }

        this.$element.toggleClass('active');
    };

    // BUTTON PLUGIN DEFINITION
    // ========================

    var old = $.fn.guiButton;

    $.fn.guiButton = function (option) {
        this.each(function () {
            var $this = $(this),
                data = $this.data('gui.button'),
                options = typeof option == 'object' && option;

            if (!data) {
                $this.data('gui.button', (data = new GuiButton(this, options)));
            }

            if (option == 'toggle') {
                data.toggle();
            }
            else if (option) {
                data.setState(option);
            }
        });

        return gui.plugin.patch($.fn.guiButton, this, option);
    }

    $.fn.guiButton.Constructor = GuiButton;

    // NO CONFLICT
    // ===============

    $.fn.guiButton.noConflict = function () {
        $.fn.guiButton = old;
        return this;
    };

    // BUTTON DATA-API
    // ===============

    $(window.document).on('click.gui.button.data-api', '[data-toggle^=button]', function (e) {
        var $btn = $(e.target);
        if (!$btn.hasClass('gui-btn')) {
            $btn = $btn.closest('.gui-btn');
        }
        $btn.guiButton('toggle');
        e.preventDefault();
    });

})(window);
(function (window, undefined) {
	"use strict";

	var console = window.console,
		$ = window.jQuery,
		gui = window.gui,
		old = $.fn.guiDatePicker;

	var module = {
		_init:function(obj,option){
			this.obj = obj;
			this._initOptions(option);
			this._initNewDate();
			this._getNewDate();
			//this._setNowHighlight();
			this._appendElem();
			this._iptFocus();
		},
		//
		_calNowHighlight : function(){
			var now = new Date(),
				nowYear = now.getFullYear(),
				nowMonth = now.getMonth();
			var objCur = this._getNewDate();
			var objCurYear = objCur.year,
				objCurMonth = objCur.month;
			if(nowYear == objCurYear && nowMonth == objCurMonth){
				return true;
			}
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
			this._highlightToday();
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
				mo._highlightToday();
			});
		},
		//test covered by the others
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
		//
		_highlightToday : function(){
			if(this._calNowHighlight()){
				var now = new Date();
				var nowDate = now.getDate();
				var firstDay = this._calFirstDay();
				var tdIndex = nowDate + firstDay - 1;
				var dateObj = $('.' + this.defaults.mainWrapper).find('.' + this.defaults.dates + ' td');
				dateObj.eq(tdIndex).addClass(this.defaults.todayClass);
			}
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

		return this.each(function(){});
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
		todayClass : "gui-date-today",
		//dateInput : "gui-date-input",
		topNode : "body",
		initNewDate : new Date(),
		dateSpliter : '-',
		weekTitle : ['日','一','二','三','四','五','六']
	}

	//for debug
	$.fn.guiDatePicker.debug = module;

	$.fn.guiDatePicker.noConflict = function () {
		$.fn.guiDatePicker = old;
		return this;
	};

})(window);
/* ========================================================================
 * GUI: button-bar.js v0.1.0
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
        console = window.console,
        gui = window.gui,
        old = $.fn.guiButtonBar;

    $.fn.guiButtonBar = function (option) {
        var defaults = {
            selectedIndex: -1
            },
            options = $.extend({}, defaults, option);

        this.each(function () {
            var $this = $(this),
                data = $this.data(),
                $$children;
            if (data.toggle && data.toggle.indexOf("buttons") != -1) {
                if (options.selectedIndex > -1) {
                    $$children = $this.children(".gui-btn");
                    if (options.selectedIndex < $$children.length) {
                        $($$children[0]).guiButton("toggle");
                    }
                }
            }
        });

        return gui.plugin.patch($.fn.guiButtonBar, this, option);
    };

    // NO CONFLICT
    // ===============

    $.fn.guiButtonBar.noConflict = function () {
        $.fn.guiButtonBar = old;
        return this;
    };
})(window);
/* ========================================================================
 * GUI: affix.js v0.1.0
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
        old = $.fn.guiAffix;

    $.fn.guiAffix = function (option) {
        this.each(function () {
            var $this = $(this),
                data = $this.data();

            $this.css("position", "fixed");
            data.offset = data.offset || {};
            if (typeof data.offset != "object") {
                data.offset = {top: data.offset, left: data.offset};
            }
            if (data.offsetTop === 0 || data.offsetTop) data.offset.top = data.offsetTop;
            if (data.offsetBottom === 0 || data.offsetBottom) data.offset.bottom = data.offsetBottom;
            if (data.offsetLeft === 0 || data.offsetLeft) data.offset.left = data.offsetLeft;
            if (data.offsetRight === 0 || data.offsetRight) data.offset.right = data.offsetRight;

            if (option) {
                if (typeof option.offset === "object") {
                    $.extend(data, option);
                } else if (option.offset === 0 || (typeof option.offset === "string" && option.offset)) {
                    data.offset = {top: option.offset, left: option.offset};
                }
            }

            $this.css(data.offset);
        });

        return gui.plugin.patch($.fn.guiAffix, this, option);
    };

    // AFFIX NO CONFLICT
    // =================

    $.fn.guiAffix.noConflict = function () {
        $.fn.guiAffix = old;
        return this;
    };

    // AFFIX DATA-API
    // ==============

    $(function () {
        $(".js-affix").guiAffix();
    });

})(window);

//
(function (window, undefined) {
	"use strict";

	var console = window.console,
		$ = window.jQuery,
		gui = window.gui,
		old = $.fn.guiCarousel;

	$.fn.guiCarousel = function (option) {

		var module = {
			_init: function (obj, option) {
				this.obj = obj;
				this._initOptions(option);
				this._eventHandler();
				this._initAutoSlide();
			},
			_autoAnim: true,
			_initOptions: function (option) {
				this.defaults = $.extend({}, $.fn.guiCarousel.defaults, option);
			},
			_eventHandler: function () {
				var that = this;

				$(this.obj)
					.find('[data-slide=next]')
					.on("click", function (e) {

						e.preventDefault();

						var nextPram = that._calNextItemIndex();

						that._toSlide(nextPram.num, nextPram.dir, that);
						that._refreshIndicator(that);
					});

				$(this.obj)
					.hover(function () {
						that._autoAnim = false;
					}, function () {
						that._autoAnim = true;
					})
				$(this.obj)
					.find('[data-slide=prev]')
					.on("click", function (e) {

						e.preventDefault();

						var prevPram = that._calPrevItemIndex();

						that._toSlide(prevPram.num, prevPram.dir, that);
						that._refreshIndicator(that);
					});
				$(this.obj)
					.find(this.defaults.indicators + " li")
					.on("click", function (e) {

						var targetClicked = e.target;

						var nextPram = that._calIndicatorBtnIndex(targetClicked);
						var curItemIndex = that._getCurrentItemIndex();

						if(nextPram.num != curItemIndex){
							that._toSlide(nextPram.num, nextPram.dir, that);
							that._refreshIndicator(that);
						}
					})
			},
			_getCurrentItemIndex: function () {

				var curIndex = $(this.obj).find(".carousel-inner .active.item").index();

				return curIndex;
			},
			_calNextItemIndex: function () {

				var lastIndex = $(this.obj).find(".carousel-inner").find(".item").last().index();

				var nextIndex;

				if (this._getCurrentItemIndex() === lastIndex) {
					nextIndex = 0;
				} else {
					nextIndex = this._getCurrentItemIndex() + 1;
				}
				return {num: nextIndex, dir: "next"};
			},
			_calPrevItemIndex: function () {

				var lastIndex = $(this.obj).find(".carousel-inner").find(".item").last().index();

				var prevIndex;

				if (this._getCurrentItemIndex() === 0) {
					prevIndex = lastIndex;
				} else {
					prevIndex = this._getCurrentItemIndex() - 1;
				}
				return {num: prevIndex, dir: "prev"};
			},
			_calIndicatorBtnIndex: function (target) {

				var nextIndex = parseInt($(target).attr("data-slide-to"), 10);

				var curIndex = this._getCurrentItemIndex();

				var direction;

				if (nextIndex > curIndex) {
					direction = "next";
				} else {
					direction = "prev";
				}
				return {num: nextIndex, dir: direction};
			},
			_refreshIndicator: function (that) {

				$(that.obj)
					.find(".carousel-inner .active.item")
					.promise()
					.done(function () {

						var index = $(that.obj).find(".carousel-inner .prev.item ,.carousel-inner .next.item").index();

						$(that.obj)
							.find('.carousel-indicators li')
							.eq(index)
							.addClass("active")
							.siblings()
							.removeClass("active");
					})
			},
			_toSlide: function (num, dir, that) {
				var $activeObj = $(that.obj).find(".carousel-inner .active.item");
				var $otherObj = $(that.obj).find(".carousel-inner .item");

				if (!$activeObj.is(":animated")) {

					switch (dir) {
						case "next":

							//$otherObj.eq(num).addClass("next").css({"left": "100%"});

							$activeObj.stop(false, true).animate(
								{"left": "-100%"}
								, "linear", function () {
									$activeObj.removeClass("active");
								});

							$otherObj.eq(num).addClass("next").css({"left": "100%"}).stop(false, true).animate({
								"left": "0"
								}, "linear", function () {
								$otherObj.eq(num)
									.removeClass("next")
									.addClass("active");
								});

							break;
						case "prev":

							$otherObj.eq(num).addClass("prev").css({"left": "-100%"});

							$activeObj.stop(false, true).animate(
								{"left": "100%"}
								, "linear", function () {
									$activeObj.removeClass("active");
								});

							$otherObj.eq(num).stop(false, true).animate(
								{"left": "0"}
								, "linear", function () {
								$otherObj.eq(num)
									.removeClass("prev")
									.addClass("active");
							});

							break;
					}
				}
			},
			_initAutoSlide: function () {
				var animTime = this.defaults.animTime;
				var autoSlide = this.defaults.autoSlide;
				var that = this;

				if (autoSlide) {
					var t = setInterval(function () {
						that._autoSlide()
					}, animTime);
				}
			},
			_autoSlide: function () {
				if (this._autoAnim) {
					$(this.obj)
						.find('[data-slide=next]')
						.trigger("click");
				}
			}
		};

		//for debug
		if(option == 'debug'){
			return module;
		}

		return this.each(function () {
			module._init(this, option);
		});
	};

	$.fn.guiCarousel.defaults = {
		indicators: ".carousel-indicators",
		inner: ".carousel-inner",
		innerItem: ".item",
		prevBtn: ".carousel-control-left",
		nextBtn: ".carousel-control-right",
		animSpeed: 500,
		animTime: 5000,
		hoverToStop: true,
		autoSlide: true
	};

	$.fn.guiCarousel.noConflict = function () {
		$.fn.guiCarousel = old;
		return this;
	};

	//for debug
	//$.fn.guiCarousel.debug = module;

})(window);
/* ========================================================================
 * GUI: breadcrumb.js v0.1.0
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

    var document = window.document,
        console = window.console,
        $ = window.jQuery,
        gui = window.gui,
        old = $.fn.guiBreadcrumb;

    // COLLAPSE PUBLIC CLASS DEFINITION
    // ================================

    var GuiBreadcrumb = function (element, options) {
        this.$element = $(element);
        this.options = options;
    };

    GuiBreadcrumb.prototype.init = function () {
        if (this.options.seperator) {
            var seperator = this.options.seperator;
            this.$element.find("> li:not(:first-child)").each(function () {
                var $this = $(this);
                $this.addClass("gui-with-seperator");
                if ($this.find(".gui-breadcrumb-sperator").length === 0) {
                    $('<span class="gui-breadcrumb-sperator">' + seperator + '</span>').prependTo($this);
                }
            });
        }
        this.update();
    };

    GuiBreadcrumb.prototype.update = function () {
        var $lastChild = this.$element.children("li:last-child");
        if ($lastChild) {
            $lastChild.addClass("active");
            var $link = $lastChild.children("a");
            if ($link) {
                $link.replaceWith($link.text());
            }
        }
    };

    /**
     * remove child after param childOrIndex
     * @param childOrIndex
     */
    GuiBreadcrumb.prototype.removeAfter = function (childOrIndex) {
        var $$children = this.$element.children("li");
        if (typeof childOrIndex !== "number")  {
            childOrIndex = $$children.index(childOrIndex);
        }
        gui.removeChildAfter($$children, childOrIndex);
        if (childOrIndex === 0 && !this.options.requireSelection) {
            this.$element.empty();
        }
        this.update();
    };

    // COLLAPSE PLUGIN DEFINITION
    // ==========================

    $.fn.guiBreadcrumb = function (option) {
        this.each(function () {
            var $this = $(this),
                data = $this.data('gui.breadcrumb');

            if (!data) {
                $this.data('gui.breadcrumb', (data = new GuiBreadcrumb(this, $.extend({}, $.fn.guiBreadcrumb.defaults, $this.data(), typeof option == 'object' && option))));
            }
            data.init();
        });
        return gui.plugin.patch($.fn.guiBreadcrumb, this, option);
    };

    $.fn.guiBreadcrumb.defaults = {
        requireSelection: true
    };

    $.fn.guiBreadcrumb.Constructor = GuiBreadcrumb;


    // COLLAPSE NO CONFLICT
    // ====================

    $.fn.guiBreadcrumb.noConflict = function () {
        $.fn.guiBreadcrumb = old;
        return this;
    };

    // BREADCRUMB DATA-API
    // =================

    $(document).on('click.gui.breadcrumb.data-api', '.gui-breadcrumb > li a', function () {
        var $this = $(this),
            href = $this.attr('href');

        if (href) {
            href = gui.stripHref(href); //strip for ie6, 7
        }
        if (!href || href == "#" || href.indexOf("javascript") === 0) {
            var $li = $this.closest("li"),
                $breadcrumb = $li.closest(".gui-breadcrumb");

            $breadcrumb.data("gui.breadcrumb").removeAfter($li);
            return false;
        }
    });

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

(function (window, undefined) {
    "use strict";

    var console = window.console,
        document = window.document,
        $ = window.jQuery,
        gui = window.gui,
        old = $.fn.guiSplitter;

    var GuiSplitter = function (element, options) {
        this.$element = $(element);
        this.$firstPart = this.$element.find("> .gui-splitter-part-first");
        this.$secondPart = this.$element.find("> .gui-splitter-part-second");
        this.$splitBar = $('<div class="gui-splitter-control-bar"></div>');
        this.$ghostSplitBar = undefined; // splitbar ghosted element
        this.options = options;
        this.transitioning = false;
        this.splitPosition = 0; // current split position
        this.savedSplitPosition = 0; // saved split position
        this.minWidth = Math.max(options.minWidth ? parseInt(options.minWidth, 10) : 0); // min width of first part
        this.maxWidth = Math.min(options.maxWidth ? parseInt(options.maxWidth, 10) : this.$element.width());
        this.padding = this.$element.css(options.vertical ? "padding-top" : "padding-left");
        this.padding = this.padding ? parseInt(this.padding, 10) : 0;
    };

    GuiSplitter.prototype.init = function () {
        this.$firstPart.after(this.$splitBar);
        this.splitPosition = this.$firstPart.width() - this.$splitBar.outerWidth(true);
        this.$firstPart.width(this.splitPosition);
        var that = this;
        if (this.options.closeable) {
            this.$closeButton = $('<div class="gui-splitter-close-btn"></div>');
            this.$splitBar.append(this.$closeButton);
            this.maxWidth = Math.max(this.maxWidth - this.$splitBar.outerWidth(true), 0);
            this.$closeButton.mousedown(function () {
                that.$closeButton.toggleClass("gui-splitter-close-btn-inverse").hide();
                that.splitTo();
            });
        }
        this.$splitBar.on("mousedown", function (e) {
            if (e.target == this) {
                that.startDrag(e.pageX);
            }
        });
    };

    GuiSplitter.prototype.startDrag = function (mousePosition) {
        this.$ghostSplitBar = this.$ghostSplitBar || this.$splitBar.clone(false).insertAfter(this.$firstPart);
        this.$ghostSplitBar.addClass("gui-splitter-control-bar-ghost").css({
            width: this.$splitBar.width(),
            height: this.$splitBar.height()
        });
        var that = this,
            startPosition = this.splitPosition + this.padding;
        this.$ghostSplitBar.css("left", startPosition);
        this.$ghostSplitBar.show();
        $(document).on("mousemove.gui.splitter", function (e) {
            that.performDrag(startPosition, e.pageX - mousePosition);
        }).on("mouseup.gui.splitter", function () {
                that.endDrag();
            });
    };

    GuiSplitter.prototype.performDrag = function (startPosition, increment) {
        var position = Math.min(this.maxWidth + this.padding, Math.max(this.minWidth + this.padding, startPosition + increment));
        this.$ghostSplitBar.css("left", position);
    };

    GuiSplitter.prototype.endDrag = function () {
        $(document).off(".gui.splitter");
        this.splitTo(parseInt(this.$ghostSplitBar.css("left")) - this.padding);
    };

    GuiSplitter.prototype.splitTo = function (position) {
        if (this.transitioning) {
            return;
        }
        this.transitioning = true;
        var that = this;
        if (position || position == 0) {
            this.$firstPart.animate({width: position}, this.options.animationDuration, function () {
                that.transitioning = false;
                that.splitPosition = position;
                that.$closeButton.fadeIn("fast");
                that.$ghostSplitBar.hide();
            });
            this.$secondPart.animate({width: this.$element.width() - this.$splitBar.outerWidth(true) - position}, this.options.animationDuration);
        } else {
            if (this.splitPosition > 0) {
                this.savedSplitPosition = this.splitPosition;
                position = 0;
            } else {
                position = this.savedSplitPosition;
            }
            this.$firstPart.animate({width: position}, this.options.animationDuration, function () {
                that.transitioning = false;
                that.splitPosition = position;
                that.$closeButton.fadeIn("fast");
            });
            this.$secondPart.animate({width: this.$element.width() - this.$splitBar.outerWidth(true) - position}, this.options.animationDuration);
        }
    };

    $.fn.guiSplitter = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data("gui.splitter");

            if (!data) {
                $this.data("gui.splitter", (data = new GuiSplitter(this, $.extend({}, $.fn.guiSplitter.defaults, $this.data(), typeof option == 'object' && option))));
                data.init();
            }
            if (gui.plugin.isPluginMethodCall(option)) {
                data[option]();
            }
        });
    };

    $.fn.guiSplitter.defaults = {
        closeable: true,
        animationDuration: "fast"
    };

    $.fn.guiSplitter.Constructor = GuiSplitter;

    // NO CONFLICT
    // ===============

    $.fn.guiSplitter.noConflict = function () {
        $.fn.guiSplitter = old;
        return this;
    };
})(window);
(function (window) {
	"use strict";

	var console = window.console,
		$ = window.jQuery,
		gui = window.gui,
		old = $.fn.guiTooltip;

	$.fn.guiTooltip = function (option) {

		var module = {
			_init: function (obj, option) {
				this.obj = obj;
				this._eventHandler();
			},
			_initOptions: function (option) {
				this.defaults = $.extend({}, $.fn.guiCollapse.defaults, option);
			},
			//_findTooltipEle: function () {
				//var $tooltipEle = $(this.obj).find("[data-toggle=tooltip]");
				//return $tooltipEle;
			//},
			_setTooltipCssPos : function(){
				if($(this.obj).css("position") == "static"){
					$(this.obj).css("position","relative");
				}
			},
			_eventHandler: function () {
				var that = this;

				$(this.obj).on("mouseover", "[data-toggle=tooltip]", function (e) {

					if(that._judgeTooltipNode(e)){

						var $TooltipWp = that._appendTooltip(e);

						that._setTooltipPos(e, $TooltipWp);
					}

					that._setTooltipCssPos();

					$(e.target)
						.next(".tooltip")
						.stop()
						.animate({"opacity": 1});
				});

				$(this.obj).on("mouseout", "[data-toggle=tooltip]", function (e) {
					$(e.target)
						.next(".tooltip")
						.animate({"opacity": 0}, function () {
							$(this).remove()
						});
				});
			},
			_judgeTooltipNode : function(e){
				return $(e.target).next('.tooltip').length === 0;
			},
			_appendTooltip: function (e) {
				//if (this._judgeTooltipNode(e)) {

					var direction;

					if ($(e.target).attr("data-placement") !== undefined) {
						direction = $(e.target).attr("data-placement");
					} else {
						direction = "top";
					}

					var $TooltipWp = $('<div class="tooltip"></div>');

					var $TooltipArrow = $('<div class="tooltip-arrow ' + direction + '"></div>');

					var $TooltipInner = $('<div class="tooltip-inner">' + $(e.target).attr("data-original-title") + '</div>');

					$TooltipWp.append($TooltipArrow).append($TooltipInner);

					$TooltipWp.insertAfter($(e.target));

					//this._setTooltipPos(e, $TooltipWp);

					return $TooltipWp;
				//}
			},
			_setTooltipPos: function (e, tooltipEle) {

				var pos = this._calTooltipPos(e, tooltipEle);

				tooltipEle.css({"left": pos.left, "top": pos.top});

			},
			_calTooltipPos: function (e, tooltipEle) {
				var parentOffset = $(this.obj).offset();

				var targetOffset = $(e.target).offset();

				var tooltipOrgEleWidth = $(e.target).outerWidth();
				var tooltipOrgEleHeight = $(e.target).outerHeight();

				var w = tooltipEle.outerWidth();
				var h = tooltipEle.outerHeight();

				var direction = $(e.target).attr('data-placement');

				var calculatedLeft,
					calculatedTop;

				switch (direction) {
					case "top":
						calculatedLeft = Math.abs(parentOffset.left - targetOffset.left) + tooltipOrgEleWidth / 2 - w / 2;
						calculatedTop = Math.abs(parentOffset.top - targetOffset.top) - h;
						break;
					case "right":
						calculatedLeft = Math.abs(parentOffset.left - targetOffset.left) + tooltipOrgEleWidth;
						calculatedTop = Math.abs(parentOffset.top - targetOffset.top) + tooltipOrgEleHeight / 2 - h / 2;
						break;
					case "bottom":
						calculatedLeft = Math.abs(parentOffset.left - targetOffset.left) + tooltipOrgEleWidth / 2 - w / 2;
						calculatedTop = Math.abs(parentOffset.top - targetOffset.top) + tooltipOrgEleHeight;
						break;
					case "left":
						calculatedLeft = Math.abs(parentOffset.left - targetOffset.left) - w;
						calculatedTop = Math.abs(parentOffset.top - targetOffset.top) + tooltipOrgEleHeight / 2 - h / 2;
						break;
					default:
						calculatedLeft = Math.abs(parentOffset.left - targetOffset.left) + tooltipOrgEleWidth / 2 - w / 2;
						calculatedTop = Math.abs(parentOffset.top - targetOffset.top) - h;
						break;
				}
				return {left: calculatedLeft, top: calculatedTop}
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

	$.fn.guiTooltip.defaults = {

	};

	//for debug
	//$.fn.guiTooltip.debug = module;

	$.fn.guiTooltip.noConflict = function () {
		$.fn.guiTooltip = old;
		return this;
	};
})(window);

(function (window) {
	"use strict";

	var console = window.console,
		$ = window.jQuery,
		gui = window.gui,
		old = $.fn.guiAutocomplete;

	var module = function(obj,option){
		this._init(obj,option);
	}

	module.prototype = {
			_init : function(obj,option){
				this.obj = obj;
				this._initOptions(option);
				this._appendListWrapper();
				this._eventHandler();
			},
			_initOptions : function (option) {
				this.defaults = $.extend({}, $.fn.guiAutocomplete.defaults, option);
			},
			_appendListWrapper : function(){

				var $autocompleteNode = $("<ul>");

				$autocompleteNode
					.insertAfter($(this.obj));

				$autocompleteNode.css({"width":"300px","height":"200px"});

				$autocompleteNode.addClass("autocomplete");
			},
			_calculatePos : function(e){
				var parentPos = $(e.target).offsetParent().offset();
				var ePos = $(e.target).offset();

				var eH = $(e.target).outerHeight() - parseInt($(e.target).css("margin-bottom"),10);

				$(e.target)
					.next('.autocomplete')
					.css({"left":ePos.left - parentPos.left,"top":ePos.top - parentPos.top + eH});
			},
			_getData : function(callback){
				$.ajax({
					url:'localhost:3000/',
					data:11,
					dataType : "json",
					success : function(data){
						//callback();
						console.log(data);
					},
					error : function(){
						console.log(11);
					}
				})
			},
			_setInputVal : function(text){
				this.inputVal = text;
			},
			_tempInputVal : function(text){
				$(this.obj).val(text);
			},
			_switchOption : function(){

				var inputCurVal = $(this.obj).val();

				this._clearList();

				if(inputCurVal.length > 0){

					for(var i = 0; i < this.defaults.data.length; i++){

						if(this.defaults.data[i].indexOf(inputCurVal.toLowerCase()) >= 0 ){

							this._appendList(this.defaults.data[i]);

						}
					}
				}
				if($(this.obj).next('.autocomplete').find("li").length > 0){
					this._showList();
				}else{
					this._hideList();
				}
			},
			_clearList : function(){
				$(this.obj)
					.next('.autocomplete')
					.html('');
			},
			_showList : function(){
				$(this.obj)
					.next('.autocomplete')
					.css({"display":"block"})
					.stop(true,true)
					.animate({"opacity":1});
			},
			_hideList : function(){
				$(this.obj)
					.next('.autocomplete')
					.stop(true,true)
					.css({"display":"none","opacity":0});
			},
			_highLightOption : function($element){
				$(this.obj)
					.next('.autocomplete')
					.find("li")
					.removeClass("active");
					
				$element.addClass("active");
			},
			_getNextIndex : function(){
				var nextVisible;
									
				if($(this.obj).next('.autocomplete').find("li.active").length === 0){

					nextVisible = $(this.obj).next('.autocomplete').find('li').eq(0);

				}else{

					nextVisible = $(this.obj).next('.autocomplete').find('li.active').next();

				}

				return nextVisible;
			},
			_getPrevIndex : function(){
				var prevVisible;
									
				if($(this.obj).next('.autocomplete').find("li.active").length === 0){

					prevVisible = $(this.obj).next('.autocomplete').find('li').last();

				}else{

					prevVisible = $(this.obj).next('.autocomplete').find('li.active').prev();

				}
				
				return prevVisible;
			},
			_appendList : function(text){
				$(this.obj)
					.next('.autocomplete')
					.append('<li><a>' + text + '</a></li>');
			},
			_eventHandler : function(){

				var that = this;

				$(this.obj)
					.on("focus",function(e){
						that._switchOption();
						that._calculatePos(e);
					});

				$(this.obj)
					.on("keydown",function(e){
						if(e.keyCode === 38){
							e.preventDefault();
						}
					});

				$(this.obj)
					.on("blur",function(e){
						$(e.target)
							.next('.autocomplete')
							.animate({"opacity":0},function(){
								$(this).css({"display":"none"})
							});
					});

				$(this.obj)
					.on("input",function(e){

						that._setInputVal($(this).val());

						that._switchOption();
						
					})

				$(this.obj)
					.on("keyup",function(e){
						switch(e.keyCode){
							case 40:
								if($(this).next('.autocomplete').find("li").length > 0){

									var $nextEle = that._getNextIndex();

									var $nextEleTxt = $nextEle.text();

									that._highLightOption($nextEle);

									if($(this).next('.autocomplete').find("li.active").length === 0){
										that._tempInputVal(that.inputVal);
									}else{
										that._tempInputVal($nextEleTxt);
									}
								}
								break;

							case 38:
								if($(this).next('.autocomplete').find("li").length > 0){

									var $prevEle = that._getPrevIndex();

									var $prevEleTxt = $prevEle.text();

									that._highLightOption($prevEle);

									if($(this).next('.autocomplete').find("li.active").length === 0){
										that._tempInputVal(that.inputVal);
									}else{
										that._tempInputVal($prevEleTxt);
									}								
								}
								break;

							case 13:
								if($(this).next('.autocomplete').find('li.active').length !== 0 ){
									var txt = $(this).next('.autocomplete').find('li.active').text();
									that._setInputVal(txt);
								}
								break;

 							case 37:
								if($(this).next('.autocomplete').find('li.active').length !== 0 ){
									var txt = $(this).next('.autocomplete').find('li.active').text();
									that._setInputVal(txt);
								}
								break;

							case 39:
								if($(this).next('.autocomplete').find('li.active').length !== 0 ){
									var txt = $(this).next('.autocomplete').find('li.active').text();
									that._setInputVal(txt);
								}
								break;
						}
					});

				$(this.obj)
					.next('.autocomplete')
					.on("mouseover","a",function(e){
						that._selectOption(e);
					});

				$(this.obj)
					.next('.autocomplete')
					.on("click","a",function(e){
						$(that.obj).val($(this).text())
					});
			},
			_selectOption : function(e){
				$(e.target)
					.parent()
					.addClass("active")
					.siblings()
					.removeClass("active");
			}
		}

	$.fn.guiAutocomplete = function (option) {

		return this.each(function () {

			new module(this,option);

		});
	};

	$.fn.guiAutocomplete.Constructor = module;
	
	$.fn.guiAutocomplete.defaults = {
		data:['111','222','333','444','555','666','777','888','999','000','111','222','333','444','555','666','777','888','999']
	};

	$.fn.guiAutocomplete.noConflict = function () {
		$.fn.guiAutocomplete = old;
		return this;
	};

})(window);
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
/* ========================================================================
 * GUI: ie-patch.js v0.1.0
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

(function (window, undefined) {
    "use strict";

    var console = window.console,
        $ = window.jQuery,
        gui = window.gui;

    if (!gui.browserInfo.isIE)
        return;

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

    if (!!$.fn.guiNav) {
        $.fn.guiNav.iePatch = function ($$guiNav, option) {
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
                        $guiNav.find("li li").each(function () {
                            var $this = $(this);
                            $this.width($this.parent().width());
                            if ($this.children("ul").length > 0) {
                                $this.css("margin-bottom", "-3px");
                            }
                        });
                    } else {
                        $guiNav.children("li").css("margin-left", "-16px").width($guiNav.width());
                        $guiNav.find("li").mouseenter(function () {
                            var $$subMenu = $(this).children("ul");
                            $$subMenu.children("li").width($$subMenu.width());
                        }).each(function () {
                                var $this = $(this);
                                if ($this.children("ul").length > 0) {
                                    $this.css("margin-bottom", "-3px");
                                }
                            });
                    }
                });
            } else if (gui.browserInfo.version <= 7) {
                $$guiNav.each(function () {
                    var $guiNav = $(this),
                        isVertical = $guiNav.hasClass("gui-nav-vertical");
                    if (isVertical) {
                        $guiNav.children("li").css("margin-left", "-16px").width($guiNav.width()).each(function () {
                            var $this = $(this);
                            if ($this.children("ul").length > 0) {
                                $this.css("margin-bottom", "-3px");
                            }
                        });
                    }
                });
            } else if (gui.browserInfo.version <= 8) {
                $$guiNav.each(function () {
                    var $guiNav = $(this),
                        isVertical = $guiNav.hasClass("gui-nav-vertical");
                    if (!isVertical) {
                        $guiNav.children("li:not(:first-child)").css("margin-left", "-4px");
                    }
                });
            }
            return $$guiNav;
        };
    }

    //
    // Tabs
    // --------------------------------------------------

    if (!!$.fn.guiTab) {
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

    if (!!$.fn.guiButton) {
        if (gui.browserInfo.version <= 6) {  // lte IE 6
            var GuiButton = $.fn.guiButton.Constructor;
            GuiButton.prototype.toggle = function () {
                var $parent = this.$element.closest('[data-toggle="buttons"]');
                if (this.$element.data("active") === undefined) {
                    this.$element.data("active", false);
                }
                this.$element.data("active", !this.$element.data("active"));
                if ($parent.length) {
                    var buttonStyle = /gui\-btn\-[^\s]+/.exec(this.$element.attr("class"));
                    var $input = this.$element.find('input');
                    if ($input.prop('type') === 'checkbox') {
                        $input.prop('checked', this.$element.data("active"))
                            .trigger('change');
                        if (this.$element.data("active")) {
                            this.$element.addClass(buttonStyle + "-active");
                        }
                    } else if ($input.prop('type') === 'radio') {
                        $parent.find("." + buttonStyle + "-active").removeClass(buttonStyle + "-active").data("active", false);
                        this.$element.data("active", true);
                        this.$element.addClass(buttonStyle + "-active");
                        if(!$input.prop('checked')) {
                            $input.prop('checked', true).trigger('change');
                        }
                    }
                }
            }
        }

        $.fn.guiButton.iePatch = function ($$guiButton, option) {
            if (gui.plugin.isPluginInitialize(option)) {
                if (gui.browserInfo.version <= 9) {
                    $("a.disabled").click(function () {
                        return false;
                    });
                }
                if (gui.browserInfo.version <= 6) { // lte IE 6
                    $$guiButton.each(function () {
                        var $this = $(this),
                            buttonStyle;
                        if ($this.hasClass("disabled") || $this.attr("disabled")) {
                            $this.css("cursor", "not-allowed");
                        } else {
                            buttonStyle = /gui\-btn\-[^\s]+/.exec(this.className);
                            $this.hover(function () {
                                $this.addClass(buttonStyle + "-active");
                            }, function () {
                                if (!$this.data("active")) {
                                    $this.removeClass(buttonStyle + "-active");
                                }
                            });
                        }
                    });
                }
            }
            return $$guiButton;
        };
    }

    //
    // Button bar
    // --------------------------------------------------

    if (!!$.fn.guiButtonBar) {
        $.fn.guiButtonBar.iePatch = function ($$guiButtonBar, option) {
            if (gui.browserInfo.version <= 6) { // lte IE 6
                $$guiButtonBar.find(".gui-btn + .gui-btn").css("margin-left", "-1px");
                $$guiButtonBar.each(function () {
                    var $this = $(this);
                    if ($this.data("toggle") == "buttons") {
                        $this.find('> .gui-btn > input[type="radio"]').css("display", "none");
                        $this.find('> .gui-btn > input[type="checkbox"]').css("display", "none");
                    }
                });
            }
            return $$guiButtonBar;
        };
    }

    //
    // Affix.js
    // --------------------------------------------------

    if (!!$.fn.guiAffix) {
        $.fn.guiAffix.iePatch = function ($$guiAffix, option) {
            if (gui.browserInfo.version <= 6) { // lte IE 6
                var $window = $(window);
                $$guiAffix.detach().appendTo($("body")).css("position", "absolute");

                $$guiAffix.each(function () {
                    var $this = $(this),
                        data = $this.data();
                    if (!data.affixed) {
                        $this.data("affixed", true);
                        $window.on("scroll.gui.affix.data-api", function () {
                            if (data.offset.top === 0 || data.offset.top) {
                                $this.css("top", $window.scrollTop() + parseInt(data.offset.top, 10) + "px");
                            } else if (data.offset.bottom === 0 || data.offset.bottom) {
                                $this.css("top", $window.scrollTop() + $window.height() - $this.outerHeight() - parseInt(data.offset.bottom, 10) + "px");
                            }
                            if (data.offset.left === 0 || data.offset.left) {
                                $this.css("left", $window.scrollLeft() + parseInt(data.offset.left, 10) + "px");
                            } else if (data.offset.right === 0 || data.offset.right) {
                                $this.css("left", $window.scrollLeft() + $window.width() - $this.outerWidth() - parseInt(data.offset.right, 10) + "px");
                            }
                        });
                    }
                });
            }
            return $$guiAffix;
        };
    }

    //
    // Table Plugin
    // --------------------------------------------------
    $.fn.guiTable = function () {
        if (gui.browserInfo.version <= 6) { // lte IE 6
            this.find("thead:first-child tr:first-child").find("th, td").css("border-top", 0);
        }
        if (gui.browserInfo.version <= 8) { // lte IE 8
            this.each(function () {
                var $this = $(this);
                if ($this.hasClass("gui-table-striped")) {
                    $this.find("> tbody > tr:nth-child(odd)").addClass("nth-child-odd");
                }
                if (gui.browserInfo.version <= 6) { // lte IE 6
                    if ($this.hasClass("gui-table-hover")) {
                        $this.find("> tbody > tr").hover(function () {
                            var state = /success|danger|warning/.exec(this.className);
                            $(this).addClass(state ? state + "-hover" : "hover");
                        }, function () {
                            var state = /success|danger|warning/.exec(this.className);
                            $(this).removeClass(state ? state + "-hover" : "hover");
                        });
                    }
                }
            });
        }
        return this;
    };

    //
    // Panels
    // --------------------------------------------------
    $.fn.guiPanel = function () {
        if (gui.browserInfo.version <= 7) { // lte IE 7
            this.find("> .gui-panel-body + .gui-table").addClass("gui-table-beside-gui-panel-body");
        }
        if (gui.browserInfo.version <= 6) { // lte IE 6
            this.find("[data-toggle=collapse]").css("cursor", "pointer");
            this.each(function () {
                var $this = $(this),
                    $parent = $this.parent(),
                    inPanelGroup = $parent.hasClass("gui-panel-group");
                if (inPanelGroup) {
                    $parent.find(".gui-panel + .gui-panel").addClass("gui-panel-beside-gui-panel");
                    $this.find(".gui-panel-heading + .gui-panel-collapse").addClass("gui-panel-collapse-beside-heading");
                    $this.find(".gui-panel-footer + .gui-panel-collapse").addClass("gui-panel-collapse-beside-footer");
                }
            });
        }
        return  this;
    };

    //
    // Breadcrumbs
    // --------------------------------------------------
    if (!!$.fn.guiBreadcrumb) {
        if (gui.browserInfo.version <= 7) { // lte IE 7
            var GuiBreadcrumb = $.fn.guiBreadcrumb.Constructor;
            GuiBreadcrumb.prototype.init = function () {
                var seperator = this.options.seperator;
                this.$element.find("> li:not(:first-child)").each(function () {
                    var $this = $(this);
                    if ($this.find(".gui-breadcrumb-sperator").length === 0) {
                        $('<span class="gui-breadcrumb-sperator">' + (seperator || '/') + '</span>').prependTo($this);
                    }
                });
                this.update();
            };
        }
    }

})(window);
