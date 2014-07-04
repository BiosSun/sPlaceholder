(function($) {
    var $root = $('#qunit-fixture');

    if ( !$root.length ) {
        $root = $('<div id="qunit-fixture"></div>');
        $('body').append($root);
    }

    $root.append(
        '<div id="pbox1" class="placeholder-box">' +
            '<label id="ptxt1" class="placeholder-text" style="display: none;">pt</label>' +
            '<input id="t1" type="text" />' +
        '</div>' +
        '<div id="pbox2">' +
            '<label id="ptxt2" class="placeholder-text">pt</label>' +
            '<input id="t2" type="text" value="Bios Sun" />' +
        '</div>'
    );

    QUnit.asyncTest('sPlaceholder', function() {
        var timer = setInterval(function() {
            if (sPlaceholder.isInit === true) {
                QUnit.start();
                startTest();
                clearInterval(timer);
            }
        }, 20);
    });

    function startTest() {
        ok($('#ptxt1').is(':visible'), '对于值为空的文本框，要显示占位符。');
        ok($('#ptxt2').is(':hidden'), '对于值不为空的文本框，要隐藏占位符。');

        $('#t1').focus();
        ok($('#ptxt1').is('.placeholder-text.placeholder-text-focus'), '文本框获取到焦点时，占位符添加 -focus 类');
        $('#t2').focus();
        ok($('#ptxt1').is('.placeholder-text:not(.placeholder-text-focus)'), '文本框获取到焦点时，占位符移除 -focus 类');
    }

}(jQuery));
