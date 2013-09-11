$(function (undefined) {

	var $ = window.jQuery;

	//get test module
	var moduleDebug = $(document).guiCarousel('debug');

	//get the test wrapper
	var mainWp = $("#qunit-fixture");

	var testobj = $('<div id="myCarousel" class="carousel slide">'+
					  '<ol class="carousel-indicators">'+
					    '<li data-target="#myCarousel" data-slide-to="0" class="active"></li>'+
					    '<li data-target="#myCarousel" data-slide-to="1"></li>'+
					    '<li data-target="#myCarousel" data-slide-to="2"></li>'+
					  '</ol>'+
					  '<div class="carousel-inner">'+
					    '<div class="active item">'+
					      '<img src="http://getbootstrap.com/2.3.2/assets/img/bootstrap-mdo-sfmoma-01.jpg"/>'+
					    '</div>'+
					    '<div class="item">'+
					      '<img src="http://getbootstrap.com/2.3.2/assets/img/bootstrap-mdo-sfmoma-02.jpg"/>'+
					    '</div>'+
					    '<div class="item">'+
					      '<img src="http://getbootstrap.com/2.3.2/assets/img/bootstrap-mdo-sfmoma-03.jpg"/>'+
					    '</div>'+
					  '</div>'+
					  '<a class="carousel-control-left" href="#myCarousel" data-slide="prev">&lsaquo;</a>'+
					  '<a class="carousel-control-right" href="#myCarousel" data-slide="next">&rsaquo;</a>'+
					'</div>');

	module("carousel",{
		setup : function(){
			//var moduleDebug = $(document).guiCarousel('debug');

			//append the test node
			testobj.appendTo(mainWp);

			//set test obj to module
			moduleDebug.obj = $("#myCarousel");

		},
		teardown : function(){
			//moduleDebug = undefined;
		}
	});

	/*repeat test for every modules*/
	test("should provide no conflict", function () {
		var guiCarousel = $.fn.guiCarousel.noConflict();
		ok(!$.fn.guiCarousel, 'guiCarousel was set back to undefined (org value)');
		$.fn.guiCarousel = guiCarousel;
	});

	test("should be defined on jquery object", function () {
		ok($(document.body).guiCarousel, 'guiCarousel method is defined');
	});

	test("should return element", function () {
		ok($(document.body).guiCarousel()[0] == document.body, 'document.body returned');
	});

	//_getCurrentItemIndex()
	test("get current item index",function(){
		//get current index
		var curItemIndex = moduleDebug._getCurrentItemIndex();
		//get local current index
		var getLocalCurIndex = $(moduleDebug.obj).find('.active.item').index();

		equal(curItemIndex,getLocalCurIndex,"should be the same index");
	});

	//_calNextItemIndex()
	test("get next item index",function(){
		//get next item param
		var nextItemIndex = moduleDebug._calNextItemIndex();
		//get local current index
		var getLocalCurIndex = $(moduleDebug.obj).find('.active.item').index();
		//calculate local next index
		var calNextIndex = getLocalCurIndex + 1;

		equal(nextItemIndex.num,calNextIndex,"should be the same index");
		equal(nextItemIndex.dir,'next',"should be the next direction");
	});

	//_calPrevItemIndex()
	test("get prev item index",function(){
		//get prev item param
		var prevItemIndex = moduleDebug._calPrevItemIndex();
		//get local current index
		var getLocalPrevIndex = $(moduleDebug.obj).find('.item:last').index();

		equal(prevItemIndex.num,getLocalPrevIndex,"should be the same index");
		equal(prevItemIndex.dir,'prev',"should be the next direction");
	});

	//_calIndicatorBtnIndex()
	test("direct item index",function(){
		//get direct item param
		var directItemIndex = moduleDebug._calIndicatorBtnIndex($(moduleDebug.obj).find('.carousel-indicators li')[2]);
		//get local direct index
		var getLocalPrevIndex = $(moduleDebug.obj).find('.carousel-indicators li').eq(2).index();

		console.log(directItemIndex)

		equal(directItemIndex.num,getLocalPrevIndex,"should be the same index");
		equal(directItemIndex.dir,'next',"should be the next direction");
	});

	//_toSlide()   _refreshIndicator()
	test("test animate function",function(){
		var slideTo = 2;
		//test _toSlide();
		moduleDebug._toSlide(slideTo,"next",moduleDebug);

		var slideToTarget = $(moduleDebug.obj).find('.carousel-indicators li').eq(slideTo).css("display");

		equal(slideToTarget,"block","should be the same index");
	});

});