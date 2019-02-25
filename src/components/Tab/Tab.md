#### 基本使用

最单纯的 Tab,可以切换各选项卡的内容

```js
<Tab>
  <TabPanel header="告警明细" keys="1">
    111
  </TabPanel>
  <TabPanel header="告警不明细" keys="2">
    222
  </TabPanel>
</Tab>
```

#### 基本主题

提供 card 版本主题

```js
<Tab defaultActiveKey="2" theme="card">
  <TabPanel header="告警明细" keys="1">
    111
  </TabPanel>
  <TabPanel header="告警不明细" keys="2">
    222
  </TabPanel>
</Tab>
```
