$(function () {

    var $ = window.jQuery;

    module("slider [global]");

    test("should provide no conflict", function () {
        var graceSlider = $.fn.graceSlider.noConflict();
        ok(!$.fn.graceSlider, 'graceTab was set back to undefined (org value)');
        $.fn.graceSlider = graceSlider;
    });

    test("should be defined on jquery object", function () {
        ok($(document.body).graceSlider, 'graceTab method is defined');
    });

    test("should return element", function () {
        ok($(document.body).graceSlider()[0] == document.body, 'document.body returned');
    });

    module("slider [local]");
	test("mouse based interaction",function(){
		expect(4)
	});
	
	
	test("test for the test-setup", function () {
        ok($(".grace-slider").length === 1, 'specific dom returned');
    });
	//test("append btn wrapper & indicatorWrapper", function () {
		//var node_1 = $($.fn.graceSlider.defaults.btnWrapperClass);
		//var node_2 = $($.fn.graceSlider.defaults.indicatorTextClass);
        //ok(node_1.length == 1, 'specific dom returned');
		//ok(node_2.length == 1, 'specific dom returned');
    //});

});