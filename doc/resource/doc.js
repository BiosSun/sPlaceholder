$(function() {
    var doc = $(document);

    doc.on('click', '.field-box .J-show-code', function() {
        var triggle = $(this),
            codebox = $(this).siblings('pre'),
            fieldbox = triggle.closest('.field-box');

        if (codebox.is(':hidden')) {
            triggle.text('hide code');
            codebox.slideDown(200);
            fieldbox.addClass('field-box-fixed');
        }
        else {
            triggle.text('show code');
            codebox.slideUp(200);
            fieldbox.removeClass('field-box-fixed');
        }
    });
});
