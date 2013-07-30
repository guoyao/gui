/**
 * User: guoyao
 * Time: 07-30-2013 17:00
 * Blog: http://www.guoyao.me
 */

(function (window) {
    var console = window.console;
    if (!!console) {
        if (!console.log) {
            console.log = function (value) {
                alert(value);
            };
        }
        if (!console.debug) {
            console.debug = function (value) {
                console.log(value);
            }
        }
    } else {
        console = {
            log: function (value) {
                alert(value);
            },
            debug: function (value) {
                alert(value);
            }
        };
        window.console = console;
    }

})(window);