$(function () {

    var $ = window.jQuery;

    module("slider [global]");

    test("should provide no conflict", function () {
        var guiSlider = $.fn.guiSlider.noConflict();
        ok(!$.fn.guiSlider, 'guiTab was set back to undefined (org value)');
        $.fn.guiSlider = guiSlider;
    });

    test("should be defined on jquery object", function () {
        ok($(document.body).guiSlider, 'guiTab method is defined');
    });

    test("should return element", function () {
        ok($(document.body).guiSlider()[0] == document.body, 'document.body returned');
    });

    /*module("slider [local]");
	test("mouse based interaction",function(){
		expect(4)
	});
	
	
	test("test for the test-setup", function () {
        ok($(".gui-slider").length === 1, 'specific dom returned');
    });*/
	//test("append btn wrapper & indicatorWrapper", function () {
		//var node_1 = $($.fn.guiSlider.defaults.btnWrapperClass);
		//var node_2 = $($.fn.guiSlider.defaults.indicatorTextClass);
        //ok(node_1.length == 1, 'specific dom returned');
		//ok(node_2.length == 1, 'specific dom returned');
    //});

});