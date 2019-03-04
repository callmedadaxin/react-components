#### 基本使用

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
    value: "notDelete"
  }
];

<RadioButton
  options={listItems}
  defaultValue="delete"
  onChange={console.log}
  className="mgb20"
/>;
```
