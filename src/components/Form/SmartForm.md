#### 基本使用

通过 renderItem 劫持 FormItem,自动注入对应字段的内容，并在值修改的时候，自动刷新

方便进行级联操作等

```js
const Input = require("../Input").default;
const Radio = require("../Radio/Radio.js").default;
const RadioGroup = require("../Radio/RadioGroup.js").default;
const Select = require("../Select").default;
const MultiInput = require("../MultiInput").default;
const Button = require("../Button").default;
const Item = require("../Item").default;
const useRef = require("react").useRef;
const useState = require("react").useState;
const Fragment = require("react").Fragment;

const field = {
  name: {
    value: "王卫新",
    validators: [
      {
        required: true
      },
      {
        length: [0, 4]
      }
    ]
  },
  sex: {
    value: "male"
  },
  description: {
    value: "这是描述",
    validators: [
      {
        length: [0, 200]
      }
    ]
  },
  phone: {
    value: "13022423521",
    validators: [
      {
        required: true
      },
      {
        type: "phone"
      }
    ]
  },
  hobby: {
    value: "football",
    options: [
      {
        label: "篮球",
        value: "basketball"
      },
      {
        label: "足球",
        value: "football"
      },
      {
        label: "乒乓球",
        value: "pingpang"
      }
    ]
  },
  like: {
    value: "鹿晗"
  },
  emails: {
    value: ["11@qq.com"],
    validators: [
      {
        required: true
      },
      {
        type: "email"
      }
    ]
  }
};

function FormDatas() {
  const formRef = useRef();
  const [info, setInfo] = useState(false);

  const handleSubmit = () => {
    const ret = formRef.current.validateAndSubmit();
    console.log(ret);
  };
  const reset = () => {
    formRef.current.reset();
  };

  return (
    <SmartForm showInfo={info} data={field} ref={formRef}>
      {(data, renderItem) => (
        <Fragment>
          <div className="row mgb20">
            {renderItem(
              <FormItem label="姓名" field="name" placeholder="填写您的姓名">
                <Input />
              </FormItem>
            )}
          </div>
          <div className="row mgb20">
            {renderItem(
              <FormItem label="性别" field="sex">
                <RadioGroup>
                  <Radio label="男" value="male" />
                  <Radio label="女" value="female" />
                </RadioGroup>
              </FormItem>
            )}
          </div>
          <div className="row mgb20">
            {data.sex === "male"
              ? renderItem(
                  <FormItem label="爱好" field="hobby">
                    <Select options={field.hobby.options} />
                  </FormItem>
                )
              : renderItem(
                  <FormItem label="喜欢的男明星" field="like">
                    <Input />
                  </FormItem>
                )}
          </div>
          <div className="row mgb20">
            {renderItem(
              <FormItem
                label="自我介绍"
                placeholder="填写您的姓名"
                field="description"
              >
                <Input type="textarea" max="200" />
              </FormItem>
            )}
          </div>
          <div className="row mgb20">
            {renderItem(
              <FormItem label="电话" placeholder="填写您的电话" field="phone">
                <Input />
              </FormItem>
            )}
          </div>
          <div className="row mgb20">
            {renderItem(
              <FormItem label="邮箱" placeholder="填写您的邮箱" field="emails">
                <MultiInput />
              </FormItem>
            )}
          </div>
          <Button onClick={reset}>重置</Button>
          <Button onClick={handleSubmit} type="secondary">
            提交
          </Button>
          <Button onClick={() => setInfo(!info)}>
            {info ? "表单形式" : "信息形式"}
          </Button>
        </Fragment>
      )}
    </SmartForm>
  );
}
<FormDatas />;
```
