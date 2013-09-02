/**
 * Created with JetBrains WebStorm.
 * User: alfred.zhang
 * Date: 13-8-14
 * Time: 下午2:25
 * To change this template use File | Settings | File Templates.
 */

require(["jquery", "prettify", "gui"], function ($, prettify) {
    $(".gui-placeholder").guiPlaceholder({'labelText':['Please Input 1','Please Input 2']});
    prettify.prettyPrint();
});
