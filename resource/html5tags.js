/*
 * 在 IE 中未知元素（比如HTML5中的新元素）需要用 createElement() 创建一次才能使样式生效
 */
(function(){
    if(!/*@cc_on!@*/0) return;

    var html5 = "abbr,article,aside,audio,bb,canvas,datagrid,datalist,details,dialog,eventsource,figure,footer,hgroup,header,mark,menu,meter,nav,output,progress,section,time,video".split(',');
    for(var i = 0, len = html5.length; i < len; i++) {
        document.createElement(html5[i]);
    }
})();