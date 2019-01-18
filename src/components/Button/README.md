#### 基本使用

```js
const handleClick = () => {
  alert(1);
};
<Button onClick={handleClick}>点我</Button>;
```

#### 5 种基本样式

```js
<div>
  <Button className="mgr20">按钮</Button>
  <Button className="mgr20" type="primary">按钮</Button>
  <Button className="mgr20" type="secondary">按钮</Button>
  <Button className="mgr20" type="cancel">按钮</Button>
  <Button className="mgr20" type="link">按钮</Button>
  <Button width="200">设置了宽度</Button>
</div>
```
