import React from 'react'
import ReactDOM from 'react-dom'
import Button from '../Button'
import Dialog from './Modal'

/**
 * 通用的confirm方法
 * @param {Object} config 配置信息
 */
export default function confirm(config) {
  const {
    title = '提示',
    cancelTxt = '取消',
    ensureTxt = '确定',
    body = '',
    isAlert = false,
    width = 500
  } = config
  const style = {
    content: {
      width
    }
  }
  let div = document.createElement('div')
  document.body.appendChild(div)

  function close(...args) {
    const unmountResult = ReactDOM.unmountComponentAtNode(div)
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div)
    }
  }
  const footer = isAlert ? <Button type="primary" width="80" onClick={close}>确定</Button>
    : undefined

  return new Promise((resolve, reject) => {
    function ensure() {
      close()
      resolve()
    }
    function cancel() {
      close()
      if (!isAlert) {
        /*eslint-disable*/
        reject()
        /*eslint-disable*/
      }
    }
    ReactDOM.render(
      <Dialog
        appElement={document.querySelector('body')}
        isOpen
        title={title}
        footer={footer}
        style={style}
        handleEnsure={ensure}
        handleCancel={cancel}
        btnCancelTxt={cancelTxt}
        btnEnsureTxt={ensureTxt}
        contentLabel="confirmModal"
      >
        <div>{body}</div>
      </Dialog>, div)
  })
}
