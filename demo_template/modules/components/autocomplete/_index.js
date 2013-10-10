require(["jquery", "prettify", "gui"], function ($, prettify) {
    $("#autocomplete-input").guiAutocomplete({data:['111','222','333','444']});
    prettify.prettyPrint();
});