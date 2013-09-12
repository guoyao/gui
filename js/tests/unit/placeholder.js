$(function () {

	var $ = window.jQuery;
	var moduleDebug;

	option = {
		labelTextAlign: 'right',
		labelOffset: {'top': 5, 'left': 10},
		labelTextIndent: '2em',
		animateSpeed: 800
	};

	module("placeholder",{
		setup : function(){
			//set test environment
			moduleDebug = $.fn.guiPlaceholder.debug;
			moduleDebug._initOptions(option);
			//append test input node
			$("#qunit-fixture").append('<div class="test-div"><input class="test-input" id="test-id" type="test"/></div>');
			//console.log($(".test-input").offset().left - 2 );
			moduleDebug.obj = $(".test-div");
			//console.log($("#qunit-fixture").html())
		}
	});

	test("should provide no conflict", function () {
		var guiPlaceholder = $.fn.guiPlaceholder.noConflict();
		ok(!$.fn.guiPlaceholder, 'guiPlaceholder was set back to undefined (org value)');
		$.fn.guiPlaceholder = guiPlaceholder;
	});

	test("should be defined on jquery object", function () {
		ok($(document.body).guiPlaceholder, 'guiTab method is defined');
	});

	test("should return element", function () {
		ok($(document.body).guiPlaceholder()[0] == document.body, 'document.body returned');
	});

	/* inputTextObj() _getInputId() */
	test("should get input node",function(){

		//get input class
		moduleDebug._getInputEle();
		var input = moduleDebug.inputTextObj.eq(0);
		var inputClass = input.css("class");

		//get input id
		moduleDebug._getInputId(0);
		var inputId = input.attr("id");

		//get input size
		moduleDebug._getInputSize(0);
		var inputSize = moduleDebug._inputSize;

		//get input parent position
		moduleDebug._getParentPostion();
		var parentPos = moduleDebug._wrapperPosition;

		//calculate the label position
		moduleDebug._calculateLabelPostion(0);
		var labelPosition = moduleDebug._labelPosition;
		var locallablePosLeft = Math.abs(parentPos.left - input.eq(0).offset().left + parseInt(input.eq(0).css('margin-left'), 10));
		var locallablePosTop = Math.abs(parentPos.top - input.eq(0).offset().top + parseInt(input.eq(0).css('margin-top'), 10));

		//append label
		moduleDebug._addPlaceHolderElem();

		equal($(moduleDebug.obj).find("input").eq(0).css("class") , inputClass , 'Should get same class!');
		equal($(moduleDebug.obj).find("input").eq(0).attr("id") , inputId , 'Should get same id!');
		equal($(moduleDebug.obj).find("input").eq(0).outerHeight() , inputSize.height , 'Should get same height!');
		equal($(moduleDebug.obj).find("input").eq(0).outerWidth() , inputSize.width , 'Should get same width!');
		equal($(moduleDebug.obj).find("input").eq(0).css("margin") , inputSize.margin , 'Should get same margin!');
		equal($(".test-div").offset().left , parentPos.left , 'Should be the same left offset!');
		equal($(".test-div").offset().top , parentPos.top , 'Should be the same top offset!');
		equal(locallablePosLeft , labelPosition.left , 'Label left position should be the same');
		equal(locallablePosTop , labelPosition.top , 'Label top position should be the same');
		equal($(".test-div label").length , 1 , 'Label should be append!');
	});
});
