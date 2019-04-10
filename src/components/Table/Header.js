import React from "react";
import map from "lodash/map";
import get from "lodash/get";

import Item from "../Item";
import { Resizable } from "react-resizable";
import { withScrollHeight } from "./helper";

function SortIcon({ column, handleSortChange, sortKey, sortFlag }) {
  const change = sort => () => handleSortChange(column.key, sort);
  const active = sort =>
    column.key === sortKey && sort === sortFlag ? "active" : "";

  return (
    <div className="table-sort-button">
      <span
        className={`topTriangle ${active("asc")}`}
        onClick={change("asc")}
      />
      <span
        className={`bottomTriangle ${active("desc")}`}
        onClick={change("desc")}
      />
    </div>
  );
}

function Header({ columns, setColumns, handleResize, ...others }) {
  // 是否包含二级标题
  const columnHasChild = column => get(column, "children.length");

  // 二级标题
  const children = columns.reduce(
    (total, cur) => total.concat(cur.children || []),
    []
  );
  const hasChild = children.length;

  return (
    <thead className="table-head">
      <tr>
        {map(columns, (column, index) => {
          const { title, sortable, width } = column;
          return (
            <Resizable
              width={width}
              onResize={(e, { size }) =>
                handleResize(index, size, columns, setColumns)
              }
            >
              <th
                rowSpan={columnHasChild(column) ? 1 : 2}
                colSpan={columnHasChild(column) || 1}
                key={`table-header-${index}`}
                className="table-head-item"
              >
                {title}
                <Item show={sortable}>
                  <SortIcon column={column} {...others} />
                </Item>
              </th>
            </Resizable>
          );
        })}
      </tr>
      <Item show={hasChild}>
        <tr>
          {map(children, (column, index) => {
            const { title, sortable } = column;
            return (
              <th
                key={`table-header-child-${index}`}
                className="table-head-item"
              >
                {title}
                <Item show={sortable}>
                  <SortIcon column={column} {...others} />
                </Item>
              </th>
            );
          })}
        </tr>
      </Item>
    </thead>
  );
}

export default withScrollHeight(Header);
