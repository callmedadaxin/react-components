#### 基本使用

```js
<div className="row">
  <div className="col-4">
    <MultiInput placeholder="多选输入框" onChange={console.log} />
  </div>
</div>
```

默认值

```js
<div className="row">
  <div className="col-4">
    <MultiInput defaultValue={[1, 2]} onChange={console.log} />
  </div>
</div>
```

#### 各种状态

禁用

```js
<div className="row">
  <div className="col-4">
    <MultiInput disabled onChange={console.log} />
  </div>
</div>
```

hasError

```js
<div className="row">
  <div className="col-4">
    <MultiInput hasError onChange={console.log} />
  </div>
</div>
```
