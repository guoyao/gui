require(["jquery", "prettify", "gui"], function ($, prettify) {
    $("#autocomplete-input").guiAutocomplete();
    prettify.prettyPrint();
});