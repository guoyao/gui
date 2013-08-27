require(["jquery", "prettify", "graceful-web-ui"], function ($, prettify) {
    $(".grace-collapse").graceCollapse();
    prettify.prettyPrint();
});
