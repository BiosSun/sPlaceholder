# sPlaceholder

这是一个 placeholder 特性模拟工具，可以用于 IE8 等不支持 placeholder 的浏览器上以模拟实现该特性。

## 示例

```html
<input type="text" placeholder="Your name" />
```

或者：

```html
<div class="placeholder-box">
    <input type="text" value="" />
    <span class="placeholder-text">Your name</span>
</div>
```

## 已知问题

1. 如果占位符元素覆盖在文本框之上，这样在占位符上点击右键时，显示的不是文本框的操作菜单而是普通菜单。
1. 若是通过 JS 改变文本框的值，占位符不会自动更新。(*）
1. 我们没有判断 input 的类型，所以该模拟特效可能会运行在 checkbox 等不支持 placeholder 的元素上。
