import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import pureRender from 'pure-render-decorator'

import Row from './Row'
import SelectTable from './SelectTable'
import LimitTable from './LimitTable'
import ClickTable from './ClickTable'

/**
 * 基本的表格
 */
@pureRender
@LimitTable
@SelectTable
@ClickTable
export default class BaseTable extends Component {
  /**
   * 格式化各列的colspan
   * @param {Number} index
   */
  getColSpan(index) {
    const { hasChild, select } = this.props

    if (!hasChild) {
      return 1
    }
    if (select) {
      return index === 1 ? 2 : 1
    }
    return index === 0 ? 2 : 1
  }
  /**
   * 提供排序功能，展示排序按钮
   * 点击按钮时，调用handleSortChange回调
   * @param {Array} column
   */
  renderSortIcon(column) {
    const { handleSortChange, sortKey, sortFlag } = this.props
    const change = sort => () =>
      handleSortChange && handleSortChange(column.key, sort)
    const active = sort =>
      column.key === sortKey && sort === sortFlag ? 'active' : ''

    return (
      <div className="table-sort-button">
        <span
          className={`topTriangle ${active('asc')}`}
          onClick={change('asc')}
        />
        <span
          className={`bottomTriangle ${active('desc')}`}
          onClick={change('desc')}
        />
      </div>
    )
  }
  /**
   * 设置colgroup, 以使各列对齐
   * @param {Array} columns
   * @param {Bool} isScrollHeader 是否可滚动
   */
  renderColGroup(columns, isScrollHeader) {
    const { hasChild } = this.props
    return (
      <colgroup>
        {hasChild ? <col style={{ width: 60, minWidth: 60 }} /> : null}
        {columns.map((column, index) => {
          const subWidth =
            index === columns.length - 1 && isScrollHeader ? 10 : 0
          const width = column.width + subWidth
          return (
            <col
              key={column.key + index}
              style={{
                width: width,
                minWidth: width
              }}
            />
          )
        })}
      </colgroup>
    )
  }
  /**
   * 格式化二级标题的columns
   */
  formatTitleColumns(columns) {
    let secondLine = []

    // 将children进行拼接
    columns.forEach(col => {
      if (col.children) {
        secondLine = secondLine.concat(col.children)
      }
    })

    return [columns, secondLine]
  }
  /**
   * 格式化包含二级标题的columns
   * 将二级列铺平
   */
  formatBodyColumns(columns) {
    return columns.reduce((total, cur) => {
      return total.concat(cur.children || cur)
    }, [])
  }
  renderHeader() {
    const { scrollHeight, columns } = this.props
    const [fristLine, secondLine] = this.formatTitleColumns(columns)
    const getCol = (children = []) => children.length - 1
    const tableHead = (
      <thead className="table-head">
        <tr>
          {fristLine.map((column, index) => {
            const cls = classNames('table-head-item')
            return (
              <th
                key={column.key + index}
                colSpan={this.getColSpan(index) + getCol(column.children)}
                rowSpan={column.children ? 1 : 2}
                className={cls}
              >
                {column.title}
                {column.sortable ? this.renderSortIcon(column) : null}
              </th>
            )
          })}
        </tr>
        {/* 二级标题 */}
        {secondLine.length ? (
          <tr>
            {secondLine.map((column, index) => {
              const cls = classNames('table-head-item')
              return (
                <th
                  key={column.key + index}
                  colSpan={this.getColSpan(index)}
                  className={cls}
                >
                  {column.title}
                  {column.sortable ? this.renderSortIcon(column) : null}
                </th>
              )
            })}
          </tr>
        ) : null}
      </thead>
    )
    return scrollHeight ? (
      <div className="table-header-wrap">
        <table>
          {this.renderColGroup(columns, true)}
          {tableHead}
        </table>
      </div>
    ) : (
      tableHead
    )
  }
  renderBody(bodyColumns) {
    const {
      data,
      columns,
      hasChild,
      expandRowRender,
      defaultRenderExpand,
      lineHeight,
      scrollHeight,
      hasMore,
      showMore,
      handleRowClick,
      activeIndex,
      striped,
      expandOnly
    } = this.props
    const tableBody = (
      <tbody className="table-body">
        {data.map((row, index) => {
          return (
            <Row
              key={'table-body-row-' + index}
              rowData={row}
              rowIndex={index}
              columns={bodyColumns}
              hasChild={hasChild}
              expandRowRender={expandRowRender}
              showExpand={defaultRenderExpand && index === 0}
              lineHeight={lineHeight}
              onClick={handleRowClick}
              striped={striped}
              expandOnly={expandOnly}
              active={index === activeIndex}
            />
          )
        })}
        {hasMore ? (
          <tr
            className="table-body-row table-show-more"
            onClick={showMore}
            style={{
              height: lineHeight
            }}
          >
            <td
              colSpan={hasChild ? columns.length + 1 : columns.length}
              style={{
                height: lineHeight
              }}
            >
              显示更多
            </td>
          </tr>
        ) : null}
      </tbody>
    )

    return scrollHeight ? (
      <div
        className="table-body-wrap"
        style={{
          maxHeight: scrollHeight
        }}
      >
        <table>
          {this.renderColGroup(columns)}
          {tableBody}
        </table>
      </div>
    ) : (
      tableBody
    )
  }
  render() {
    const {
      columns,
      border,
      hover,
      striped,
      background,
      showHeader,
      className,
      style,
      scrollHeight,
      role
    } = this.props
    const bodyColumns = this.formatBodyColumns(columns)

    const classes = classNames(
      {
        table: true,
        border,
        hover,
        background: background && !striped,
        striped
      },
      className
    )
    const tableContent = (
      <Fragment>
        {!scrollHeight ? this.renderColGroup(bodyColumns) : null}
        {showHeader ? this.renderHeader() : null}
        {this.renderBody(bodyColumns)}
      </Fragment>
    )
    return scrollHeight ? (
      <div role={role} className={classes} style={style}>
        {tableContent}
      </div>
    ) : (
      <table role={role} className={classes} style={style}>
        {tableContent}
      </table>
    )
  }
}
BaseTable.defaultProps = {
  data: [],
  columns: [],
  border: true,
  hover: true,
  background: true,
  showHeader: true,
  lineHeight: 50,
  defaultRenderExpand: false,
  expandOnly: false
}
BaseTable.propTypes = {
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
  sortFlag: PropTypes.oneOf(['asc', 'desc'])
}
