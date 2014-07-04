# sPlaceholder

这是一个 placeholder 特性模拟工具，可以用于 IE8 等不支持 placeholder 的浏览器上以模拟实现该特性。

## 示例

### 方式 1

```html
<div class="placeholder-box">
    <input type="text" value="" />
    <span class="placeholder-text">Your name</span>
</div>
```

这种方式具有最高的灵活性；

你可以在 `.placeholder-text` 元素中放置任何东西，并自定义样式。

文本框和 `.placeholer-text` 元素亦可随意放置，只要在 `placeholder-box` 元素内即可。

### 方式 2

```html
<div>
    <input type="text" value="" />
    <span class="placeholder-text">Your name</span>
</div>
```

`placeholder-box` 元素不是必须的，只不过在不提供该元素时，
文本框和 `placeholder-text` 元素必须位于同一级，
不然相互之间找不到对方。

### 方式 3

```html
<input type="text" placeholder="Your name" />
```

和通常一样，使用 placeholder 属性，在不支持 placeholder 的浏览器中，
会自动构建 `placeholder-text` 和 `placeholder-box` 以模拟该特性。

另外，如果需要在支持 placeholder 属性的浏览器中使用模拟特性，
则可以添加一个布尔类型的属性：`splaceholder`。

```html
<input type="text" placeholder="Your name" splaceholder />
```

## 已知问题

1. 如果占位符元素覆盖在文本框之上，这样在占位符上点击右键时，显示的不是文本框的操作菜单而是普通菜单。(1)
1. 若是通过 JS 改变文本框的值，占位符不会自动更新。(2)
1. 我们没有判断 input 的类型，所以该模拟特效可能会运行在 checkbox 等不支持 placeholder 的元素上。
