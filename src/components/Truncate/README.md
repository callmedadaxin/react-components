#### 基本使用

默认超出,设置...

```js
<div style={{ width: 200 }}>
  <Truncate>
    水电费水电费是的分水电费水电费是的分水电费水电费是的分水电费水电费是的分水电费水电费是的分水电费水电费是的分
  </Truncate>
</div>
```

多行, 不可展开

```js
<div style={{ width: 200 }}>
  <Truncate canReadMore={false} line={2}>
    水电费水电费是的分水电费水电费是的分水电费水电费是的分水电费水电费是的分水电费水电费是的分水电费水电费是的分
  </Truncate>
</div>
```

设置展开文字

```js
<div style={{ width: 200 }}>
  <Truncate more="打开" less="关闭" line={2}>
    水电费水电费是的分水电费水电费是的分水电费水电费是的分水电费水电费是的分水电费水电费是的分水电费水电费是的分
  </Truncate>
</div>
```

#### changLog

1, 增加\_isMounted, 只有\_isMounted 为 true 的时候,才可以 setState() \_\_\_\_zsj
