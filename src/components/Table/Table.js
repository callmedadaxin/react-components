import React, { useMemo } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import compose from "lodash/fp/compose";

import ColGroup from "./ColGroup";
import Header from "./Header";
import Body from "./Body";
import { withLimit, withExpand, withClick, withSelect } from "./helper";
import Item from "../Item";

function TableWrap({ scrollHeight, children, columns, className }) {
  return scrollHeight ? (
    <div className={className}>{children}</div>
  ) : (
    <table className={className}>
      <ColGroup columns={columns} />
      {children}
    </table>
  );
}

function Table({
  columns,
  data,
  border,
  hover,
  background,
  striped,
  showHeader,
  scrollHeight,
  sortFlag,
  sortKey,
  lineHeight,
  className,
  handleSortChange,
  hasMore,
  showMore,
  expandRowRender,
  expandRow,
  handleExpandChange,
  activeIndex,
  onClick,
  selected
}) {
  const cls = cx("table", className, {
    border,
    hover,
    background: background && !striped,
    striped
  });

  // 拍平columns
  const formatColumns = columns => {
    return columns.reduce(
      (total, cur) => total.concat(cur.children || cur),
      []
    );
  };

  const flatColumns = useMemo(() => formatColumns(columns), [columns]);

  const bodyProps = {
    columns: flatColumns,
    data,
    scrollHeight,
    lineHeight,
    hasMore,
    showMore,
    expandRow,
    expandRowRender,
    activeIndex,
    onClick,
    handleExpandChange,
    selected
  };

  return (
    <TableWrap className={cls} scrollHeight={scrollHeight} columns={columns}>
      <Item show={showHeader}>
        <Header
          scrollHeight={scrollHeight}
          columns={columns}
          flatColumns={flatColumns}
          sortFlag={sortFlag}
          sortKey={sortKey}
          handleSortChange={handleSortChange}
        />
      </Item>
      <Body body {...bodyProps} />
    </TableWrap>
  );
}

Table.defaultProps = {
  data: [],
  columns: [],
  border: true,
  hover: true,
  striped: false,
  background: true,
  showHeader: true,
  lineHeight: 50,
  defaultRenderExpand: false,
  expandOnly: false
};

Table.propTypes = {
  /** 内容数据 */
  data: PropTypes.array,
  /**
   * 列的规则
   * {
   *   title: '列标题',
   *   key: '字段',
   *   render: '渲染函数，可进行自定义渲染',
   *   width: '设置宽度',
   *   align: '对齐',
   *   limit: '设置是否单元格不换行处理'
   * }
   */
  columns: PropTypes.array,
  /** 前端分页，用于限制一次展示多少条 */
  pageLimit: PropTypes.number,
  /** 是否带边框 */
  border: PropTypes.bool,
  /** 是否带有hover样式 */
  hover: PropTypes.bool,
  /** 是否带有背景色 */
  background: PropTypes.bool,
  /** 是否各行换色 */
  striped: PropTypes.bool,
  /** 是否展示头 */
  showHeader: PropTypes.bool,
  /** 是否行可点击 */
  clickable: PropTypes.bool,
  /** 是否为多选表格 */
  select: PropTypes.bool,
  /** 点击行的回调 */
  handleRowClick: PropTypes.func,
  /** 每行的高度 */
  lineHeight: PropTypes.number,
  /** 可展开表格的渲染 */
  expandRowRender: PropTypes.func,
  /** 是否只能展开第一行 */
  expandOnly: PropTypes.bool,
  /** 默认展开第一行 */
  defaultRenderExpand: PropTypes.bool,
  /** 改变排序时的回调 */
  handleSortChange: PropTypes.func,
  /** 当前排序的key */
  sortKey: PropTypes.string,
  /** 当前排序的顺序 */
  sortFlag: PropTypes.oneOf(["asc", "desc"])
};

export default compose(
  withSelect,
  withClick,
  withExpand,
  withLimit
)(Table);
