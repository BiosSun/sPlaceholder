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
