$(function () {

	var $ = window.jQuery;

	module("placeholder");

	test("should provide no conflict", function () {
		var gracePlaceholder = $.fn.gracePlaceholder.noConflict();
		ok(!$.fn.gracePlaceholder, 'gracePlaceholder was set back to undefined (org value)');
		$.fn.gracePlaceholder = gracePlaceholder;
	});

	test("should be defined on jquery object", function () {
		ok($(document.body).gracePlaceholder, 'graceTab method is defined');
	});

	test("should return element", function () {
		ok($(document.body).gracePlaceholder()[0] == document.body, 'document.body returned');
	});

//	test("should return element", function () {
//		var preloadHTML = $('<div class="place-holder">' +
//			'<input type="text" id="place-holder-demo-input" class="place-holder-input"/>' +
//			'<input type="text" id="l2" class="place-holder-input"/>' +
//			'<input type="text" id="l3" class="place-holder-input"/>' +
//			'<input type="text" id="l4" class="place-holder-input"/>' +
//			'<input type="image" id="l7" class="place-holder-input"/>' +
//			'</div>');
//		preloadHTML.appendTo("#qunit-fixture");
//
//		ok($(document.body).gracePlaceholder[0] == document.body, 'document.body returned');
//	});

});
