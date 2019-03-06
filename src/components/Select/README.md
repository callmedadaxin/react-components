#### 基本使用

最基本的多选，单选，打开控制台看输出的值

```js
const options = [
  {
    label: "111",
    value: "111"
  },
  {
    label: "222",
    value: "222"
  },
  {
    label: "333",
    value: "333"
  }
];
<div>
  <p>单选</p>
  <div className="row">
    <div className="col-6">
      <Select onChange={console.log} options={options} clearable={false} />
    </div>
  </div>
  <p>多选</p>
  <div className="row">
    <div className="col-6 mgb20">
      <Select onChange={console.log} options={options} multi />
    </div>
  </div>
</div>;
```

#### 各种状态

禁用状态和错误状态

```js
const options = [
  {
    label: "111",
    value: "111"
  },
  {
    label: "222",
    value: "222"
  },
  {
    label: "333",
    value: "333"
  }
];

<div className="row">
  <div className="col-6 mgb20">
    <Select onChange={console.log} options={options} hasError />
  </div>
  <div className="col-6 mgb20">
    <Select onChange={console.log} options={options} disabled />
  </div>
</div>;
```

#### 默认值

为组件设置默认值

```js
const options = [
  {
    label: "111",
    value: "111"
  },
  {
    label: "222",
    value: "222"
  },
  {
    label: "333",
    value: "333"
  }
];

<div>
  <div className="row">
    <div className="col-6 mgb20">
      <Select
        onChange={console.log}
        options={options}
        disabled
        defaultValue="111"
      />
    </div>
  </div>
  <div className="row">
    <div className="col-6 mgb20">
      <Select
        onChange={console.log}
        options={options}
        multi
        disabled
        defaultValue={["111", "222"]}
      />
    </div>
  </div>
</div>;
```

#### changelog

2018-06-07
1，修改文档

2018-12-24
2, 注意如果 options 和 defaultValue 同时变化的时候，defaultValue 会不起作用，保持 options 稳定
