/**
 * Created with JetBrains WebStorm.
 * User: alfred.zhang
 * Date: 13-8-14
 * Time: 下午2:25
 * To change this template use File | Settings | File Templates.
 */

require(["jquery", "prettify", "gui"], function ($, prettify) {
    $(".place-holder-input").guiPlaceholder();
    prettify.prettyPrint();
});
