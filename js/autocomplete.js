(function (window) {
	"use strict";

	var console = window.console,
		$ = window.jQuery,
		gui = window.gui,
		old = $.fn.guiAutocomplete;

	$.fn.guiAutocomplete = function (option) {

		var module = {
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

				for(var i = 0; i < this.defaults.data.length; i++){
					$('<li><a>' + this.defaults.data[i] + '</a></li>').appendTo($autocompleteNode)
				}

				$autocompleteNode.css({"width":"300px","height":"200px"});

				$autocompleteNode.addClass("autocomplete");
			},
			_getData : function(){
				$.ajax({
					url:'localhost:3000/',
					data:11,
					dataType : "json",
					success : function(data){
						console.log(data);
					},
					error : function(){
						console.log(11);
					}
				})
			},
			_eventHandler : function(){

				var that = this;

				$(this.obj)
					.on("focus",function(e){
						//that._getData();
						$(e.target)
							.next('.autocomplete')
							.css({"display":"block"})
							.animate({"opacity":1});
					});

				$(this.obj)
					.on("blur",function(e){
						$(e.target)
							.next('.autocomplete')
							.animate({"opacity":0},function(){
								$(this).css({"display":"none"})});
					});

				$(this.obj)
					.on("keydown",function(e){
						//console.log(e)
						//if(e.keyCode == 40){
							//console.log('ok')
						//}

						//
						var input = $(e.target).val();

						for(var i = 0; i < that.defaults.data.length; i++){
							if(that.defaults.data[i].indexOf(input) < 0){
								$(e.target)
									.next('.autocomplete')
									.find('li')
									.eq(i)
									.css({"display":"none"});
							}else{
								$(e.target)
									.next('.autocomplete')
									.find('li')
									.eq(i)
									.css({"display":"block"});
							};
						}

						switch(e.keyCode){
							case 40:
								//console.log($(e.target).next('.autocomplete').find('li.active').next())
								//var x = ? $(e.target).next('.autocomplete').find('li.active').next() : $(e.target).next('.autocomplete').find('li').eq(0);
								//if($(e.target).next('.autocomplete').find('li.active:visible').length === 0){
									//var index = $(e.target).next('.autocomplete').find('li:visible').eq(0);
								//}else{
									//$(e.target).next('.autocomplete').find('li:visible').find(".active")
									
									var index = $(e.target).next('.autocomplete').find('li.active:visible').nextAll().eq(0);

									var x = $(e.target).next('.autocomplete').find('li').eq(index);

									console.log($(e.target).next('.autocomplete').find('li.active:visible').index())

									//console.log($(e.target).next('.autocomplete').find('li:visible').filter(".active").index() + 1);
									//console.log($(e.target).next('.autocomplete').find('li:visible').eq($(e.target).next('.autocomplete').find('li:visible').filter(".active").index() + 1).index())
								//}
								//console.log($(e.target).next('.autocomplete').find('li.active:visible').length)
								//console.log($(e.target).next('.autocomplete').find('li:visible').filter(".active"))
									$(e.target)
										.next('.autocomplete')
										.find('li')
										.removeClass("active");
										index.addClass("active");
								break;
							case 38:
								if($(e.target).next('.autocomplete').find('li.active:visible').length === 0){
									var x = $(e.target).next('.autocomplete').find('li:visible').last();
								}else{
									var x = $(e.target).next('.autocomplete').find('li.active:visible').prev();
								}
									$(e.target)
									.next('.autocomplete')
									.find('li')
									.removeClass("active");
									x.addClass("active");
								break;
							case 13:
								if($(e.target).next('.autocomplete').find('li.active:visible').length !== 0){
									var inputValue = $(e.target).next('.autocomplete').find('li.active:visible a').text();
									//console.log(inputValue)
									$(e.target).val(inputValue);
								}
								break;
						}
						
					});

				$(this.obj)
					.closest('.autocomplete')
					.on("mouseover","a",function(e){
						that._selectOption();
					});
			},
			_selectOption : function(e){
				$(e.target)
					.addClass("active")
					.siblings()
					.removeClass("active");
			}
		}

		if (option == 'debug') {
			//for debug
			return module;
		}
		return this.each(function () {
			module._init(this, option);
		});
	};

	$.fn.guiAutocomplete.defaults = {
		data:['111','222','333','444','555','666','777','888','999','000','111','222','333','444','555','666','777','888','999']
	};

	$.fn.guiAutocomplete.noConflict = function () {
		$.fn.guiAutocomplete = old;
		return this;
	};

})(window);