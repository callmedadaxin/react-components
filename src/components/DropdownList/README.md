### 基本使用

```js
const listItems = [
  {
    label: "修改密码",
    value: "edit"
  },
  {
    label: "删除",
    value: "delete"
  }
];
<DropdownList
  style={{
    width: 300
  }}
  onChange={console.log}
  className="mgb20"
  listItems={listItems}
>
  操作
</DropdownList>;
```

### 修改触发区域的值

```js
const listItems = [
  {
    label: "激活",
    value: "1"
  },
  {
    label: "失效",
    value: "0"
  }
];
<DropdownList
  style={{
    width: 300
  }}
  onChange={console.log}
  className="mgb20"
  trigger="hover"
  changeValue
  listItems={listItems}
>
  操作
</DropdownList>;
```
