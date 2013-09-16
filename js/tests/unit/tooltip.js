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
	//_judgeTooltipNode()
	test("test tooltip", function () {
		var ifNodeExist;
		//bind test event
		$("[data-toggle=tooltip]").on("mouseover",function(e){
			ifNodeExist = moduleDebug._judgeTooltipNode(e);

		});
		//trigger mouseover event for test
		$("[data-toggle=tooltip]").trigger("mouseover");

		equal(ifNodeExist , true, "tooltip should not be exist!");
	});
	//_judgeTooltipNode()  _appendTooltip()
	test("test tooltip", function () {
		var ifNodeExist
			,pos
			,localPos;
		function calLocalPos(e,tooltipEle){

				var parentOffset = $(".tooltip-demo").offset();
				var targetOffset = $(e.target).offset();

				var tooltipOrgEleWidth = $(e.target).outerWidth();
				var tooltipOrgEleHeight = $(e.target).outerHeight();

				var w = tooltipEle.outerWidth();
				var h = tooltipEle.outerHeight();

				var direction = $(e.target).attr('data-placement');

				var calculatedLeft,
					calculatedTop;

				switch (direction) {
					case "top":
						calculatedLeft = Math.abs(parentOffset.left - targetOffset.left) + tooltipOrgEleWidth / 2 - w / 2;
						calculatedTop = Math.abs(parentOffset.top - targetOffset.top) - h;
						break;
					case "right":
						calculatedLeft = Math.abs(parentOffset.left - targetOffset.left) + tooltipOrgEleWidth;
						calculatedTop = Math.abs(parentOffset.top - targetOffset.top) + tooltipOrgEleHeight / 2 - h / 2;
						break;
					case "bottom":
						calculatedLeft = Math.abs(parentOffset.left - targetOffset.left) + tooltipOrgEleWidth / 2 - w / 2;
						calculatedTop = Math.abs(parentOffset.top - targetOffset.top) + tooltipOrgEleHeight;
						break;
					case "left":
						calculatedLeft = Math.abs(parentOffset.left - targetOffset.left) - w;
						calculatedTop = Math.abs(parentOffset.top - targetOffset.top) + tooltipOrgEleHeight / 2 - h / 2;
						break;
					default:
						calculatedLeft = Math.abs(parentOffset.left - targetOffset.left) + tooltipOrgEleWidth / 2 - w / 2;
						calculatedTop = Math.abs(parentOffset.top - targetOffset.top) - h;
						break;
				}
				return {left: calculatedLeft, top: calculatedTop}
			}
		//bind test event
		$("[data-toggle=tooltip]").on("mouseover",function(e){

			var $tooltip = moduleDebug._appendTooltip(e);

			ifNodeExist = moduleDebug._judgeTooltipNode(e);

			var pos = moduleDebug._calTooltipPos(e, $tooltip);

			var localPos = calLocalPos(e , $tooltip);

			moduleDebug._setTooltipPos(e, $tooltip);
			
		});
		//trigger mouseover event for test
		$("[data-toggle=tooltip]").trigger("mouseover");

		equal(ifNodeExist , false, "tooltip should be appended!");
		deepEqual(pos , localPos , "position should be the same!");
	});

});