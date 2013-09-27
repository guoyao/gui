require(["jquery", "prettify", "gui"], function ($, prettify) {
    $("#autocomplete-input").guiAutocomplete();
    console.log($(".autocomplete-input2").guiAutocomplete());
    prettify.prettyPrint();
});