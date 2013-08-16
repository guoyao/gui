/**
 * User: guoyao
 * Time: 07-25-2013 13:33
 * Blog: http://www.guoyao.me
 */

(function (window) {
    var window = window,
        document = window.document,
        $ = window.jQuery,
        grace = window.grace,
        Env = {
            production: false,
            modulesDirectory: "modules"
        },
        modules = [
            new Module("Dropdown Menu", "dropdown-menu"),
            new Module("Tab Navigator", "tab-navigator"),
            new Module("Collapse Menu", "collapse-menu"),
            new Module("Grid System", "grid-system"),
            new Module("Popup Window", "popup-window"),
            new Module("Panel Navigator", "panel-navigator")
        ];

    function Module(name, artifact) {
        this.name = name;
        this.artifact = artifact;
    }

    function getDemoResourceUrl(artifact, resource) {
        var url = Env.modulesDirectory + "/" + artifact + "/" + resource;
        if (!Env.production) {
            url += "?" + new Date().getTime();
        }
        return url;
    };

    function loadDemo(artifact) {
//        $('<link rel="stylesheet" href="' + getDemoResourceUrl(artifact, "_index.css") + '" artifact="' + artifact + '"/>').appendTo($("head")[0]);
        // for lte IE 6, dynamic loaded css bug
        $('<link rel="stylesheet" artifact="' + artifact + '"/>').appendTo($("head")[0]).attr("href", getDemoResourceUrl(artifact, "_index.css"));
        $("#shell").load(getDemoResourceUrl(artifact, "_index.html"), function () {
            $.getScript(getDemoResourceUrl(artifact, "_index.js"));
        });
    };

    /**
     * unload css and js
     * @param artifact string
     */
    function unloadDemo(artifact) {
        $("link").each(function () {
            if ($(this).attr("artifact") == artifact) {
                $(this).remove();
            }
        });
    };

    /**
     * patch for some old browser
     */
    function patch() {
        if (grace.browserInfo.isIE && grace.browserInfo.version <= 6) {
            $("#navigator").find("li:last-child a").css("border-bottom", 0);
        }
    };

    function init() {
        var selectedItem,
            $navigator = $("<ul></ul>");
        for (var i = 0, length = modules.length; i < length; i++) {
            $("<li></li>").wrapInner("<a href='#' artifact='" + modules[i].artifact + "'>" + modules[i].name + "</a>").appendTo($navigator);
        }

        $navigator.appendTo($("#navigator"));

        $navigator.find("a").click(function () {
            if (selectedItem == this) {
                return false;
            }
            if (selectedItem) {
                $(selectedItem).removeClass("active");
                unloadDemo($(selectedItem).attr("artifact"));
            }
            selectedItem = this;
            $(this).addClass("active");
            loadDemo($(this).attr("artifact"));
            return false;
        });

        patch();
    };

    $(document).ready(init);

})(window);
