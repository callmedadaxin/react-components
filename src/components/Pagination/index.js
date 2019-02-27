import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RCPagination from 'rc-pagination'
import classNames from 'classnames'
import 'rc-pagination/assets/index.css'

/**
 * rc-pagination的二次封装
 * @see https://github.com/react-component/pagination
 */
export default class Pagination extends Component {
  handleClick = (direction, hasPrev, hasNext) => {
    const { onChange, current } = this.props
    return () => {
      if (direction === 'prev' && !hasPrev) return
      if (direction === 'next' && !hasNext) return
      const newPage = direction === 'prev' ? current - 1 : current + 1
      onChange(newPage)
    }
  }
  renderBasic(classes) {
    const { itemNum, current, pageSize } = this.props
    const hasPrev = current > 1
    const hasNext = itemNum === pageSize
    return (
      <ul className={classes} unselectable="unselectable">
        <li
          onClick={this.handleClick('prev', hasPrev, hasNext)}
          title="上一页"
          className={`${
            !hasPrev ? 'rc-pagination-disabled' : ''
          } rc-pagination-prev`}
        >
          <a className="rc-pagination-item-link" />
        </li>
        <li
          onClick={this.handleClick('next', hasPrev, hasNext)}
          title="下一页"
          className={`${
            !hasNext ? 'rc-pagination-disabled' : ''
          } rc-pagination-next`}
        >
          <a role="pagination" className="rc-pagination-item-link" />
        </li>
      </ul>
    )
  }
  render() {
    const { className, total, ...others } = this.props
    const classes = classNames('tip-pagination', className)

    if (total < 1) {
      return this.renderBasic(classes)
    }
    return <RCPagination className={classes} total={total} {...others} />
  }
}
Pagination.propTypes = {
  /** 当前的在第几页，比如一共5页面，current=1，则显示当前在第一页 */
  current: PropTypes.number.isRequired,
  /** 点击切换分页的时候，调用的函数 */
  onChange: PropTypes.func.isRequired,
  /** 当前分页所有的总数目 */
  total: PropTypes.number.isRequired,
  /** 每页显示多少条数据，默认是10 */
  pageSize: PropTypes.number
}
