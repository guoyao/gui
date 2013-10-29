// This is the runtime configuration file.  It complements the Gruntfile.js by
// supplementing shared properties.
require.config({
    baseUrl: "js",
    paths: {
        // Map dependencies.
        "gui": "lib/gui",
        "jquery": "lib/jquery",
        "prettify": "lib/prettify"
    },
    shim: {
        "gui": {
            deps: ["jquery"]
        }
    }
});
