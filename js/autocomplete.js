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
						console.log(e.keyCode)

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

								if($(e.target).next('.autocomplete').find('li.active:visible').length === 0){	

									var nextVisible = $(e.target).next('.autocomplete').find('li:visible').eq(0);

								}else{

									var nextVisible = $(e.target).next('.autocomplete').find('li:visible').filter('.active').nextAll("li:visible").eq(0);

								}

								$(e.target)
									.next('.autocomplete')
									.find('li')
									.removeClass("active");

								nextVisible.addClass("active");

								break;

							case 38:
								e.preventDefault();
								if($(e.target).next('.autocomplete').find('li.active:visible').length === 0){	

									var prevVisible = $(e.target).next('.autocomplete').find('li:visible').last();

								}else{

									var prevVisible = $(e.target).next('.autocomplete').find('li:visible').filter('.active').prevAll("li:visible").eq(0);

								}

								$(e.target)
									.next('.autocomplete')
									.find('li')
									.removeClass("active");

								prevVisible.addClass("active");

								break;

							case 13:
								var inputValue = $(e.target).next('.autocomplete').find('li.active:visible a').text();
								if($(e.target).next('.autocomplete').find('li.active:visible').length !== 0 && inputValue != $(e.target).val()){
									var inputValue = $(e.target).next('.autocomplete').find('li.active:visible a').text();
									
									$(e.target).val(inputValue);
								}
								break;

 							case 37:
 								var inputValue = $(e.target).next('.autocomplete').find('li.active:visible a').text();
								if($(e.target).next('.autocomplete').find('li.active:visible').length !== 0 && inputValue != $(e.target).val()){
									var inputValue = $(e.target).next('.autocomplete').find('li.active:visible a').text();
									
									$(e.target).val(inputValue);
								}
								break;

							case 39:
								var inputValue = $(e.target).next('.autocomplete').find('li.active:visible a').text();
								if($(e.target).next('.autocomplete').find('li.active:visible').length !== 0 && inputValue != $(e.target).val()){
									var inputValue = $(e.target).next('.autocomplete').find('li.active:visible a').text();
									
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