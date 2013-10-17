$(function (undefined) {

    var $ = window.jQuery;

    //get test module
    //var moduleDebug = $(document).guiCarousel('debug');

    //get the test wrapper
    //var mainWp = $("#qunit-fixture");

    var testobj = $('<div id="myCarousel" class="carousel slide">' +
        '<ol class="carousel-indicators">' +
        '<li data-target="#myCarousel" data-slide-to="0" class="active"></li>' +
        '<li data-target="#myCarousel" data-slide-to="1"></li>' +
        '<li data-target="#myCarousel" data-slide-to="2"></li>' +
        '</ol>' +
        '<div class="carousel-inner">' +
        '<div class="active item">' +
        '<img src="http://getbootstrap.com/2.3.2/assets/img/bootstrap-mdo-sfmoma-01.jpg"/>' +
        '</div>' +
        '<div class="item">' +
        '<img src="http://getbootstrap.com/2.3.2/assets/img/bootstrap-mdo-sfmoma-02.jpg"/>' +
        '</div>' +
        '<div class="item">' +
        '<img src="http://getbootstrap.com/2.3.2/assets/img/bootstrap-mdo-sfmoma-03.jpg"/>' +
        '</div>' +
        '</div>' +
        '<a class="carousel-control-left" href="#myCarousel" data-slide="prev">&lsaquo;</a>' +
        '<a class="carousel-control-right" href="#myCarousel" data-slide="next">&rsaquo;</a>' +
        '</div>');

    module("carousel", {
        setup: function () {
            //var moduleDebug = $(document).guiCarousel('debug');

            //append the test node
            //testobj.appendTo("#qunit-fixture");

            //set test obj to module
            //moduleDebug.obj = $("#myCarousel");

        },
        teardown: function () {
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

    test("item slide to next item",function(){
        $('<div id="myCarousel" class="carousel slide">' +
        '<ol class="carousel-indicators">' +
        '<li data-target="#myCarousel" data-slide-to="0" class="active"></li>' +
        '<li data-target="#myCarousel" data-slide-to="1"></li>' +
        '<li data-target="#myCarousel" data-slide-to="2"></li>' +
        '</ol>' +
        '<div class="carousel-inner">' +
        '<div class="active item">' +
        '<img src="http://getbootstrap.com/2.3.2/assets/img/bootstrap-mdo-sfmoma-01.jpg"/>' +
        '</div>' +
        '<div class="item">' +
        '<img src="http://getbootstrap.com/2.3.2/assets/img/bootstrap-mdo-sfmoma-02.jpg"/>' +
        '</div>' +
        '<div class="item">' +
        '<img src="http://getbootstrap.com/2.3.2/assets/img/bootstrap-mdo-sfmoma-03.jpg"/>' +
        '</div>' +
        '</div>' +
        '<a class="carousel-control-left" href="#myCarousel" data-slide="prev">&lsaquo;</a>' +
        '<a class="carousel-control-right" href="#myCarousel" data-slide="next">&rsaquo;</a>' +
        '</div>')
            .appendTo("#qunit-fixture")
            .guiCarousel({autoAnimate: false})
            .find(".carousel-control-right")
            .click();

        stop();

        setTimeout(function(){
            equal($("#myCarousel").find(".carousel-inner .active").index() , 1 ,"check next item index");
            start();
        },500);
    });

    test("item slide to prev item",function(){
        $('<div id="myCarousel" class="carousel slide">' +
        '<ol class="carousel-indicators">' +
        '<li data-target="#myCarousel" data-slide-to="0" class="active"></li>' +
        '<li data-target="#myCarousel" data-slide-to="1"></li>' +
        '<li data-target="#myCarousel" data-slide-to="2"></li>' +
        '</ol>' +
        '<div class="carousel-inner">' +
        '<div class="active item">' +
        '<img src="http://getbootstrap.com/2.3.2/assets/img/bootstrap-mdo-sfmoma-01.jpg"/>' +
        '</div>' +
        '<div class="item">' +
        '<img src="http://getbootstrap.com/2.3.2/assets/img/bootstrap-mdo-sfmoma-02.jpg"/>' +
        '</div>' +
        '<div class="item">' +
        '<img src="http://getbootstrap.com/2.3.2/assets/img/bootstrap-mdo-sfmoma-03.jpg"/>' +
        '</div>' +
        '</div>' +
        '<a class="carousel-control-left" href="#myCarousel" data-slide="prev">&lsaquo;</a>' +
        '<a class="carousel-control-right" href="#myCarousel" data-slide="next">&rsaquo;</a>' +
        '</div>')
            .appendTo("#qunit-fixture")
            .guiCarousel({autoAnimate: false})
            .find(".carousel-control-left")
            .click();

        stop();

        setTimeout(function(){
            equal($("#myCarousel").find(".carousel-inner .active").index() , 2 ,"check prev item index");
            start();
        },500);
    });

    test("item slide to specific item",function(){
        $('<div id="myCarousel" class="carousel slide">' +
        '<ol class="carousel-indicators">' +
        '<li data-target="#myCarousel" data-slide-to="0" class="active"></li>' +
        '<li data-target="#myCarousel" data-slide-to="1"></li>' +
        '<li data-target="#myCarousel" data-slide-to="2"></li>' +
        '</ol>' +
        '<div class="carousel-inner">' +
        '<div class="active item">' +
        '<img src="http://getbootstrap.com/2.3.2/assets/img/bootstrap-mdo-sfmoma-01.jpg"/>' +
        '</div>' +
        '<div class="item">' +
        '<img src="http://getbootstrap.com/2.3.2/assets/img/bootstrap-mdo-sfmoma-02.jpg"/>' +
        '</div>' +
        '<div class="item">' +
        '<img src="http://getbootstrap.com/2.3.2/assets/img/bootstrap-mdo-sfmoma-03.jpg"/>' +
        '</div>' +
        '</div>' +
        '<a class="carousel-control-left" href="#myCarousel" data-slide="prev">&lsaquo;</a>' +
        '<a class="carousel-control-right" href="#myCarousel" data-slide="next">&rsaquo;</a>' +
        '</div>')
            .appendTo("#qunit-fixture")
            .guiCarousel({autoAnimate: false})
            .find(".carousel-indicators li")
            .eq(2)
            .click();

        stop();

        setTimeout(function(){
            equal($("#myCarousel").find(".carousel-inner .active").index() , 2 ,"check prev item index");
            start();
        },500);
    });

    test("item automatically slide to next item",function(){
        $('<div id="myCarousel" class="carousel slide">' +
        '<ol class="carousel-indicators">' +
        '<li data-target="#myCarousel" data-slide-to="0" class="active"></li>' +
        '<li data-target="#myCarousel" data-slide-to="1"></li>' +
        '<li data-target="#myCarousel" data-slide-to="2"></li>' +
        '</ol>' +
        '<div class="carousel-inner">' +
        '<div class="active item">' +
        '<img src="http://getbootstrap.com/2.3.2/assets/img/bootstrap-mdo-sfmoma-01.jpg"/>' +
        '</div>' +
        '<div class="item">' +
        '<img src="http://getbootstrap.com/2.3.2/assets/img/bootstrap-mdo-sfmoma-02.jpg"/>' +
        '</div>' +
        '<div class="item">' +
        '<img src="http://getbootstrap.com/2.3.2/assets/img/bootstrap-mdo-sfmoma-03.jpg"/>' +
        '</div>' +
        '</div>' +
        '<a class="carousel-control-left" href="#myCarousel" data-slide="prev">&lsaquo;</a>' +
        '<a class="carousel-control-right" href="#myCarousel" data-slide="next">&rsaquo;</a>' +
        '</div>')
            .appendTo("#qunit-fixture")
            .guiCarousel();

        stop();

        setTimeout(function(){
            equal($("#myCarousel").find(".carousel-inner .active").index() , 1 ,"check next item index");
            start();
        },5500);
    });

});