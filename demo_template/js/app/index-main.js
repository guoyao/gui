/**
 * Author: guoyao
 * Time: 08-28-2013 12:54
 * Blog: http://www.guoyao.me
 */

define(["./demo"], function (demo) {
    var Module = demo.Module;
    new demo.Initializer([
        new Module("Dropdown Menu", "dropdown-menu"),
        new Module("Tab Navigator", "tab-navigator"),
        new Module("Popup Window", "popup-window"),
        new Module("Panel", "panel"),
        new Module("Place Holder", "place-holder"),
        new Module("Slider", "slider"),
        new Module("Date Picker", "date-picker"),
        new Module("Button", "button"),
        new Module("Button Bar", "button-bar"),
        new Module("Carousel", "carousel"),
        new Module("Tooltip", "tooltip"),
        new Module("Pagination", "pagination"),
        new Module("Autocomplete", "autocomplete"),
        new Module("Dropdown", "dropdown"),
        new Module("Breadcrumb", "breadcrumb"),
        new Module("Splitter", "splitter")
    ], {
        modulesDirectory: "modules/components"
    }).init();
});
