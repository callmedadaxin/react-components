#### 基本使用

```js
const Box = require("../Box").default;
const Button = require("../Button").default;
const overlay = (
  <Box
    data={true}
    style={{ width: 300 }}
    border
    title="这是盒子标题"
    contentHeight="200"
  >
    这是一个小盒子
  </Box>
);
<Dropdown overlay={overlay}>
  <Button type="secondary">点我</Button>
</Dropdown>;
```

#### 更改触发方式

使用 trigger 进行更改

```js
const Box = require("../Box").default;
const Button = require("../Button").default;
const overlay = (
  <Box
    data={true}
    style={{ width: 300 }}
    border
    title="这是盒子标题"
    contentHeight="200"
  >
    这是一个小盒子
  </Box>
);
<Dropdown overlay={overlay} trigger="hover">
  <Button type="secondary">鼠标放在我上面</Button>
</Dropdown>;
```

#### 额外的隐藏方式

使用 trigger 进行更改

```js
const Box = require("../Box").default;
const Button = require("../Button").default;
const useState = require("react").useState;
const Fragment = require("react").Fragment;

function Controled() {
  const [show, setShow] = useState(false);

  const overlay = (
    <Box style={{ width: 300 }} title="控制关闭">
      <Fragment>
        <button>点我不可以关闭</button>
        <button onClick={() => setShow(false)}>点我可以关闭</button>
      </Fragment>
    </Box>
  );
  return (
    <Dropdown overlay={overlay} visible={show} onVisibleChange={setShow}>
      <button>点我</button>
    </Dropdown>
  );
}
<Controled />;
```

#### changelog

##### 2019-03-01 增加受控开关方式
