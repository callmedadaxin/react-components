#### 基本使用

```js
const listItems = [
  {
    label: "修改密码",
    value: "editedite"
  },
  {
    label: "删除",
    value: "delete"
  },
  {
    label: "不删除",
    value: "dddddddddddddd"
  }
];

<CheckboxSelect
  defaultValue={["delete"]}
  onChange={console.log}
  title="事件类型"
  options={listItems}
  className="mgb20"
/>;
```

#### 筛选 listItems

```js
const listItems = [
  {
    label: "修改密码",
    value: "editedite"
  },
  {
    label: "删除",
    value: "delete"
  },
  {
    label: "不删除",
    value: "dddddddddddddd"
  }
];

<CheckboxSelect
  withSearch
  defaultValue={["delete"]}
  onChange={console.log}
  title="事件类型"
  options={listItems}
  className="mgb20"
/>;
```
