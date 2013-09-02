
$(function (undefined) {

	var $ = window.jQuery;
	var moduleDebug;

	//init options
	var option = {
		switchBtnClass:'test-btn',
		switchBtnToggleClass:'test-btn-closed',
		switchTabClass:'test-content',
		animationDuration: 1000
	}

	//get the test wrapper
	var mainWp = $("#qunit-fixture");

	//test main obj
	var testobj = $('<div class="gui-collapse">' + 
						'<ul class="tabs">' + 
							'<li>' + 
								'<h2 class="test-btn"><a>Graceful Tab btn 1</a></h2>' +
								'<div class="test-content" style="display: none;">' + 
									'JavaScript expressions can be evaluated as values inside .' + 
								'</div>' + 
							'</li>' +
							'<li>' + 
								'<h2 class="test-btn"><a>Graceful Tab btn 2</a></h2>' + 
								'<div class="test-content">' + 
									'JavaScript expressions can be evaluated as values inside .less files. We recommend using caution with this feature as the LESS will not be compilable by ports and it makes the LESS harder to maintain. If possible, try to think of a function that can be added to achieve the same purpose and ask for it on github.' + 
								'</div>' + 
							'</li>' + 
							'<li>' + 
								'<h2 class="test-btn"><a>Graceful Tab btn 3</a></h2>' + 
								'<div class="test-content">' + 
									'JavaScript expressions can be evaluated as values inside .' + 
								'</div>' + 
							'</li>' + 
						'</ul>' + 
					'</div>');

    module("collapse",{
    	setup : function(){
    		//set test environment
			moduleDebug = $.fn.guiCollapse.debug;
			moduleDebug._initOptions(option);
			//append elements to test wrapper
			testobj.appendTo(mainWp);
			//set local obj
			moduleDebug.obj = $(".gui-collapse");
    	},teardown:function(){
			//destroy graceDatePicker module
			moduleDebug = undefined;
		}
    });

    /*repeat test for every modules*/
    test("should provide no conflict", function () {
        var guiCollapse = $.fn.guiCollapse.noConflict();
        ok(!$.fn.guiCollapse, 'guicollapse was set back to undefined (org value)');
        $.fn.guiCollapse = guiCollapse;
    });

    test("should be defined on jquery object", function () {
        ok($(document.body).guiCollapse, 'guiDatePicker method is defined');
    });

    test("should return element", function () {
        ok($(document.body).guiCollapse()[0] == document.body, 'document.body returned');
    });

    /* _initOptions */
    test("check option extend",function(){
		equal(option.switchBtnClass, moduleDebug.defaults.switchBtnClass, "mod default class")
		equal(option.animationDuration, moduleDebug.defaults.animationDuration, "mod animation speed")
		equal(option.switchBtnToggleClass, moduleDebug.defaults.switchBtnToggleClass, "mod default class")
		equal(option.switchTabClass, moduleDebug.defaults.switchTabClass, "mod default class")
    });

    /* _recordEleHeight */
    test("check recorded height",function(){
    	var testContent = $(".test-content");
    	var h = [];
    	var localH = moduleDebug._recordEleHeight();
    	//get the height of object
    	for (var i = 0; i < testContent.length; i++){
    		h[i] = testContent.eq(i).height();
    	}
    	equal(h[0],localH[0],"height should be the same");
    	equal(h[1],localH[1],"height should be the same");
    	equal(h[0],localH[2],"height should be the same");
    })

    /* _eventHandler */
    	test("check click event",function(){
    	//init get height
    	moduleDebug._recordEleHeight();
		moduleDebug._eventHandler();
    	//triger click event
    	var index = 1;
    	$(".test-btn").eq(index).trigger("click");
    	stop();
    	setTimeout(function(){
			//get animated height
	    	var h = $(".test-content").eq(index).height();
	    	var visible = $(".test-content").eq(index).css("opacity");

	    	equal(h,0,"height should be set to 0");
	    	equal(visible, 0, "display value should be none");
	    	start();
    	},option.animationDuration);
    });
});