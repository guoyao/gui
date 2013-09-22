require(["jquery", "prettify", "gui"], function ($, prettify) {
    var root = window,
        gui = root.gui;

    if (gui.browserInfo.isIE) {
        if (gui.browserInfo.version <= 8) { // lte IE 8
            $(".module-container .gui-table").guiTable();
        }
        if (gui.browserInfo.version <= 7) { // lte IE 7
            $(".module-container .gui-panel").guiPanel();
        }
    }

    prettify.prettyPrint();
});
