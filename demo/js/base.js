/**
 * Author: guoyao
 * Time: 08-20-2013 15:22
 * Blog: http://www.guoyao.me
 */

(function (window) {
    var $ = window.jQuery,
        grace = window.grace;

    $("#top-nav .grace-nav").graceNav();

    function getDemoResourceUrl(artifact, resource) {
        var env = $.extend({}, demo.env, this.env);
        var url = env.modulesDirectory + "/" + artifact + "/" + resource;
        if (!env.production) {
            url += "?" + new Date().getTime();
        }
        return url;
    }

    function loadDemo(artifact) {
        var initializer = this;
//        $('<link rel="stylesheet" href="' + getDemoResourceUrl.call(initializer, artifact, "_index.css") + '" artifact="' + artifact + '"/>').appendTo($("head")[0]);
        // for lte IE 6, dynamic loaded css bug
        $('<link rel="stylesheet" artifact="' + artifact + '"/>').appendTo($("head")[0]).attr("href", getDemoResourceUrl.call(initializer, artifact, "_index.css"));
        $("#shell").load(getDemoResourceUrl.call(initializer, artifact, "_index.html"), function () {
            $.getScript(getDemoResourceUrl.call(initializer, artifact, "_index.js"));
        });
    }

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
    }

    /**
     * patch for some old browser
     */
    function patch() {
        if (grace.browserInfo.isIE && grace.browserInfo.version <= 6) {
            $("#navigator").find("li:last-child a").css("border-bottom", 0);
        }
    }

    patch();

    var demo = (function () {

        function Module(name, artifact) {
            this.name = name;
            this.artifact = artifact;
        }

        function Initializer (modules, env) {
            this.modules = modules;
            this.env = env;
        }

        Initializer.prototype.init = function () {
            var initializer = this,
                selectedItem,
                $navigator = $("<ul></ul>");
            for (var i = 0, length = this.modules.length; i < length; i++) {
                $("<li></li>").wrapInner("<a href='#' artifact='" + this.modules[i].artifact + "'>" + this.modules[i].name + "</a>").appendTo($navigator);
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
                loadDemo.call(initializer, $(this).attr("artifact"));
                return false;
            });

            $navigator.find("li:first-child a").trigger("click");

            return initializer;
        };

        var globalEnv = {
            production: true,
            modulesDirectory: "modules/??" // replace '??' with specific path when create new instance of Initializer
        };

        return {
            Module: Module,
            Initializer: Initializer,
            env: globalEnv
        }
    })();

    if (!!window.demo) {
        $.extend(window.demo, demo);
    } else {
        window.demo = demo;
    }

})(window);