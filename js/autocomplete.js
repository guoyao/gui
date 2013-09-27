(function (window) {
	"use strict";

	var console = window.console,
		$ = window.jQuery,
		gui = window.gui,
		old = $.fn.guiAutocomplete;

	

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
			_calculatePos : function(e){
				var parentPos = $(e.target).offsetParent().offset();
				var ePos = $(e.target).offset();

				var eH = $(e.target).outerHeight() - parseInt($(e.target).css("margin-bottom"),10);

				console.log($(e.target).css("margin-top"))

				$(e.target)
					.next('.autocomplete')
					.css({"left":ePos.left - parentPos.left,"top":ePos.top - parentPos.top + eH})

				//console.log(parentPos,ePos)
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
						that._calculatePos(e)
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
								$(this).css({"display":"none"})});
					});

				var orgval;

				$(this.obj)
					.on("input",function(e){
						orgval = $(e.target).val();
						//$(e.target).data("orgval",orgval);

						//var input = $(e.target).val();

						var display = false;

						for(var i = 0; i < that.defaults.data.length; i++){
							if(that.defaults.data[i].indexOf(orgval.toLowerCase()) < 0){
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
						//console.log($(e.target)
							//.next('.autocomplete')
							//.find('li[style="display:block"]').length)

						//if(display){
							//$(e.target)
								//.next('.autocomplete')
								//.css({"display":"block"})
								//.animate({"opacity":1});
						//}
						
					})
				
				$(this.obj)
					.on("keyup",function(e){
						console.log(e.keyCode)

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

								if(nextVisible.length === 0){
									$(e.target).val(orgval);
								}else{
									$(e.target).val(nextVisible.text());
								}

								break;

							case 38:
								//e.preventDefault();
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

								if(prevVisible.length === 0){
									$(e.target).val(orgval);
								}else{
									$(e.target).val(prevVisible.text());
								}

								break;

							case 13:
								var inputValue = $(e.target).next('.autocomplete').find('li.active:visible a').text();
								if($(e.target).next('.autocomplete').find('li.active:visible').length !== 0 ){//&& inputValue != $(e.target).val()
									//var inputValue = $(e.target).next('.autocomplete').find('li.active:visible a').text();
									
									//$(e.target).val(inputValue);
									//console.log(inputValue)
									$(e.target).data("orgval",inputValue);
								}
								break;

 							case 37:
 								var inputValue = $(e.target).next('.autocomplete').find('li.active:visible a').text();
								if($(e.target).next('.autocomplete').find('li.active:visible').length !== 0 ){
									$(e.target).data("orgval",inputValue);
								}
								break;

							case 39:
								var inputValue = $(e.target).next('.autocomplete').find('li.active:visible a').text();
								if($(e.target).next('.autocomplete').find('li.active:visible').length !== 0 ){
									$(e.target).data("orgval",inputValue);
								}
						}
						//console.log($(e.target).next('.autocomplete').find('li:visible').length)
						//if($(e.target).next('.autocomplete').find('li:visible').length === 0){
							//$(e.target)
								//.next('.autocomplete')
								//.animate({"opacity":0},function(){
									//$(this).css({"display":"none"})});
						//}else{
							//$(e.target)
								//.next('.autocomplete')
								//.css({"display":"block"})
								//.animate({"opacity":1});
						//}
					});

				$(this.obj)
					.next('.autocomplete')
					.on("mouseover","a",function(e){
						//console.log(e.target)
						that._selectOption(e);
					});

				$(this.obj)
					.next('.autocomplete')
					.on("click","a",function(e){
						//console.log(e.target)
						console.log(1)
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

		//if (option == 'debug') {
			//for debug
			//return module;
		//}
		
		//var m = new module(this,option);
		//$.fn.guiAutocomplete._init(this,option);
		//console.log($.fn.guiAutocomplete.fn)

		//$.fn.guiAutocomplete.module 

		//$.fn.guiAutocomplete.fn._init(this,option)

		//xdule._init(this,option);
		//module._init(this, option);
		
		return this.each(function () {
			//$.fn.guiAutocomplete.module._init(this,option)
			new module._init(this,option);
		});
	};

	$.fn.guiAutocomplete.module = module;

		

	
	$.fn.guiAutocomplete.defaults = {
		data:['111','222','333','444','555','666','777','888','999','000','111','222','333','444','555','666','777','888','999']
	};

	$.fn.guiAutocomplete.noConflict = function () {
		$.fn.guiAutocomplete = old;
		return this;
	};

})(window);