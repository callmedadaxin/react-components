#### 基本使用

``` js
class Demo extends React.Component {
  constructor () {
    super ()
    this.state = {
      current: 1
    }
  }
  handlePageChange (current) {
    this.setState({
      current
    })
  }
  render () {
    const { current } = this.state

    return <Pagination current={current} onChange={this.handlePageChange.bind(this)} total={100} />
  }
};
<Demo/>
```