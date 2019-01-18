#### 基本使用

背景是白的。。看不清不带边框的效果。。。

```js
<Box data={true} border>
  这是一个小盒子
</Box>
```

#### 带标题

- 使用 title 设置标题
- border 控制是否展示 border
- contentHeight 设置内容高度，用于展示图表

```js
<Box data={true} border title="这是盒子标题" clientHeight="200">
  这是一个小盒子
</Box>
```

#### 数据为空时，自动隐藏

会自动判断传入的数据，为空时隐藏盒子

```js
<Box border data={[]} title="这是盒子标题">
  这是一个小盒子
</Box>
```

#### 带 Loading 的盒子

```js
<Box data={true} isLoading title="这是盒子标题">
  这是一个小盒子
</Box>
```

#### 可折叠的盒子

```js
<Box data={true} collapse title="这是盒子标题">
  这是一个小盒子
</Box>
```

设置折叠按钮

```js
<Box
  data={true}
  collapse
  toggleRender={open => {
    return open ? "关闭！" : "打开！";
  }}
  title="这是盒子标题"
>
  这是一个小盒子
</Box>
```

#### changeLog

20180504

1.  修改当 data 为{}的时候，显示暂无数据
