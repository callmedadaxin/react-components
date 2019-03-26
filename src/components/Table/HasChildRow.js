/*
 * 提供展开收起子行的功能
 * @Author: wangweixin@threatbook.cn
 * @Date: 2018-04-20 10:43:53
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2018-08-23 20:40:56
 */
import React, { Component, Fragment } from 'react'
// import PropTypes from 'prop-types'
import classNames from 'classnames'
import autobind from 'autobind-decorator'

import Icon from '../Icon'
import addIcon from '@/images/svg/add.svg'
import subIcon from '@/images/svg/sub.svg'

const CollapseRow = Row =>
  class HasChildRow extends Component {
    state = {
      showChild: false
    }
    @autobind
    toggleShow (e) {
      e.stopPropagation()

      this.setState({
        showChild: !this.state.showChild
      })
    }
    getRetColumns (isParent, rowHasChild) {
      const { hasChild, columns } = this.props
      const { showChild } = this.state
      const retColumns = columns.slice(0)

      // 没有子行，返回默认
      if (!hasChild) return columns

      // 有子行，且不是子行，前面添加带图标的列
      if (rowHasChild && isParent) {
        retColumns.unshift({
          render: () => <Icon
            className="table-body-has-child-icon"
            onClick={this.toggleShow}
            link={showChild ? subIcon : addIcon}
          />
        })
        return retColumns
      }
      // 当前为子行，前面添加空列
      retColumns.unshift({
        render () {
          return ''
        }
      })
      return retColumns
    }
    render () {
      const { hasChild, className, ...others } = this.props
      const { rowData, rowIndex } = others
      const { showChild } = this.state
      const rowHasChild = hasChild && rowData.children && rowData.children.length > 0
      const classes = classNames({
        'has-child': rowHasChild,
        'show-child': showChild
      }, className)
      const childClasses = classNames('is-child', className)

      return (
        <Fragment>
          <Row key={`child-row-${rowIndex}`} {...others}
            className={classes}
            rowHasChild={rowHasChild}
            columns={this.getRetColumns(true, rowHasChild)}/>
          {
            rowHasChild && showChild
              ? rowData.children.map((childRow, index) => <Row {...others}
                key={`child-row-${rowIndex}-${index}`}
                className={childClasses}
                columns={this.getRetColumns(false, rowHasChild)}/>)
              : null
          }
        </Fragment>
      )
    }
  }
export default CollapseRow
