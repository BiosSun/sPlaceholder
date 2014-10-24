/*! sPlaceholder - v1.2.0 - 2014-10-25
 *  https://github.com/BiosSun/sPlaceholder
 *  Copyright (c) 2014 Bios Sun; Licensed MIT */
(function(global, factory) {
    var sPlaceholder = factory(window, document, undefined);

    if (typeof module === 'object' && module.exports === 'object') {
        module.exports = sPlaceholder;
    }
    else {
        global.sPlaceholder = sPlaceholder;
    }
})(typeof window !== "undefined" ? window : this, function(window, document, undefined) {

var minilib = (function() {

    var

    _toStr = {}.toString,
    _slice = [].slice,

    _rsg = /\s+/g,

    exel = document.createElement('a'),

    minilib = {
        makeArray: function(arrayLikeObj) {
            var ret, i , l;

            try {
                ret = _slice.call(arrayLikeObj, 0);
            }
            catch (e) {
                ret = [];

                for (i = 0, l = arrayLikeObj.length; i < l; i++) {
                    ret.push(arrayLikeObj[i]);
                }

                return ret;
            }

            return ret;
        },

        // 类型检查模块
        // ---------------------------
        isArray : function(obj) {
            return _toStr.call(obj) === '[object Array]';
        },

        isFunction : function(obj) {
            return _toStr.call(obj) === '[Object Function]';
        },

        isString : function(obj) {
            return typeof obj === 'string';
        },

        // 样式获取模块
        // ---------------------------
        css : window.getComputedStyle ?
            function(el, name) {
                return window.getComputedStyle(el, null)[name];
            } :
            function(el, name) {
                return el.currentStyle[name];
            },

        // 元素状态监测模块
        // ---------------------------
        isFocus: function(el) {
            return el === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(el.type || el.href || ~el.tabIndex);
        },

        isHidden: function(el) {
            return minilib.css(el, 'display') === 'none';
        },

        // 显示、隐藏元素
        // ---------------------------
        show: function(el) {
            el.style.display = '';
        },

        hide: function(el) {
            el.style.display = 'none';
        },

        // class 操作模块
        // ---------------------------
        hasClass: function(el, val) {
            return (' ' + el.className.replace(_rsg, ' ') + ' ').indexOf(' ' + val + ' ') > -1;
        },

        addClass: function(el, val) {
            if (!minilib.hasClass(el, val)) {
                el.className += ' ' + val;
            }
        },

        removeClass: function(el, val) {
            var className = ' ' + el.className.replace(_rsg, ' ') + ' ',
                newClassName = className.split(' ' + val + ' ').join(' ');

            if (className !== newClassName) {
                el.className = newClassName;
            }
        },

        // 元素查询模块
        // ---------------------------
        $ : function(id) {
            return document.getElementById(id);
        },

        $c : function(className, parent) {
            var result = [], i, l, allElements;

            parent      = parent || document;
            allElements = parent.all ? parent.all : parent.getElementsByTagName('*');

            for (i = 0, l = allElements.length; i < l; i++) {
                if (minilib.hasClass(allElements[i], className)) {
                    result.push(allElements[i]);
                }
            }

            return result;
        },

        $t : function(tagNames, parent) {
            var result = [], i, l;

            parent = parent || document;

            if (minilib.isString(tagNames)) {
                tagNames = [tagNames];
            }

            for (i = 0, l = tagNames.length; i < l; i++) {
                result = result.concat(minilib.makeArray(parent.getElementsByTagName(tagNames[i])));
            }

            return result;
        },

        // 从指定元素开始向根元素进行遍历，遍历时为每个节点调用一次回调函数，
        // 当函数返回 true 时，结束遍历并返回该节点。
        // 如果遍历结束后仍没有找到匹配节点，返回 undefined。
        closest : function(el, func) {
            if (el == null || el === document) {
                return undefined;
            }
            else if (func(el) === true) {
                return el;
            }

            return minilib.closest(el.parentNode, func);
        },

        // 筛选兄弟元素
        siblings : function(el, func) {
            var siblings = el.parentNode.childNodes,
                ret = [],
                sel, i, l;

            for (i = 0, l = siblings.length; i < l; i++) {
                sel = siblings[i];
                if (sel.nodeType === 1 && func(sel) === true) {
                    ret.push(sel);
                }
            }

            return ret;
        },

        // DOM 操作模块
        // ---------------------------
        create: function(htmlStr) {
            var root = document.createElement('div');
            root.innerHTML = htmlStr;
            return root.childNodes[0];
        },

        // 事件绑定模块
        // ---------------------------
        on: exel.addEventListener ?
            function(node, type, listener) {
                node.addEventListener(type, listener, false);
            } :
            function (node, type, listener) {
                node['e' + type + listener] = listener;
                node[type + listener] = function() {
                    var e = window.event;
                    e.target = e.srcElement;
                    node['e' + type + listener](e);
                };
                node.attachEvent('on' + type, node[type + listener]);
            },

        off: exel.addEventListener ?
            function(node, type, listener) {
                node.removeEventListener(type, listener, false);
            } :
            function(node, type, listener) {
                node.detachEvent('on' + type, node[type + listener]);
                node[type + listener] = null;
                node['e' + type + listener] = null;
            },

        // DOM Loaded 事件模块
        // ---------------------------
        isReady : false,
        readyList : [],
        readyTimer : null,

        ready: function(fun) {
            if (minilib.checkReady) { return fun(); }

            if (!minilib.readyTimer) {
                minilib.on(window, 'load', minilib.checkReady);
                minilib.readyTimer = setInterval(minilib.checkReady, 13);
            }

            minilib.readyList.push(fun);

            return undefined;
        },

        checkReady: function() {
            if (minilib.isReady) { return true; }

            if (document && document.getElementsByTagName && document.getElementById && document.body) {
                clearInterval(minilib.readyTimer);
                minilib.readyTimer = null;

                for (var i = 0; i < minilib.readyList.length; i++) {
                    minilib.readyList[i]();
                }

                minilib.readyList = [];
                minilib.isReady = true;

                return true;
            }

            return false;
        }
    };

    return minilib;
})();

var

isSuportPlaceholder = 'placeholder' in document.createElement('input'),

sPlaceholder        = {

    // 类名配置
    boxClass: 'placeholder-box',
    textClass: 'placeholder-text',
    textFocusClass: 'placeholder-text-focus',

    // 是否在页面加载后进行全局初始化
    globalInit: true,

    focusHandler: function(e) {
        var control = sPlaceholder.getControl(e.target);

        if (control[1]) {
            sPlaceholder.bind(control);
            minilib.addClass(control[1], sPlaceholder.textFocusClass);
        }
    },

    blurHandler: function(e) {
        var control = sPlaceholder.getControl(e.target);

        sPlaceholder.changePlaceholderState(control[0], control[1]);
        sPlaceholder.unbind(control);

        minilib.removeClass(control[1], sPlaceholder.textFocusClass);
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
            var placeholderBox = minilib.create('<div class="' + sPlaceholder.boxClass + '"></div>'),
                placeholder    = minilib.create('<label class="' + sPlaceholder.textClass + '">' + pt + '</label>');

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
        return minilib.hasClass(el, sPlaceholder.textClass);
    },

    changePlaceholderState: function(textbox, placeholder) {
        if (!textbox || !placeholder) { return;                    }
        else if (textbox.value           ) { minilib.hide(placeholder); }
        else                               { minilib.show(placeholder); }
    },

    getPlaceholderBox: function(el) {
        var p_box = minilib.closest(el, function(el) {
            return minilib.hasClass(el, sPlaceholder.boxClass);
        });

        return p_box;
    },

    getControl: function(el) {
        var e, t, b;

        if (sPlaceholder.isTextbox(el)) {
            e = el;
            b = sPlaceholder.getPlaceholderBox(e);
            t = b ? minilib.$c(sPlaceholder.textClass, b)[0] : minilib.siblings(e, function(el) { return sPlaceholder.isPlaceholder(el); })[0];
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
        if (sPlaceholder.globalInit) {
            sPlaceholder.init();
            sPlaceholder.isInit = true;
        }
    }, 50);

});

return sPlaceholder;
});
