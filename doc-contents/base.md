## Startup

Tip组件库基本文档

### 基本使用

``` html
import { Button } from '@common/lib'

<Button type="primary">点我</Button>
```

### 覆盖默认样式
当我们在项目中想要覆盖某组件的默认样式，又不像影响全局时，可以这样做：

配合css-modules:

原本的默认样式如下：

``` css
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

##### 1.通过css-modules为某元素添加唯一的选择器

``` html
<Tab styleName="unique-tab" />
```

##### 2.覆盖默认样式
这样，在该作用域下，可很好的覆盖默认样式，既不影响全局

``` css
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


