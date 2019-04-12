## Startup

组件库基本文档 v2.0

### 2.0 涉及变更

#### 概要

- 使用[React Hooks](https://reactjs.org/docs/hooks-intro.html)进行了重构
- 对部分组件的实现方式进行了修改和优化，弃用了部分 API(已进行 warning 提示)
- 优化了整个包的大小：2.9MB -> 400+KB
- 新增按需加载支持，使用部分组件时，提供更小的单元
- 按需加载支持 es Module 导入，利于进行 tree shaking 减少代码体积
- 优化了表单实现和使用方式，提供基本 Form, 级联 SmartForm, 多层级 Setter
- 对表格结构和性能进行了优化
- 对组件样式和功能样式进行了拆解，移除了 app、menu 等页面样式

#### 按需加载

提供 es 模块，借助 babel-plugin-import 实现按需加载功能：

```html
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

```html
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
- Carousel, Message(新增)
- Tab(使用 theme 控制主题样式，优化渲染方式)
- Checkbox, Radio 等(更改了渲染方式)
- Form (更改组织方式，详见文档)
- Dropdown 新增 visible 受控方式
- Select, MultiInput, Modal, Pagination 弃用第三方依赖

#### 使用须知

##### 1.invalid hook call warning

需要在 webpack 中添加 alias, 将 react 指向相同源。 详见[invalid hook call warning](https://reactjs.org/warnings/invalid-hook-call-warning.html)。

同时，建议升级 react-hot-loader 到 4.6+

```html
resolve: {
  alias: {
    // 全都指向到本地的node_modules的react
    react: path.join(__dirname, "../node_modules/react"),
    "react-dom": path.join(__dirname, "../node_modules/react-dom"),
  },
}
```

##### 2.部分引用方式失效

为了支持按需加载，相同类型组件被整合到同一目录下

```html
import { DateRangePicker, DatePicker, POSITION, TRIGGER } from "react-tdp-ui";

// 转化成

import { TimePicker } from "anzi-ui";

const { RangePicker, DatePicker, RangeBtn } = TimePicker;

// POSITION, TRIGGER弃用，直接使用'left', 'click'等替代
```

##### 3.Form 的变更

若之前的 Form 中有级联操作，建议使用 SmartForm:

同时，Form, FormItem, Collector, validators 已全部进行解耦，可自行组合使用。

多层级数据表单，可以使用 Setter 配合 FormItem 使用

```html
<Form>
  <FormItem
    field="name"
    onChange={val =>
      this.setState({
        formName: val
      })
    }
  >
    <Input />
  </FormItem>
  <Item show={this.state.formName === "大王"}>
    <FormItem field="age">
      <Input />
    </FormItem>
  </Item>
</Form>
```

=>

```html
<SmartForm>
  {(data, renderItem, setItem) => (
    <Fragment>
      {renderItem(
        <FormItem field="name">
          <Input />
        </FormItem>
      )}
      <Item show={data.name === "大王"}>
        {renderItem(
          <FormItem field="age">
            <Input />
          </FormItem>
        )}
      </Item>
    </Fragment>
  )}
</SmartForm>
```

##### 4. menu, app 对应的 css 已从组件库中移除

建议放在项目里

##### 5. 部分组件改动

部分组件 api 进行了改动，建议详细的过遍文档

- Tab 使用 theme 控制默认样式，去除了 headerKeys
- Dropdown 新增了受控显示方式，可在外控制 dropdown 的显示隐藏
- 其他...暂时想不太起来了...

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
