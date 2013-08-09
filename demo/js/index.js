/**
 * User: guoyao
 * Time: 07-25-2013 13:33
 * Blog: http://www.guoyao.me
 */

(function (document, $) {
    var Env = {
        production: false,
        modulesDirectory: "modules"
    };

    var modules = [
        new Module("Dropdown Menu", "dropdown-menu"),
        new Module("Tab Navigator", "tab-navigator"),
		new Module("Collapse Menu", "collapse-menu"),
        new Module("Grid System", "grid-system")
    ];

    function Module(name, artifact) {
        this.name = name;
        this.artifact = artifact;
    }

    var getDemoResourceUrl = function (artifact, resource) {
        var url = Env.modulesDirectory + "/" + artifact + "/" + resource;
        if (!Env.production) {
            url += "?" + new Date().getTime();
        }
        return url;
    };

    var loadDemo = function (artifact) {
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
    var unloadDemo = function (artifact) {
        $("link").each(function () {
            if ($(this).attr("artifact") == artifact) {
                $(this).remove();
            }
        });
    };

    var init = function () {
        var $navigator = $("#navigator");
        for (var i = 0, length = modules.length; i < length; i++) {
            $("<div></div>").wrapInner("<a href='#' artifact='" + modules[i].artifact + "'>" + modules[i].name + "</a>").appendTo($navigator);
        }

        var selectedItem;
        $navigator.find("a").click(function () {
            if (selectedItem == this) {
                return false;
            }
            if (selectedItem) {
                $(selectedItem).parent().removeClass("selected");
                unloadDemo($(selectedItem).attr("artifact"));
            }
            selectedItem = this;
            $(this).parent().addClass("selected");
            loadDemo($(this).attr("artifact"));
            return false;
        });
    };

    $(document).ready(init);

})(document, jQuery);
