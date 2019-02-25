#### 基本使用

``` js
const Button = require('../Button').default;
<Popover content="这是内容这是内容这是内容">
  <Button>Popover</Button>
</Popover>
```

#### 控制触发方式

``` js
// import { TRIGGER } from '@common/lib'
const Button = require('../Button').default;
const TRIGGER = require('./constant.js').TRIGGER;

<Popover content="这是内容这是内容这是内容" trigger={TRIGGER.CLICK}>
  <Button>Popover</Button>
</Popover>
```

#### 控制位置

``` js
// import { POSITION } from '@common/lib'
const Button = require('../Button').default;
const POSITION = require('./constant.js').POSITION;

<div>
  <Popover content="这是内容这是内容这是内容" className="mgr20" position={POSITION.TOP}>
    <Button>top</Button>
  </Popover>
  <Popover content="这是内容这是内容这是内容" className="mgr20" position={POSITION.RIGHT}>
    <Button>right</Button>
  </Popover>
  <Popover content="这是内容这是内容这是内容" className="mgr20" position={POSITION.BOTTOM}>
    <Button>bottom</Button>
  </Popover>
  <Popover content="这是内容这是内容这是内容" className="mgr20" position={POSITION.LEFT}>
    <Button>left</Button>
  </Popover>
</div>

```
#### changeLog
1, 去掉popover的最小宽带和最大宽度的限制   2018-7-18 zsj

