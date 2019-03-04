#### 基本使用

``` js
<div className="row mgb20">
  <div className="col-6 mgb20">
    <Radio label="选择1" name="a" value="1" onChange={console.log} />
    <Radio label="选择2" name="a" value="2" defaultChecked onChange={console.log} />
  </div>
</div>
```

#### 禁用状态
``` js
<div className="row mgb20">
  <div className="col-6 mgb20">
    <Radio label="选择1" name="b" value="1" disabled onChange={console.log} />
    <Radio label="选择2" name="b" value="2" defaultChecked onChange={console.log} />
  </div>
</div>
```