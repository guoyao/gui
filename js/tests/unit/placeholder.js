$(function () {

	var $ = window.jQuery,
        $testWrapper = $("#qunit-fixture");

	module("placeholder",{
		setup : function(){
			$testWrapper.append('<div class="test-div"><input class="test-input" id="test-id" type="text" data-default-text="please input 1"/></div>');
		}
	});

	test("should provide no conflict", function () {
		var guiPlaceholder = $.fn.guiPlaceholder.noConflict();
		ok(!$.fn.guiPlaceholder, 'guiPlaceholder was set back to undefined (org value)');
		$.fn.guiPlaceholder = guiPlaceholder;
	});

	test("should be defined on jquery object", function () {
		ok($(".test-input").guiPlaceholder, 'guiTab method is defined');
	});

	test("should return element", function () {
		equal($(".test-input").guiPlaceholder()[0] , $(".test-input")[0], 'document.body returned');
	});

	test("should insert lable after target input",function(){

		$(".test-input").guiPlaceholder();

		var $label = $(".test-input").next("label");

		equal($label.length , 1 , "Label appended");

	});

	test("should set text of label",function(){

		$(".test-input").guiPlaceholder();

		var $label = $(".test-input").next("label");

		var inputPlaceTxt = $(".test-input").attr("data-default-text");

		var labelTxt = $label.text();

		equal(inputPlaceTxt , labelTxt , "text should be the same");

	});

	test("should fade out when focus on input" , function(){

		$(".test-input").guiPlaceholder();

		$(".test-input").trigger("focus");

		stop();

		setTimeout(function() {
		    equal( $(".test-input").next("label").is(":visible") , false , "label should fade out" );
		    start();
		}, 500 );
	});

	test("should fade in when blur on input" , function(){

		$(".test-input").guiPlaceholder();

		$(".test-input").trigger("blur");

		stop();

		setTimeout(function() {
		    equal( $(".test-input").next("label").is(":visible") , true , "label should fade in" );
		    start();
		}, 500 );

	});

	test("should fade in when blur on input" , function(){

		$(".test-input").guiPlaceholder();

		$(".test-input").trigger("focus");

		$(".test-input").val("test");

		$(".test-input").trigger("blur");

		stop();

		setTimeout(function() {
		    equal( $(".test-input").next("label").is(":visible") , false , "label should fade in" );
		    start();
		}, 500 );

	});

});
