#### 单独使用

可以单独使用它的样式

```js
const Input = require("../Input").default;

<FormItem label="姓名" onChange={console.log} defaultValue="wwx">
  <Input />
</FormItem>;
```

#### 配合 Collector 进行验证

```js
const useState = require("react").useState;
const Input = require("../Input").default;
const Collector = require("../Form").Collector;
const collector = new Collector();

function Wrap() {
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const onClick = () => {
    const ok = collector.validate();

    if (!ok) {
      console.log("验证不通过!");
    } else {
      console.log(name, age);
    }
  };
  return (
    <div>
      <div>
        <FormItem
          className="mgb20"
          label="姓名"
          onChange={val => setName(val)}
          collector={collector}
          validators={[
            {
              required: true
            },
            {
              length: [1, 20]
            }
          ]}
        >
          <Input placeholder="请输入姓名，必填，长度20" />
        </FormItem>
        <FormItem
          label="年龄"
          onChange={val => setAge(val)}
          collector={collector}
          validators={[
            {
              required: true
            },
            {
              fn(num) {
                return num < 20;
              }
            }
          ]}
        >
          <Input placeholder="请输入年龄，必填，必须小于20" />
        </FormItem>
        <Button onClick={onClick}>提交</Button>
      </div>
    </div>
  );
}
<Wrap />;
```
