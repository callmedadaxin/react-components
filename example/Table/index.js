import React, { useState } from "react";
import { Table } from "@";

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
    times: "32342342次",
    children: [
      {
        ip: "子12",
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
        ip: "子13",
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
    ]
  }
];
const columns = [
  {
    key: "labels",
    title: "1",
    width: 200,
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
    key: "ip",
    title: "2",
    width: 180,
    sortable: true,
    render(item) {
      return <span className="color-error">{item}</span>;
    }
  },
  {
    title: "操作",
    width: 200,
    render(item, row) {
      return <span>现在还没有操作</span>;
    }
  }
];

export default function Wrap() {
  const [sort, setSort] = useState({
    sortKey: "times",
    sortFlag: "asc"
  });
  const [list, setList] = useState(tableData);
  return (
    <div style={{ marginTop: 800 }}>
      <Table
        // scrollHeight={200}
        data={list}
        hasChild
        // pageLimit={4}
        columns={columns}
        select
        expandRowRender={(data, index, a, show) => {
          // console.log(show);
          // if (true) {
          // setList([...tableData]);
          // }
          return `第${index}的展开内容`;
        }}
        defaultRenderExpand
        expandOnly
        clickable
        style={{ marginTop: 500 }}
        handleRowClick={console.log}
        {...sort}
        handleSortChange={(sortKey, sortFlag) => {
          setList([...tableData]);
          setSort({
            sortKey,
            sortFlag
          });
        }}
      />
    </div>
  );
}
