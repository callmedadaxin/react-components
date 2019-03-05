#### 基本使用

##### 单选

虽然现在没有用到，预留单项选择

```js
const listItems = [
  {
    label: "修改密码",
    value: "edit"
  },
  {
    label: "删除",
    value: "delete"
  },
  {
    label: "不删除",
    value: "d"
  }
];
<LabelSelect onChange={console.log} options={listItems} />;
```

##### 多选

- 通过 showAll 控制是否展示全部选项, 默认展示
- 全部的值默认为空数组

```js
const listItems = [
  {
    label: "修改密码",
    value: "edit"
  },
  {
    label: "删除",
    value: "delete"
  },
  {
    label: "不删除",
    value: "d"
  }
];

<div>
  <LabelSelect
    defaultValue={["delete"]}
    className="mgb20"
    onChange={console.log}
    multi
    options={listItems}
  />
  <LabelSelect
    onChange={console.log}
    showAll={false}
    multi
    options={listItems}
  />
</div>;
```
