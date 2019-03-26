import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
// import classNames from 'classnames'
import Row from './CollapseRow'
import Icon from '../Icon'
import addIcon from '@/images/svg/add.svg'
import subIcon from '@/images/svg/sub.svg'
import autobind from 'autobind-decorator'

export default class ChildRows extends Component {
  constructor (props) {
    super(props)
    const { show = false } = this.props
    this.state = {
      show: show
    }
  }
  @autobind
  toggleRow (e) {
    e.stopPropagation()
    e.preventDefault()
    this.setState({
      show: !this.state.show
    })
  }
  getRetColumns (isParent) {
    const { columns: c, row, select, hasChild: hasChildren } = this.props
    const hasChild = row.children && row.children.length
    const columns = c.slice(0)
    const { show } = this.state
    const render = () => {
      return isParent
        ? <Icon
          className="table-body-has-child-icon"
          onClick={this.toggleRow}
          link={show ? subIcon : addIcon} />
        : <td></td>
    }
    // 添加带子行的Icon
    if (hasChild) {
      if (select) {
        columns.splice(1, 0, {
          render
        })
      } else {
        columns.unshift({
          render
        })
      }
    } else if (hasChildren) {
      columns.unshift({
        render: () => <td></td>
      })
    }
    return columns
  }
  render () {
    const { row, index, hasChild, lineHeight,
      expandRowRender, clickable, changeActive,
      defaultRenderExpand, active } = this.props
    const { show } = this.state
    return (
      <Fragment>
        <Row key={'table-body-row-' + index}
          row={row}
          index={index}
          columns={this.getRetColumns(true)}
          expandRowRender={expandRowRender}
          lineHeight={lineHeight}
          hasChildren={hasChild}
          hasChild={row.children && row.children.length}
          showChild={show}
          clickable={clickable}
          changeActive={changeActive}
          show={defaultRenderExpand}
          active={active}
          style={{ height: lineHeight + 'px' }} />
        {
          row.children && row.children.length && show
            ? row.children.map((child, i) => {
              return (
                <Row key={`table-body-row-${index}-${i}`}
                  row={child}
                  index={i}
                  columns={this.getRetColumns()}
                  isChild
                  expandRowRender={expandRowRender}
                  lineHeight={lineHeight}
                  style={{ height: lineHeight + 'px' }} />
              )
            })
            : null
        }
      </Fragment>
    )
  }
}
Row.propTypes = {
  row: PropTypes.object,
  columns: PropTypes.array,
  index: PropTypes.number,
  lineHeight: PropTypes.number,
  expandRowRender: PropTypes.func
}
