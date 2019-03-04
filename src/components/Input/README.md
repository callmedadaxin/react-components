#### 基本使用

最基本的输入框

```js
const onChange = v => {
  console.log(v);
};

<div className="row">
  <div className="col-4">
    <Input onChange={onChange} />
  </div>
</div>;
```

基本的 textarea

```js
const onChange = v => {
  console.log(v);
};

<div className="row">
  <div className="col-4">
    <Input type="textarea" onChange={onChange} />
  </div>
</div>;
```

包含内容长度的输入框

```js
<div className="row">
  <div className="col-4">
    <Input
      type="textarea"
      onChange={console.log}
      defaultValue="ssdfdsf"
      max={200}
    />
  </div>
</div>
```

#### 不同状态

disabled 禁用样式
包含默认值

```js
<div>
  <div className="row">
    <div className="col-4">
      <Input disabled defaultValue="这是默认value" />
    </div>
  </div>
  <div className="row">
    <div className="col-4">
      <Input disabled type="textarea" />
    </div>
  </div>
</div>
```

hasError 错误时样式，集成表单组件时，当验证失效时，会自动注入 hasError 属性

```js
<div>
  <div className="row">
    <div className="col-4">
      <Input hasError onChange={console.log} />
    </div>
  </div>
  <div className="row">
    <div className="col-4">
      <Input hasError onChange={console.log} type="textarea" />
    </div>
  </div>
</div>
```
