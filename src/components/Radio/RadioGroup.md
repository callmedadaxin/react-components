#### 基本使用

一组 Radio, 自动包含值，name,onchange 等维护,
注：当值为 object 时，若想设置默认值，则应用该值的引用
Radio.RadioGroup = RadioGroup

```js
const dfValue = {
  a: 1
};
<div className="col-6 mgb20">
  <RadioGroup defaultValue={dfValue} onChange={console.log}>
    <Radio label="选择1" value={dfValue} />
    <Radio label="选择2" value={{ a: 2 }} />
  </RadioGroup>
</div>;
```

#### 禁用状态

```js
const dfValue = {
  a: 1
};
<div className="col-6 mgb20">
  <RadioGroup defaultValue={dfValue} disabled onChange={console.log}>
    <Radio label="选择1" value={dfValue} />
    <Radio label="选择2" value={{ a: 2 }} />
  </RadioGroup>
</div>;
```
