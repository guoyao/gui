/**
 * Created with JetBrains WebStorm.
 * User: alfred.zhang
 * Date: 13-8-14
 * Time: 下午2:25
 * To change this template use File | Settings | File Templates.
 */

require(["jquery", "prettify", "gui"], function ($, prettify) {
    $(".gui-slider").guiSlider({data:{indicatordata: ['09/01', '09/03', '09/04', '09/05', '09/06', '09/07', '09/01', '09/03', '09/04', '09/06', '09/07', '09/01', '09/03']}});
    prettify.prettyPrint();
});
