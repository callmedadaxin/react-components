#### 基本使用

```js
const Button = require("../Button").default;
<Tooltip content="这是内容这是内容这是内容">
  <Button>Tooltip</Button>
</Tooltip>;
```

#### 控制触发方式

```js
const Button = require("../Button").default;

<Tooltip content="这是内容这是内容这是内容" trigger="click">
  <Button>点击触发</Button>
</Tooltip>;
```

#### 控制位置

```js
const Button = require("../Button").default;

<div>
  <Tooltip content="这是内容这是内容这是内容" className="mgr20" position="top">
    <Button>top</Button>
  </Tooltip>
  <Tooltip
    content="这是内容这是内容这是内容"
    className="mgr20"
    position="right"
  >
    <Button>right</Button>
  </Tooltip>
  <Tooltip
    content="这是内容这是内容这是内容"
    className="mgr20"
    position="bottom"
  >
    <Button>bottom</Button>
  </Tooltip>
  <Tooltip content="这是内容这是内容这是内容" className="mgr20" position="left">
    <Button>left</Button>
  </Tooltip>
</div>;
```
