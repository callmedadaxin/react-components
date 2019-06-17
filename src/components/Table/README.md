#### 基本使用

- 最基本的表格
- width 控制宽度
- render 控制自定义渲染
- align 控制对齐
- limit 设置超出省略号（需控制宽度）

```js
const tableData = [
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "3234234232342342次32342342次32342342次次"
  },
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  },
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  },
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  }
];
const columns = [
  {
    key: "labels",
    title: "1",
    render(items) {
      return items.map(item => {
        return (
          <label key={item.desc} className="label label-info mgr10">
            {item.desc}
          </label>
        );
      });
    }
  },
  {
    key: "type",
    title: "2",
    render(item) {
      return <span className="color-error">{item}</span>;
    }
  },
  {
    key: "times",
    title: "3",
    width: 120,
    limit: true
  },
  {
    title: "操作",
    render(item, row) {
      return <span>现在还没有操作</span>;
    }
  }
];
<Table striped columns={columns} data={tableData} />;
```

##### 特殊效果

- 不带边框
- 不带 hover 效果
- 不带头
- 行高 30px

```js
const tableData = [
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  },
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  },
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  },
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  }
];
const columns = [
  {
    key: "labels",
    title: "1",
    render(items) {
      return items.map(item => {
        return (
          <label key={item.desc} className="label label-info mgr10">
            {item.desc}
          </label>
        );
      });
    }
  },
  {
    key: "type",
    title: "2",
    render(item) {
      return <span className="color-error">{item}</span>;
    }
  },
  {
    key: "times",
    title: "3"
  },
  {
    title: "操作",
    render(item, row) {
      return <span>现在还没有操作</span>;
    }
  }
];
<Table
  columns={columns}
  background={false}
  hover={false}
  border={false}
  showHeader={false}
  lineHeight={30}
  data={tableData}
/>;
```

#### 二级标题

添加二级标题渲染，column 添加 children

```js
const tableData = [
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "3234234232342342次32342342次32342342次次"
  },
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  },
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  },
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  }
];
const columns = [
  {
    key: "labels",
    title: "1",
    render(items) {
      return items.map(item => {
        return (
          <Label className="mgr10" light key={item.desc} type={item.type}>
            {item.desc}
          </Label>
        );
      });
    },
    width: 250
  },
  {
    key: "",
    title: "大标题",
    children: [
      {
        key: "type",
        title: "子标题1",
        render(item) {
          return <span className="color-error">{item}</span>;
        },
        width: 80
      },
      {
        key: "times",
        title: "子标题2",
        width: 120,
        limit: true
      }
    ]
  },
  {
    title: "操作",
    render(item, row, { expandShow }) {
      return <span>{expandShow ? "收起" : "展开"}</span>;
    },
    width: 80
  }
];
<Table columns={columns} data={tableData} />;
```

##### 排序表格

- 配合后端进行排序
- 使用 sortable 控制某字段是否排序
- 需传入当前排序的 sortKey 和当前的顺序 sortFlag
- 排序更改时会自动调用 handleSortChange, 请求后端

```js
const tableData = [
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  },
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  },
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  },
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  }
];
const columns = [
  {
    key: "labels",
    title: "1",
    render(items) {
      return items.map(item => {
        return (
          <label key={item.desc} className="label label-info mgr10">
            {item.desc}
          </label>
        );
      });
    }
  },
  {
    key: "type",
    title: "2",
    render(item) {
      return <span className="color-error">{item}</span>;
    },
    sortable: true
  },
  {
    key: "times",
    title: "3",
    sortable: true
  },
  {
    title: "操作",
    render(item, row) {
      return <span>现在还没有操作</span>;
    }
  }
];
class ExampleTable extends React.Component {
  constructor() {
    this.state = {
      sortKey: "",
      sortFlag: ""
    };
  }
  handleSortChange(sortKey, sortFlag) {
    this.setState({
      sortKey,
      sortFlag
    });
  }
  render() {
    const { sortKey, sortFlag } = this.state;
    return (
      <Table
        striped
        columns={columns}
        sortKey={sortKey}
        sortFlag={sortFlag}
        handleSortChange={this.handleSortChange.bind(this)}
        data={tableData}
      />
    );
  }
}
<ExampleTable />;
```

##### 固定头部

- 通过 scrollHeight 设置底部最大高度，表头将自动固定
- 尽量设置每个单元格的宽度，以保证两端对齐

```js
let tableData = [
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  },
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  },
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  },
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  }
];
tableData = tableData.concat(tableData, tableData);

const columns = [
  {
    key: "labels",
    title: "1",
    render(items) {
      return items.map(item => {
        return (
          <label key={item.desc} className="label label-info mgr10">
            {item.desc}
          </label>
        );
      });
    },
    width: 150
  },
  {
    key: "type",
    title: "2",
    render(item) {
      return <span className="color-error">{item}</span>;
    },
    width: 80
  },
  {
    key: "times",
    title: "3",
    width: 120
  },
  {
    title: "操作",
    render(item, row, { expandShow }) {
      return <span>{expandShow ? "收起" : "展开"}</span>;
    },
    width: 90
  }
];
const expandRowRender = (row, index) => (
  <div>
    这是扩展的内容
    <p>这是第{index + 1}行的展开内容</p>
    <p>可以各种自定义</p>
  </div>
);
<Table
  columns={columns}
  expandRowRender={expandRowRender}
  defaultRenderExpand
  scrollHeight={250}
  data={tableData}
/>;
```

