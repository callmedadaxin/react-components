#### 基本使用

- 可以设置底部的按钮的文字

```js
const Button = require("../Button").default;
class BaseModal extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };
  }
  showModal() {
    this.setState({
      showModal: true
    });
  }
  closeModal() {
    this.setState({
      showModal: false
    });
  }
  render() {
    const { showModal } = this.state;
    return (
      <div className="row mgb20">
        <Button onClick={this.showModal.bind(this)} type="secondary">
          点我显示Modal
        </Button>
        <Modal
          appElement={document.querySelector("#app")}
          isOpen={showModal}
          title="测试Modal"
          handleEnsure={this.closeModal.bind(this)}
          handleCancel={this.closeModal.bind(this)}
          btnCancelTxt="关闭"
          btnEnsureTxt="上传！"
          contentLabel="TestModal"
        >
          <div>这是Modal里面的内容</div>
        </Modal>
      </div>
    );
  }
}
<BaseModal />;
```

#### 自定义底部按钮

通过 footer 自定义底部内容和事件

```js
const Button = require("../Button").default;
class BaseModal extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };
  }
  showModal() {
    this.setState({
      showModal: true
    });
  }
  closeModal() {
    this.setState({
      showModal: false
    });
  }
  renderFooter() {
    return <Button onClick={this.closeModal.bind(this)}>确定</Button>;
  }
  render() {
    const { showModal } = this.state;
    return (
      <div className="row mgb20">
        <Button onClick={this.showModal.bind(this)} type="secondary">
          只有一个按钮的Modal
        </Button>
        <Modal
          appElement={document.querySelector("#app")}
          isOpen={showModal}
          title="测试Modal"
          footer={this.renderFooter()}
          handleCancel={this.closeModal.bind(this)}
          contentLabel="TestModal"
        >
          <div>这是Modal里面的内容</div>
        </Modal>
      </div>
    );
  }
}
<BaseModal />;
```

#### 全局提示
```js
const Button = require("../Button").default;
const Modal = require('./index.js').default;

<div>
  <Button className="mgr20" onClick={
  () => Modal.alert('测试！！！！')
  }>alert</Button>
  <Button onClick={
    () => Modal.confirm('测试！！！！', {
      title: '标题',
      ensureTxt: '哦了',
      cancelTxt: '不能'
    }).then(() => {
      console.log('哦了！！')
    }).catch(() => {
      console.log('呸！')
    })
  }>confirm</Button>
</div>
```

#### changLog

1, 增加默认的 modal 样式，如果没有传入 className 则默认使用 modal-content 的样式
2, 修改 getResultStyle 当 isOpen 为 false 的时候，返回{}, 2018-7-16
