(function (window, undefined) {
	"use strict";

	var console = window.console,
		$ = window.jQuery,
		grace = window.grace,
		old = $.fn.graceSlider;

	$.fn.graceSlider = function (option) {

		var slider = {
			defaults: {
				step: 1,
				btnClass: '.btn',
				btns: [0, 'max'],
				btnSize: {
					width: 30,
					height: 30
				},
				rangeBar: true,
				rangeBarClass: '.range-selector-bar',
				btnWrapperClass: '.range-selector-btn',
				indicatorTextClass: '.range-selector-indicator',
				indicatorText: true,
				data: {
					indicatordata: ['09/01', '09/03', '09/04', '09/05', '09/06', '09/07', '09/01', '09/03', '09/04', '09/06', '09/07', '09/01', '09/03']
				},
				remote: {}//'type':'POST','url':'','data':'','dataType':'JSON'
			},
			_init: function (obj) {
				this._initVaribles(obj);
				this._initNodeWrapper();
				this._initFetchData();
			},
			_sliceSelectorSymbol: function (name) {
				var reg = /[.#]*/;
				return name = name.replace(reg, '');
			},
			_initFetchData: function () {
				if (this.defaults.remote.url !== undefined) {
					$.ajax({
						type: this.defaults.remote.type,
						url: this.defaults.remote.url,
						data: this.defaults.remote.data,
						dataType: this.defaults.remote.dataType
					}).done(function () {
							this._initFunctions();
						}).fail(function () {
							alert('failed');
						})
				} else if (this.defaults.data.indicatordata !== undefined) {
					this._initFunctions();
				}
			},
			_initFunctions: function () {
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
					this.rangeSelectorBar = this.obj.find(this.defaults.rangeBarClass);
				}
			},
			_initNodeWrapper: function () {
				$('<div class="' + this._sliceSelectorSymbol(this.defaults.btnWrapperClass) + '"></div>').appendTo(this.obj);
				if (this.defaults.indicatorText) {
					$('<div class="' + this._sliceSelectorSymbol(this.defaults.indicatorTextClass) + '"></div>').appendTo(this.obj);
				}
			},
			_initBtns: function () {
				for (var i = 0; i < this.defaults.btns.length; i++) {
					this.index[i] = (this.defaults.btns[i] === 'max') ? this.defaults.data.indicatordata.length - 1 : this.defaults.btns[i];
					$('<a class="' + this._sliceSelectorSymbol(this.defaults.btnClass) + '"></a>').appendTo($(this.defaults.btnWrapperClass))
						.css({"left": this.index[i] / (this.defaults.data.indicatordata.length - 1) * 100 + "%",
							"width": this.defaults.btnSize.width,
							"height": this.defaults.btnSize.height,
							"margin-left": -(this.defaults.btnSize.width / 4),
							"margin-top": -(this.defaults.btnSize.height / 4)});
				}
			},
			_initAddIndicatorText: function () {
				if (this.defaults.indicatorText) {
					for (var i = 0; i < this.defaults.data.indicatordata.length; i++) {
						$('<span>' + this.defaults.data.indicatordata[i] + '</span>').appendTo($(this.defaults.indicatorTextClass))
							.css({"left": i / (this.defaults.data.indicatordata.length - 1) * 100 + "%",
								"margin-left": -($(this.defaults.indicatorTextClass).find('span').eq(i).width() / 2) + $(this.defaults.btnWrapperClass).find(this.defaults.btnClass).outerWidth() / 4});
					}
					if (parseInt($(this.defaults.indicatorTextClass).find("span").outerWidth(), 10) * this.defaults.data.indicatordata.length > $(this.defaults.rangeBarClass).outerWidth()) {
						for (var i = 0; i < this.defaults.data.indicatordata.length; i++) {
							if (i % 2 === 0) {
								$(this.defaults.indicatorTextClass).find("span")
									.eq(i)
									.css("top", $(this.defaults.indicatorTextClass).find("span").height());
							}
						}
					}
				}
			},
			_eventCapture: function () {
				var slider = this;
				$(this.defaults.btnWrapperClass).mousedown(function (e) {
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
				this.moveDistance = (parseInt($(this.defaults.btnWrapperClass).width(), 10)) / (this.defaults.data.indicatordata.length - 1);
				this.moveDistance = Math.round(this.moveDistance);
			},
			_refreshPosition: function (e) {
				this.curX = e.pageX;
				if (this.curTarget.className === 'btn') {
					if (this._calculateMoveDirection() === 1 && this.index[$(this.curTarget).index()] < this.defaults.data.indicatordata.length - 1) {
						this.index[$(this.curTarget).index()] += 1 * this.defaults.step;
						$(this.curTarget).css({"left": (this.index[$(this.curTarget).index()] / (this.defaults.data.indicatordata.length - 1) * 100 + "%")});
						this.orgX = $(this.curTarget).offset().left + parseInt($(this.curTarget).width(), 10) / 2;
					} else if (this._calculateMoveDirection(e) === -1 && this.index[$(this.curTarget).index()] > 0) {
						this.index[$(this.curTarget).index()] -= 1 * this.defaults.step;
						$(this.curTarget).css({"left": (this.index[$(this.curTarget).index()] / (this.defaults.data.indicatordata.length - 1) * 100 + "%")});
						this.orgX = $(this.curTarget).offset().left + parseInt($(this.curTarget).width(), 10) / 2;
					}
				}
				this._refreshRangeBarPosition(e);
			},
			_renderRangeBar: function () {
				if (this.defaults.rangeBar) {
					if ($(this.defaults.btnWrapperClass).find(this.defaults.rangeBarClass).length <= 0) {
						$('<a class="' + this._sliceSelectorSymbol(this.defaults.rangeBarClass) + '"></a>').appendTo($(this.defaults.btnWrapperClass));
					}
					this._refreshRangeBarPosition();
				}
			},
			_refreshRangeBarPosition: function (e) {
				var btnLeft = [];
				if (this.curTarget.className === this._sliceSelectorSymbol(this.defaults.rangeBarClass)) {
					if (this._calculateMoveDirection() === 1 && this._checkRangeBarMoveRange()) {
						for (var i = 0; i < this.index.length; i++) {
							this.index[i] += this.defaults.step;
							$(this.defaults.btnWrapperClass).find(this.defaults.btnClass).eq(i).css({"left": (this.index[i] / (this.defaults.data.indicatordata.length - 1) * 100 + "%")});
						}
						this.orgX = this.curX;
					} else if (this._calculateMoveDirection() === -1 && this._checkRangeBarMoveRange()) {
						for (var i = 0; i < this.index.length; i++) {
							this.index[i] -= this.defaults.step;
							$(this.defaults.btnWrapperClass).find(this.defaults.btnClass).eq(i).css({"left": (this.index[i] / (this.defaults.data.indicatordata.length - 1) * 100 + "%")});
						}
						this.orgX = this.curX;
					}
				}
				for (var i = 0; i < $(this.defaults.btnWrapperClass).find(this.defaults.btnClass).length; i++) {
					btnLeft.push(parseInt($(this.defaults.btnWrapperClass).find(this.defaults.btnClass).eq(i).css("left"), 10));
				}
				var rangeBar = Math.abs(btnLeft[0] - btnLeft[1]);
				$(this.defaults.btnWrapperClass).find(this.defaults.rangeBarClass)
					.css({'width': rangeBar, 'left': btnLeft[0] - btnLeft[1] > 0 ? btnLeft[1] + this.defaults.btnSize.width / 4 : btnLeft[0] + this.defaults.btnSize.width / 4});
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
					for (var i = 0; i < this.index.length; i++) {
						if (this.index[i] - 1 < 0) {
							return false;
						}
					}
					return true;
				}
			},
			_saveTarget: function (e) {
				this.curTarget = e.target;
				this.orgX = e.pageX;
				this.curOffset = parseInt(e.target.style.left, 10);
			},
			_checkTarget: function (e) {
				return this.curTarget === e.target;
			},
			_destroyTarget: function () {
				this.curTarget = "";
			}
		}

		$.extend(slider.defaults, option);

		slider._init(this);

		return this;
	}

	$.fn.graceSlider.noConflict = function () {
		$.fn.graceSlider = old;
		return this;
	};

})(window);


/*$(function(){
 //fetch dataDemo via ajax just for test
 var dataDemo = {date:['09/01','09/03','09/04','09/05','09/06','09/07','09/01','09/03','09/04','09/06','09/07','09/01','09/03']};

 var slider = {
 init:function(){
 this._initBtns();
 this._calculateMoveDistance();
 this._eventCapture();
 this._renderRangeBar();
 this._addIndicatorText();
 },
 options:{
 step:1,
 btns:[0,'max'],
 btnSize:{
 width:30,
 height:30
 },
 rangeBar:true,
 rangeBarClass:'range-selector-bar',
 btnWrapper:'range-selector-btn',
 indicatorText:true
 },
 curTarget:{},
 index:[],
 _initBtns:function(){
 for(i = 0 ; i < this.options.btns.length ; i++){
 this.index[i] = (this.options.btns[i] === 'max') ? dataDemo.date.length-1 : this.options.btns[i];
 $('<a class="btn"></a>').appendTo('.range-selector-btn').css({"left" : this.index[i] / (dataDemo.date.length - 1) * 100 + "%" , "width" : this.options.btnSize.width , "height" : this.options.btnSize.height, "margin-left" : - (this.options.btnSize.width / 4), "margin-top" : - (this.options.btnSize.height / 4)});
 }
 },
 _addIndicatorText:function(){
 if(this.options.indicatorText){
 for(i = 0;i < dataDemo.date.length;i++){
 $('<span>' + dataDemo.date[i] + '</span>').appendTo($('.range-selector-indicator')).css({"left":i / (dataDemo.date.length - 1) * 100 +"%", "margin-left" : - (this.options.btnSize.width / 4)});
 }
 if(parseInt($('.range-selector-indicator').find("span").outerWidth()) * dataDemo.date.length > $(".range-selector-bar").outerWidth()){
 for(i = 0;i < dataDemo.date.length;i++){
 if(i % 2 === 0){
 $('.range-selector-indicator').find("span").eq(i).css("top",$('.range-selector-indicator').find("span").height());
 }
 }
 }
 }
 },
 _eventCapture:function(){
 $('.range-selector-btn').mousedown(function(e){
 e.preventDefault();
 slider._saveTarget(e);
 });
 $(document).mousemove(function(e){
 slider._refreshPosition(e);
 });
 $(document).mouseup(function(e){
 slider._destroyTarget();
 });
 },
 _checkMoveStep:function(){
 return Math.abs(this.curX - this.orgX) > this.moveDistance * this.options.step * 0.8
 },
 _calculateMoveDirection:function(){
 if( this._checkMoveStep() ){
 if(this.curX  - this.orgX > 0){
 return 1;
 }else if(this.curX  - this.orgX < 0){
 return -1;
 }
 }
 },
 _calculateMoveDistance:function(){
 this.moveDistance = (parseInt($('.range-selector-btn').width()) ) / (dataDemo.date.length -1);
 this.moveDistance = Math.round(this.moveDistance);
 },
 _refreshPosition:function(e){
 this.curX = e.pageX;
 if(this.curTarget.className === 'btn'){
 if(this._calculateMoveDirection() === 1 && this.index[$(this.curTarget).index()] < dataDemo.date.length -1){
 this.index[$(this.curTarget).index()] += 1 * this.options.step;
 $(this.curTarget).css({"left":(this.index[$(this.curTarget).index()] / (dataDemo.date.length - 1) * 100 + "%")});
 this.orgX = $(this.curTarget).offset().left + parseInt($(this.curTarget).width(),10) / 2;
 }else if(this._calculateMoveDirection(e) === -1 && this.index[$(this.curTarget).index()] > 0){
 this.index[$(this.curTarget).index()] -= 1 * this.options.step;
 $(this.curTarget).css({"left":(this.index[$(this.curTarget).index()] / (dataDemo.date.length - 1) * 100 + "%")});
 this.orgX = $(this.curTarget).offset().left + parseInt($(this.curTarget).width(),10) / 2;
 }
 }
 this._refreshRangeBarPosition(e);
 },
 _renderRangeBar:function(){
 if(this.options.rangeBar){
 if($('.range-selector-btn').find("." + this.options.rangeBarClass).length <= 0){
 $("<a class='" + this.options.rangeBarClass + "'></a>").appendTo('.range-selector-btn');
 }
 this._refreshRangeBarPosition();
 }
 },
 _refreshRangeBarPosition:function(e){
 if(this.curTarget.className === this.options.rangeBarClass){
 if(this._calculateMoveDirection() === 1 && this._checkRangeBarMoveRange()){
 for(i = 0; i < this.index.length; i++){
 this.index[i] += 1 * this.options.step;
 $('.range-selector-btn').find('.btn').eq(i).css({"left":(this.index[i] / (dataDemo.date.length - 1) * 100 + "%")});
 }
 this.orgX = this.curX;
 }else if(this._calculateMoveDirection() === -1 && this._checkRangeBarMoveRange()){
 for(i = 0; i < this.index.length; i++){
 this.index[i] -= 1 * this.options.step;
 $('.range-selector-btn').find('.btn').eq(i).css({"left":(this.index[i] / (dataDemo.date.length - 1) * 100 + "%")});
 }
 this.orgX = this.curX;
 }
 }
 var btnLeft = []
 for(i = 0; i < $('.range-selector-btn').find('.btn').length; i++){
 btnLeft.push(parseInt($('.range-selector-btn').find('.btn').eq(i).css("left")));
 }
 var rangeBar = Math.abs(btnLeft[0] - btnLeft[1]);
 $('.range-selector-btn').find("." + this.options.rangeBarClass).css({'width':rangeBar,'left':btnLeft[0] - btnLeft[1] > 0 ? btnLeft[1] + this.options.btnSize.width / 4 : btnLeft[0] + this.options.btnSize.width / 4});
 },
 _checkRangeBarMoveRange:function(){
 if(this._calculateMoveDirection() === 1){
 for(i = 0; i < this.index.length; i++){
 if(this.index[i] + 1 > dataDemo.date.length - 1){
 return false;
 }
 }
 return true;
 }else if(this._calculateMoveDirection() === -1){
 for(i = 0; i < this.index.length; i++){
 if(this.index[i] - 1 < 0){
 return false;
 }
 }
 return true;
 }
 },
 _saveTarget:function(e){
 this.curTarget = e.target;
 this.orgX = e.pageX;
 this.curOffset = parseInt(e.target.style.left);
 },
 _checkTarget:function(e){
 return this.curTarget === e.target;
 },
 _destroyTarget:function(){
 this.curTarget = "";
 }
 }
 //init program
 slider.init();
 });
 */