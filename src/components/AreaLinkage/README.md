#### 基本使用

基本的动态省市联动框

```js
const onSelect = v => {
  console.log(v);
};

<AreaLinkage onSelect={onSelect} />;
```

#### changeLog

1, fix 重新选择省份，没有取消城市 bug
