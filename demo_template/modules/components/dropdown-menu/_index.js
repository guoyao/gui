/**
 * User: guoyao
 * Time: 07-26-2013 18:27
 * Blog: http://www.guoyao.me
 */

require(["jquery", "prettify", "gui"], function ($, prettify) {
    $(".module-container .gui-nav").guiNav({
        backgroundColor: "#eeeeee",
        border: "1px solid #d1d1d1",
        itemWidth: "130px",
        itemHeight: "35px",
        itemOverColor: "#d5d5d5",
        animationDuration: 500
    });

    prettify.prettyPrint();
});
