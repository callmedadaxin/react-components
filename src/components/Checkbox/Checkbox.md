#### 基本使用

```js
<div className="row mgb20">
  <div className="col-6 mgb20">
    <Checkbox label="选择1" value="1" onChange={console.log} />
    <Checkbox label="选择2" value="2" defaultChecked onChange={console.log} />
    <Checkbox label="半开" value="2" indeterminate onChange={console.log} />
  </div>
</div>
```

#### 禁用状态

```js
<div className="row mgb20">
  <div className="col-6 mgb20">
    <Checkbox label="选择1" value="1" disabled onChange={console.log} />
    <Checkbox
      label="选择2"
      value="2"
      disabled
      defaultChecked
      onChange={console.log}
    />
    <Checkbox
      label="半开"
      value="2"
      disabled
      indeterminate
      onChange={console.log}
    />
  </div>
</div>
```
