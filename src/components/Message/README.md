#### 基本使用

```js
const Button = require("../Button").default;

function Wrap() {
  return (
    <div>
      <Button
        className="mgr10"
        onClick={() => Message.warning("这是一个warning提示")}
      >
        warning
      </Button>
      <Button
        className="mgr10"
        onClick={() => Message.success("这是一个success提示")}
      >
        success
      </Button>
      <Button
        className="mgr10"
        onClick={() => Message.error("这是一个error提示")}
      >
        error
      </Button>
    </div>
  );
}
<Wrap />;
```

#### 修改提示时间

- 默认关闭时间 3 秒
- 错误提示默认关闭时间 8 秒

```js
function Wrap() {
  return (
    <div>
      <Button
        className="mgr10"
        onClick={() => Message.warning("这是一个warning提示", 1000)}
      >
        1秒关闭
      </Button>
    </div>
  );
}
<Wrap />;
```

#### 修改提示位置

- 默认全局提示，可修改提示的容器

```js
function Wrap() {
  return (
    <div>
      <Button
        className="mgr10"
        onClick={() =>
          Message.warning(
            "这是一个warning提示",
            3000,
            document.querySelector(".rsg--sidebar-4")
          )
        }
      >
        以sidebar为容器
      </Button>
    </div>
  );
}
<Wrap />;
```
