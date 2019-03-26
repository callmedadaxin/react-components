/*
 * 提供可折叠的功能
 * @Author: wangweixin@threatbook.cn
 * @Date: 2018-04-20 10:43:53
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2018-08-28 17:28:34
 */
import React, { Component, Fragment } from 'react'
// import PropTypes from 'prop-types'
import classNames from 'classnames'
import autobind from 'autobind-decorator'

const CollapseRow = Row =>
  class CollapseRow extends Component {
    state = {
      show: false
    }
    componentWillMount() {
      const { showExpand } = this.props
      if (showExpand) {
        this.setState({
          show: showExpand
        })
      }
    }
    componentWillReceiveProps(nextProps) {
      const { active, expandOnly } = nextProps
      if (expandOnly && !active) {
        this.setState({
          show: false
        })
      }
    }
    @autobind
    toggleShow(...args) {
      const { expandRowRender, onClick, expandOnly } = this.props

      this.setState({
        show: !this.state.show
      })

      // 如果不可展开，则进行其他向上传递
      if (!expandRowRender || expandOnly) {
        onClick && onClick.apply(null, args)
      }
    }
    render() {
      const { expandRowRender, className, expandOnly, ...others } = this.props
      const { rowData, rowIndex, columns, rowHasChild, active } = others
      const { show } = this.state
      const showExpand = (expandOnly ? active && show : show) && expandRowRender
      const classes = classNames(
        {
          'has-expand': expandRowRender,
          'show-expand': showExpand
        },
        className
      )
      const expand = showExpand
        ? expandRowRender(rowData, rowIndex, columns)
        : null
      return (
        <Fragment key={`base-row-wrap-${rowIndex}`}>
          <Row
            key={`base-row-${rowIndex}`}
            {...others}
            expandShow={showExpand}
            onClick={this.toggleShow}
            className={classes}
          />
          {showExpand && expand ? (
            <tr
              className="table-body-expand-row"
              key={`expand-row-${rowIndex}`}
            >
              <td colSpan={rowHasChild ? columns.length + 1 : columns.length}>
                <div className="table-body-expand-row-wrap">{expand}</div>
              </td>
            </tr>
          ) : null}
        </Fragment>
      )
    }
  }
export default CollapseRow
