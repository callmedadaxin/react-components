import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import isEqual from 'lodash/isEqual'

// 限制展示数量
const LimitTable = WrapedComponent =>
  class LimitTable extends Component {
    state = {
      list: [],
      page: 1
    }
    initData(props) {
      const { data, pageLimit } = props

      if (!pageLimit) {
        this.setState({
          list: data
        })
      } else {
        this.setState({
          list: data.slice(0, pageLimit)
        })
      }
    }
    componentWillMount() {
      this.initData(this.props)
    }
    componentWillReceiveProps(nextProps) {
      if (!isEqual(this.props.data, nextProps.data)) {
        this.initData(nextProps)
      }
    }
    @autobind
    showMore() {
      const { page } = this.state
      const { data, pageLimit } = this.props
      this.setState({
        list: data.slice(0, pageLimit * (page + 1)),
        page: page + 1
      })
    }
    render() {
      const { data, pageLimit, ...others } = this.props
      const { list } = this.state
      const hasMore = data.length > list.length && pageLimit

      return (
        <WrapedComponent
          hasMore={hasMore}
          showMore={this.showMore}
          data={list}
          {...others}
        />
      )
    }
  }
export default LimitTable
