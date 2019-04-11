## Startup

组件库基本文档 v2.0

### 2.0 涉及变更

#### 概要

- 使用[React Hooks](https://reactjs.org/docs/hooks-intro.html)进行了重构
- 对部分组件的实现方式进行了修改和优化，弃用了部分 API(已进行 warning 提示)
- 优化了整个包的大小：2.9MB -> 400+KB
- 新增按需加载支持
- 优化了表单实现和使用方式，提供基本 Form, 级联 SmartForm, 多层级 Setter
- 对表格结构和性能进行了优化
- 对组件样式和功能样式进行了拆解，移除了 app、menu 等页面样式

#### 按需加载

提供 es 模块，借助 babel-plugin-import 实现按需加载功能：

```js
// 书写方式
import { Button } from "anzi-ui";
// 会自动转化成=>
// import Button from 'anzi-ui/es/components/Button'
// import 'anzi-ui/es/components/Button/style/css'
```

同时，借助 es 模块，仅进行 babel 编译，通过 tree shaking 更多地优化打包大小

配置方法：

1. npm i --save-dev babel-plugin-import
2. 添加 babel-plugin:

```js
[
  "import",
  {
    libraryName: "anzi-ui",
    libraryDirectory: "es/components",
    camel2DashComponentName: false,
    style: "css"
  }
],
```

#### 变更组件

- Slider(已废弃)
- Carousel(新增)
- Tab(使用 theme 控制主题样式，优化渲染方式)
- Checkbox, Radio 等(更改了渲染方式)
- Form (更改组织方式，详见文档)

### 基本使用

```html
import { Button } from 'anzi-ui';

<button type="primary">点我</button>
```

### 覆盖默认样式

当我们在项目中想要覆盖某组件的默认样式，又不像影响全局时，可以这样做：

配合 css-modules:

原本的默认样式如下：

```css
.tip-tab {
  border: 1px solid #ccc;
}
.tip-tab-item {
  border: 1px solid #ccc;

  &.active {
    border-color: red;
  }
}
```

##### 1.通过 css-modules 为某元素添加唯一的选择器

```html
<Tab styleName="unique-tab" />
```

##### 2.覆盖默认样式

这样，在该作用域下，可很好的覆盖默认样式，既不影响全局

```css
.unique-tab {
  :global {
    .tip-tab-item {
      border-color: #eee;

      &.active {
        border-color: blue;
      }
    }
  }
}
```
