#### 基本使用

四种类型 error, warning, alarm, info, dark

```js
<div>
  <Label className="mgr10" type="error">
    error
  </Label>
  <Label className="mgr10" type="warning">
    warning
  </Label>
  <Label className="mgr10" type="alarm">
    alarm
  </Label>
  <Label className="mgr10" type="info">
    info
  </Label>
  <Label className="mgr10" type="dark">
    dark
  </Label>
</div>
```

##### light 版

```js
<div>
  <Label className="mgr10" light type="error">
    error
  </Label>
  <Label className="mgr10" light type="warning">
    warning
  </Label>
  <Label className="mgr10" light type="alarm">
    alarm
  </Label>
  <Label className="mgr10" light type="info">
    info
  </Label>
  <Label className="mgr10" light type="dark">
    info
  </Label>
</div>
```

##### 设置最大宽度

```js
<Label maxWidth={90} light type="dark">
  特别长特别长的内容特别长特别长的内容
</Label>
```

##### 带关闭的

```js
<Label closable light type="dark">
  可关闭
</Label>
```