##### 前端分页

- pageLimit 设置前端分页，每次只添加多少条

```js
let tableData = [
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  },
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  },
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  },
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  }
];
tableData = tableData.concat(tableData, tableData);

const columns = [
  {
    key: "labels",
    title: "1",
    render(items) {
      return items.map(item => {
        return (
          <label key={item.desc} className="label label-info mgr10">
            {item.desc}
          </label>
        );
      });
    },
    width: 150
  },
  {
    key: "type",
    title: "2",
    render(item) {
      return <span className="color-error">{item}</span>;
    },
    width: 80
  },
  {
    key: "times",
    title: "3",
    width: 120
  },
  {
    title: "操作",
    render(item, row, { expandShow }) {
      return <span>{expandShow ? "收起" : "展开"}</span>;
    },
    width: 90
  }
];
<Table
  columns={columns}
  pageLimit={6}
  defaultRenderExpand
  scrollHeight={250}
  data={tableData}
/>;
```

##### 可展开

- expandRowRender 设置展开内容
- 带有展开的行会带有 has-expand class
- 在 column 的 render 会回传当前 row 是否展开，用于自定义操作状态
- defaultRenderExpand 设置是否默认展开第一行
- defaultRenderExpandIndex 设置是默认展开表格中的某一行, 取值范围大于等于0,小于等于数组长度。(如果设置了该值，需要设置defaultRenderExpand为false)
- expandOnly 用于控制是否只同时展开一行

```js
const tableData = [
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  },
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  },
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  },
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  }
];
const columns = [
  {
    key: "labels",
    title: "1",
    render(items) {
      return items.map(item => {
        return (
          <label key={item.desc} className="label label-info mgr10">
            {item.desc}
          </label>
        );
      });
    }
  },
  {
    key: "type",
    title: "2",
    render(item) {
      return <span className="color-error">{item}</span>;
    }
  },
  {
    key: "times",
    title: "3"
  },
  {
    title: "操作",
    render(item, row, { expandShow }) {
      return <span>{expandShow ? "收起" : "展开"}</span>;
    }
  }
];
const expandRowRender = (row, index) => (
  <div>
    这是扩展的内容
    <p>这是第{index + 1}行的展开内容</p>
    <p>可以各种自定义</p>
  </div>
);
<div>
  普通展开
  <Table
    columns={columns}
    className="mgb20"
    expandRowRender={expandRowRender}
    data={tableData}
  />
  默认展开第一行，且同时只能展开一行
  <Table
    columns={columns}
    className="mgb20"
    expandOnly
    expandRowRender={expandRowRender}
    defaultRenderExpand
    data={tableData}
  />
</div>;
```

##### ~~~带有 children 的行~~~

已移除

#### 单选表格

- 通过 clickable 设置每行可点击
- handleRowClick 点击回调
- 不可与展开，子行的表格同时使用

```js
const tableData = [
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  },
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  },
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  },
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  }
];
const columns = [
  {
    key: "labels",
    title: "1",
    render(items) {
      return items.map(item => {
        return (
          <label key={item.desc} className="label label-info mgr10">
            {item.desc}
          </label>
        );
      });
    }
  },
  {
    key: "type",
    title: "2",
    render(item) {
      return <span className="color-error">{item}</span>;
    }
  },
  {
    key: "times",
    title: "3"
  },
  {
    title: "操作",
    render(item, row) {
      return <span>现在还没有操作</span>;
    }
  }
];
<Table
  columns={columns}
  clickable
  striped
  handleRowClick={console.log}
  data={tableData}
/>;
```

#### 多选表格

- 通过 select 属性设置表格可选择
- handleSelectChanged 点击回调

```js
const tableData = [
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  },
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  },
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  },
  {
    ip: "87.101.12.12",
    labels: [
      {
        type: "error",
        desc: "IDC机房"
      },
      {
        type: "info",
        desc: "辣鸡邮件"
      }
    ],
    type: "阻断",
    times: "32342342次"
  }
];
const columns = [
  {
    key: "labels",
    title: "1",
    render(items) {
      return items.map(item => {
        return (
          <label key={item.desc} className="label label-info mgr10">
            {item.desc}
          </label>
        );
      });
    }
  },
  {
    key: "type",
    title: "2",
    render(item) {
      return <span className="color-error">{item}</span>;
    }
  },
  {
    key: "times",
    title: "3"
  },
  {
    title: "操作",
    render(item, row) {
      return <span>现在还没有操作</span>;
    }
  }
];
<Table
  columns={columns}
  select
  striped
  handleSelectChanged={console.log}
  data={tableData}
/>;
```
