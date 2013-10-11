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
