require(["jquery", "prettify", "gui"], function ($, prettify) {
    $("[data-toggle=tooltip]").guiTooltip();
    prettify.prettyPrint();
});