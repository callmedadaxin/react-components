#### 基本使用

``` js
<Switch onChange={console.log} defaultValue={false} />
```

可更改文字

``` js
const defaultMap = [{
  label: '错',
  value: false
}, {
  label: '对',
  value: true
}];

<Switch itemMap={defaultMap} onChange={console.log} />
```