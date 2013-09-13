$(function (undefined) {

	var $ = window.jQuery;

	var moduleDebug = $(document).guiTooltip('debug');

	//get the test wrapper
	var mainWp = $("#qunit-fixture");

	//test main obj
	var testobj = $('<div class="tooltip-demo">' +
		'<p>I\'m little' +
		'<a data-toggle="tooltip" data-placement="top" data-original-title="hello tophello tophello tophello tophello tophello tophello tophello tophello tophello top">' +
		'top tooltip' +
		'</a>' +
		'!</p>' +
		'<p>I\'m little' +
		'<a data-toggle="tooltip" data-placement="right" data-original-title="hello right">' +
		'right tooltip' +
		'</a>' +
		'!</p>' +
		'<p>I\'m little' +
		'<a data-toggle="tooltip" data-placement="bottom" data-original-title="hello bottom">' +
		'bottom tooltip' +
		'</a>' +
		'!</p>' +
		'<p>I\'m little' +
		'<a data-toggle="tooltip" data-placement="left" data-original-title="hello left">' +
		'left tooltip' +
		'</a>' +
		'!</p>' +
		'</div>');

	module("tooltip", {
		setup: function () {
			testobj.appendTo(mainWp);
			//console.log(testobj.html())

			//set local obj
			moduleDebug.obj = $(".tooltip-demo");
		}, teardown: function () {

		}
	});

	//_judgeTooltipNode()  _eventHandler()
	test("judge the tooltip element is exist or not", function () {

		var ifNodeExist;
		//bind test event
		$("[data-toggle=tooltip]").on("mouseover",function(e){
			ifNodeExist = moduleDebug._judgeTooltipNode(e);
			console.log(ifNodeExist)
			//console.log(ifNodeExist)
		});
		//trigger mouseover event for test
		$("[data-toggle=tooltip]").trigger("mouseover");

		//console.log($(".tooltip-demo"))
		//console.log($(".tooltip").length)

		equal(ifNodeExist , true, "tooltip should not be exist!");
	});
	//_judgeTooltipNode()  _eventHandler()
	test("judge the tooltip element is exist or not", function () {

		moduleDebug._eventHandler();

		var ifNodeExist;
		//bind test event
		$("[data-toggle=tooltip]").on("mouseover",function(e){
			//console.log($(e.target).next('.tooltip').length)
			ifNodeExist = moduleDebug._judgeTooltipNode(e);
			console.log(ifNodeExist)
		});
		//trigger mouseover event for test
		$("[data-toggle=tooltip]").trigger("mouseover");

		//console.log($(".tooltip").length)
		//console.log($(".tooltip").length)

		equal(ifNodeExist , false, "tooltip should not be exist!");
	});

});