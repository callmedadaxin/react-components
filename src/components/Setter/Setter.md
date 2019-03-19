#### 基本使用

针对于深层次的表单输入

```js
const data = {
  user: {
    name: "wwx",
    sex: "male"
  },
  job: {
    type: "engineer",
    workTime: 9
  }
};

const useRef = require("react").useRef;
const Form = require("../Form").default;
const Input = require("../Input").default;
const Button = require("../Button").default;
const FormItem = Form.Item;

function Wrap() {
  const setterRef = useRef();

  const onSubmit = () => {
    const result = setterRef.current.getResult();
    console.log(result);
  };

  return (
    <Setter data={data} ref={setterRef}>
      {(draft, value) => {
        return (
          <div>
            <FormItem
              label="姓名"
              value={value.user.name}
              onChange={name => (draft.user.name = name)}
            >
              <Input />
            </FormItem>
            <Button onClick={onSubmit}>提交</Button>
          </div>
        );
      }}
    </Setter>
  );
}
<Wrap />;
```

实时获取内容，进行级联处理

性别改变时，选项也会进行改变

```js
const data = {
  user: {
    name: "wwx",
    sex: "male"
  },
  job: {
    type: "工程师",
    workTime: 9
  }
};

const sexOptions = [
  {
    label: "男",
    value: "male"
  },
  {
    label: "女",
    value: "female"
  }
];

const useRef = require("react").useRef;
const Form = require("../Form").default;
const Input = require("../Input").default;
const Select = require("../Select").default;
const Item = require("../Item").default;
const Button = require("../Button").default;
const FormItem = Form.Item;

function Wrap() {
  const setterRef = useRef();

  const onSubmit = () => {
    const result = setterRef.current.getResult();
    console.log(result);
  };

  return (
    <Setter data={data} ref={setterRef}>
      {(draft, value) => {
        const isMale = value.user.sex === "male";
        return (
          <div>
            <FormItem
              label="姓名"
              value={value.user.name}
              onChange={name => (draft.user.name = name)}
              className="mgb20"
            >
              <Input />
            </FormItem>
            <FormItem
              label="性别"
              value={value.user.sex}
              className="mgb20"
              onChange={sex => (draft.user.sex = sex)}
            >
              <Select options={sexOptions} />
            </FormItem>
            <Item show={isMale}>
              <FormItem
                label="工作"
                className="mgb20"
                value={value.job.type}
                onChange={type => (draft.job.type = type)}
              >
                <Input />
              </FormItem>
            </Item>
            <Item show={!isMale}>
              <FormItem
                className="mgb20"
                label="工作年限"
                value={value.job.workTime}
                onChange={workTime => (draft.job.workTime = workTime)}
              >
                <Input />
              </FormItem>
            </Item>
            <Button onClick={onSubmit}>提交</Button>
          </div>
        );
      }}
    </Setter>
  );
}
<Wrap />;
```

配合 Collector 进行验证

```js
const data = {
  user: {
    name: "wwx",
    sex: "male"
  },
  job: {
    type: "工程师",
    workTime: 9
  }
};

const sexOptions = [
  {
    label: "男",
    value: "male"
  },
  {
    label: "女",
    value: "female"
  }
];

const useRef = require("react").useRef;
const Form = require("../Form").default;
const Input = require("../Input").default;
const Select = require("../Select").default;
const Button = require("../Button").default;
const Item = require("../Item").default;

const { Collector, Item: FormItem } = Form;

const collector = new Collector();

function Wrap() {
  const setterRef = useRef();

  const onSubmit = () => {
    const isOk = collector.validate();

    if (isOk) {
      const result = setterRef.current.getResult();
      console.log(result);
    } else {
      console.log("验证失败！");
    }
  };

  return (
    <Setter data={data} ref={setterRef}>
      {(draft, value) => {
        const isMale = value.user.sex === "male";
        return (
          <div>
            <FormItem
              label="姓名"
              value={value.user.name}
              className="mgb20"
              validators={[
                {
                  requires: true
                },
                {
                  length: [3, 6]
                }
              ]}
              collector={collector}
              onChange={name => (draft.user.name = name)}
            >
              <Input />
            </FormItem>
            <FormItem
              label="性别"
              value={value.user.sex}
              className="mgb20"
              onChange={sex => (draft.user.sex = sex)}
            >
              <Select options={sexOptions} />
            </FormItem>
            <Item show={isMale}>
              <FormItem
                className="mgb20"
                label="工作"
                value={value.job.type}
                onChange={type => (draft.job.type = type)}
              >
                <Input />
              </FormItem>
            </Item>
            <Item show={!isMale}>
              <FormItem
                className="mgb20"
                label="工作年限"
                value={value.job.workTime}
                onChange={workTime => (draft.job.workTime = workTime)}
              >
                <Input />
              </FormItem>
            </Item>
            <Button onClick={onSubmit}>提交</Button>
          </div>
        );
      }}
    </Setter>
  );
}
<Wrap />;
```
