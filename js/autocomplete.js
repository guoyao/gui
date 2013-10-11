(function (window) {
    "use strict";

    var console = window.console,
        $ = window.jQuery,
        gui = window.gui,
        old = $.fn.guiAutocomplete;

    var Module = function (obj, option) {
        this._init(obj, option);
    }

    Module.prototype = {
        _init: function (obj, option) {
            this.obj = obj;
            this._initOptions(option);
            this._appendListWrapper();
            this._setAutocompletePos();
            this._eventHandler();
        },
        _initOptions: function (option) {
            this.defaults = $.extend({}, $.fn.guiAutocomplete.defaults, option);
        },
        _appendListWrapper: function () {

            var $autocompleteNode = $('<ul class="autocomplete">');

            $autocompleteNode
                .insertAfter($(this.obj));

            $autocompleteNode
                .css({
                    "width": this.defaults.width,
                    "height": this.defaults.height
                });
        },
        _setAutocompletePos: function () {

            var left,
                top;

            if ($(this.obj).offsetParent()[0] == $("body")[0]) {

                left = $(this.obj).offset().left;
                top = $(this.obj).offset().top + $(this.obj).outerHeight();

            } else {

                var parentPos = $(this.obj).offsetParent().offset();
                var ePos = $(this.obj).offset();

                var eH = $(this.obj).outerHeight() - parseInt($(this.obj).css("margin-bottom"), 10);

                left = ePos.left - parentPos.left;
                top = ePos.top - parentPos.top + eH;

            }

            $(this.obj)
                .next('.autocomplete')
                .css({
                    "left": left,
                    "top": top
                });
        },
        _getData: function (callback) {
            $.ajax({
                url: 'localhost:3000/',
                data: 11,
                dataType: "json",
                success: function (data) {
                    //callback();
                    //console.log(data);
                },
                error: function () {
                    //console.log(11);
                }
            })
        },
        _setInputVal: function (text) {
            this.inputVal = text;
        },
        _tempInputVal: function (text) {
            $(this.obj).val(text);
        },
        _switchOption: function () {

            var inputCurVal = $(this.obj).val();

            this._clearList();

            if (inputCurVal.length > 0) {

                for (var i = 0; i < this.defaults.data.length; i++) {

                    if (this.defaults.data[i].indexOf(inputCurVal.toLowerCase()) >= 0) {

                        this._appendList(this.defaults.data[i]);

                    }
                }
            }
            if ($(this.obj).next('.autocomplete').find("li").length > 0) {
                this._showList();
            } else {
                this._hideList();
            }
        },
        _clearList: function () {
            $(this.obj)
                .next('.autocomplete')
                .html('');
        },
        _showList: function () {
            $(this.obj)
                .next('.autocomplete')
                .fadeIn();
        },
        _hideList: function () {
            $(this.obj)
                .next('.autocomplete')
                .fadeOut();
        },
        _highLightOption: function ($element) {
            $(this.obj)
                .next('.autocomplete')
                .find("li")
                .removeClass("active");

            $element.addClass("active");
        },
        _getNextIndex: function () {
            var nextVisible;

            if ($(this.obj).next('.autocomplete').find("li.active").length === 0) {

                nextVisible = $(this.obj).next('.autocomplete').find('li').eq(0);

            } else {

                nextVisible = $(this.obj).next('.autocomplete').find('li.active').next();

            }

            return nextVisible;
        },
        _getPrevIndex: function () {
            var prevVisible;

            if ($(this.obj).next('.autocomplete').find("li.active").length === 0) {

                prevVisible = $(this.obj).next('.autocomplete').find('li').last();

            } else {

                prevVisible = $(this.obj).next('.autocomplete').find('li.active').prev();

            }

            return prevVisible;
        },
        _appendList: function (text) {
            $(this.obj)
                .next('.autocomplete')
                .append('<li><a>' + text + '</a></li>');
        },
        _eventHandler: function () {

            var that = this;

            $(this.obj)
                .on("focus", function (e) {
                    that._switchOption();
                });

            $(this.obj)
                .on("keydown", function (e) {
                    if (e.keyCode === 38) {
                        e.preventDefault();
                    }
                });

            $(this.obj)
                .on("blur", function (e) {
                    $(e.target)
                        .next('.autocomplete')
                        .fadeOut();
                });

            $(this.obj)
                .on("keyup", function (e) {

                    var txt;

                    switch (e.keyCode) {
                        case 40:
                            if ($(this).next('.autocomplete').find("li").length > 0) {

                                var $nextEle = that._getNextIndex();

                                var $nextEleTxt = $nextEle.text();

                                var str = $nextEle.toString();

                                that._highLightOption($nextEle);

                                if ($(this).next('.autocomplete').find("li.active").length === 0) {
                                    that._tempInputVal(that.inputVal);
                                } else {
                                    that._tempInputVal($nextEleTxt);
                                }
                            }
                            break;

                        case 38:
                            if ($(this).next('.autocomplete').find("li").length > 0) {

                                var $prevEle = that._getPrevIndex();

                                var $prevEleTxt = $prevEle.text();

                                that._highLightOption($prevEle);

                                if ($(this).next('.autocomplete').find("li.active").length === 0) {
                                    that._tempInputVal(that.inputVal);
                                } else {
                                    that._tempInputVal($prevEleTxt);
                                }
                            }
                            break;

                        case 13:
                            if ($(this).next('.autocomplete').find('li.active').length !== 0) {
                                txt = $(this).next('.autocomplete').fadeOut().find('li.active').text();
                                that._setInputVal(txt);
                            }
                            break;

                        case 37:
                            if ($(this).next('.autocomplete').find('li.active').length !== 0) {
                                txt = $(this).next('.autocomplete').fadeOut().find('li.active').text();
                                that._setInputVal(txt);
                            }
                            break;

                        case 39:
                            if ($(this).next('.autocomplete').find('li.active').length !== 0) {
                                txt = $(this).next('.autocomplete').fadeOut().find('li.active').text();
                                that._setInputVal(txt);
                            }
                            break;

                        default :
                            that._setInputVal($(this).val());

                            that._switchOption();

                            break;
                    }
                });

            $(this.obj)
                .next('.autocomplete')
                .on("mouseover", "a", function (e) {
                    that._selectOption(e);
                });

            $(this.obj)
                .next('.autocomplete')
                .on("click", "a", function (e) {
                    $(that.obj).val($(this).text());
                    that.inputVal = $(this).text();
                });
        },
        _selectOption: function (e) {
            $(e.target)
                .parent()
                .addClass("active")
                .siblings()
                .removeClass("active");
        }
    }

    $.fn.guiAutocomplete = function (option) {
        return this.each(function () {
            new Module(this, option);
        });
    };

    $.fn.guiAutocomplete.Constructor = Module;

    $.fn.guiAutocomplete.defaults = {
        data: [],
        width: '300px',
        height: '200px',
        remote: {}
    };

    $.fn.guiAutocomplete.noConflict = function () {
        $.fn.guiAutocomplete = old;
        return this;
    };

})(window);