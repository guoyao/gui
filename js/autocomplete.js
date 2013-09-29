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

				//for(var i = 0; i < this.defaults.data.length; i++){
				//	$('<li><a>' + this.defaults.data[i] + '</a></li>').appendTo($autocompleteNode)
				//}

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
			//get input value
			_getInputVal : function(){
				var inputVal = $(this.obj).val();
				return inputVal;
			},
			//query option of data
			_switchOption : function(){

				var orgval = this._getInputVal();

				this._clearList();

				if(orgval.length > 0){

					for(var i = 0; i < this.defaults.data.length; i++){

						if(this.defaults.data[i].indexOf(orgval.toLowerCase()) >= 0 ){

							this._appendList(this.defaults.data[i]);

						}
					}
				}
				//console.log($(this.obj).next('.autocomplete').find("li").length)
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
			_highLightOption : function(index){
				$(this.obj)
					.next('.autocomplete')
					.css({"display":"none"});
			},
			//
			_appendList : function(text){
				$(this.obj)
					.next('.autocomplete')
					.append('<li><a>' + text + '</a></li>');
			},
			//
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

				var orgval;

				$(this.obj)
					.on("input",function(e){
						orgval = $(e.target).val();
						//$(e.target).data("orgval",orgval);

						that._switchOption();
						
					})

				$(this.obj)
					.on("keyup",function(e){
						switch(e.keyCode){
							case 40:
							
								if($(this).next('.autocomplete').find("li").length > 0){

									var nextVisible;
									
									if($(this).next('.autocomplete').find("li.active").length === 0){

										nextVisible = $(e.target).next('.autocomplete').find('li').eq(0);

									}else{

										nextVisible = $(e.target).next('.autocomplete').find('li.active').next();
									}

									$(this)
										.next('.autocomplete')
										.find('li')
										.removeClass("active");

									nextVisible.addClass("active");

									$(this).val(nextVisible.text())
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