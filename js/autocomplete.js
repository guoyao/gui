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
		data:[]
	};

	$.fn.guiAutocomplete.noConflict = function () {
		$.fn.guiAutocomplete = old;
		return this;
	};

})(window);