var

box_class           = 'placeholder-box',
text_class          = 'placeholder-text',
text_focus_class    = text_class + '-focus',

isSuportPlaceholder = 'placeholder' in document.createElement('input'),

sPlaceholder        = {
    focusHandler: function(e) {
        var control = sPlaceholder.getControl(e.target);

        if (control[1]) {
            sPlaceholder.bind(control);
            minilib.addClass(control[1], text_focus_class);
        }
    },

    blurHandler: function(e) {
        var control = sPlaceholder.getControl(e.target);

        sPlaceholder.changePlaceholderState(control[0], control[1]);
        sPlaceholder.unbind(control);

        minilib.removeClass(control[1], text_focus_class);
    },

    modifyHandler: function(e) {
        var control = sPlaceholder.getControl(e.target);
        sPlaceholder.changePlaceholderState(control[0], control[1]);
    },

    bind: function(control) {
        minilib.on(control[0], 'input', sPlaceholder.modifyHandler);
        minilib.on(control[0], 'propertychange', sPlaceholder.modifyHandler);
        minilib.on(control[0], 'blur', sPlaceholder.blurHandler);
    },

    unbind: function(control) {
        minilib.off(control[0], 'input', sPlaceholder.modifyHandler);
        minilib.off(control[0], 'propertychange', sPlaceholder.modifyHandler);
        minilib.off(control[0], 'blur', sPlaceholder.blurHandler);
    },

    init: function(rootEl) {
        rootEl = rootEl || document.body;

        var allTextbox = sPlaceholder.isTextbox(rootEl) ? [rootEl] : minilib.$t(['input', 'textarea'], rootEl),
            textbox, control, i, l;

        for (i = 0, l = allTextbox.length; i < l; i++) {
            textbox = allTextbox[i];
            control = sPlaceholder.getControl(textbox);

            if (control[1] == null) {
                sPlaceholder.createPlaceholder(control);
            }

            sPlaceholder.changePlaceholderState(control[0], control[1]);
        }
    },

    createPlaceholder: function(control) {
        var e = control[0],
            pt = e.getAttribute('placeholder'),
            sp = e.getAttribute('splaceholder');

        if (pt && (!isSuportPlaceholder || sp != null)) {
            var placeholderBox = minilib.create('<div class="' + box_class + '"></div>'),
                placeholder    = minilib.create('<label class="' + text_class + '">' + pt + '</label>');

            e.parentNode.insertBefore(placeholderBox, e);
            placeholderBox.appendChild(placeholder);
            placeholderBox.appendChild(e);

            e.setAttribute('placeholder', '');

            control[1] = placeholder;
            control[2] = placeholderBox;
        }
    },

    isTextbox: function(el) {
        var nodeName = el.nodeName.toLowerCase();
        // TODO: 没有判断 input 的 类型
        return nodeName === 'input' || nodeName === 'textarea';
    },

    isPlaceholder: function(el) {
        return minilib.hasClass(el, text_class);
    },

    changePlaceholderState: function(textbox, placeholder) {
        if (!textbox || !placeholder) { return;                    }
        else if (textbox.value           ) { minilib.hide(placeholder); }
        else                               { minilib.show(placeholder); }
    },

    getPlaceholderBox: function(el) {
        var p_box = minilib.closest(el, function(el) {
            return minilib.hasClass(el, box_class);
        });

        return p_box;
    },

    getControl: function(el) {
        var e, t, b;

        if (sPlaceholder.isTextbox(el)) {
            e = el;
            b = sPlaceholder.getPlaceholderBox(e);
            t = b ? minilib.$c(text_class, b)[0] : minilib.siblings(e, function(el) { return sPlaceholder.isPlaceholder(el); })[0];
        }
        else if (sPlaceholder.isPlaceholder(el)) {
            t = el;
            b = sPlaceholder.getPlaceholderBox(t);
            e = b ? minilib.$t(['input', 'textarea'], b)[0] : minilib.siblings(t, function(el) { return sPlaceholder.isTextbox(el); })[0];
        }

        return [e, t, b];
    }
};

// 部署全局 placeholder 支持
minilib.ready(function() {
    // 由于大部分时候占位符都是直接盖在文本框的上面，
    // 所以在点击占位符元素时，需要将焦点置于对应的文本框中。
    minilib.on(document, 'click', function(e) {
        var el = e.target,
            control, editor;

        if (sPlaceholder.isPlaceholder(el)) {
            control = sPlaceholder.getControl(el);
            editor  = control[0];

            if (editor && !minilib.isHidden(editor) && !minilib.isFocus(editor)) {
                editor.focus();
            }
        }
    });

    // 绑定全局文本框获取焦点事件
    // 这里需要尽尽可能早的知道哪个文本框将要得到焦点
    if (document.addEventListener) {
        document.addEventListener('focus', sPlaceholder.focusHandler, true);
    }
    // for IE
    else {
        minilib.on(document, 'focusin', sPlaceholder.focusHandler);
    }

    // 初始化当前页面中所有占位符的显隐状态
    setTimeout(function() {
        sPlaceholder.init();
        sPlaceholder.isInit = true;
    }, 50);

});
