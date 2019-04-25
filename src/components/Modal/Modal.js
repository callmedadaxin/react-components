/*
 * @Author: wangweixin
 * @Date: 2017-11-28 15:30:27
 * @Last Modified by: wangweixin
 * @Last Modified time: 2019-04-24 17:07:02
 */
import React from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import merge from "lodash/merge";

import Button from "../Button";
import Item from "../Item";
import Icon from "../Icon";

import closeIcon from "./images/close.svg";

const baseModalStyle = {
  overlay: {
    backgroundColor: "rgba(27, 29, 31, 0.5)",
    zIndex: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    bottom: "auto",
    border: "none",
    background: "#FFF",
    overflow: "hidden",
    borderRadius: "2px",
    outline: "none",
    padding: "0px",
    width: "700px",
    zIndex: 10,
    maxHeight: window.innerHeight - 100
  }
};

function ModalContent(props) {
  const {
    title,
    children,
    footer,
    handleCancel,
    handleEnsure,
    style,
    closable,
    btnCancelTxt,
    btnEnsureTxt,
    className,
    isOpen,
    ...other
  } = props;
  const classes = classNames(className, "modal-content");
  if (!isOpen) {
    return null;
  }
  console.log(styles);
  const styles = merge({}, baseModalStyle, style);

  return (
    <div className="modal" style={styles.overlay}>
      <div className={`${classes}`} style={styles.content} {...other}>
        <Item show={title}>
          <div className="modal-header">
            {title}
            <Item show={closable}>
              <Icon
                className="closeIcon"
                onClick={handleCancel}
                link={closeIcon}
              />
            </Item>
          </div>
        </Item>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          {!footer ? (
            <div className="footer-btn-wrap">
              <Button type="cancel" width="80" onClick={handleCancel}>
                {btnCancelTxt}
              </Button>
              <Button type="primary" width="80" onClick={handleEnsure}>
                {btnEnsureTxt}
              </Button>
            </div>
          ) : (
            footer
          )}
        </div>
      </div>
    </div>
  );
}

export default function Modal(props) {
  return ReactDom.createPortal(<ModalContent {...props} />, document.body);
}

Modal.defaultProps = {
  closable: true,
  btnCancelTxt: "取消",
  btnEnsureTxt: "确定"
};
Modal.propTypes = {
  /** 弹框标题，可以是string, 也可以是节点 */
  title: PropTypes.any,
  /** 自定义底部按钮，假设进行自定义，需要手动为按钮绑定回调事件 */
  footer: PropTypes.any,
  /** 是否展示关闭按钮 */
  closable: PropTypes.bool,
  /** 控制弹窗的展示状态 */
  isOpen: PropTypes.bool,
  /** 取消的回调事件 */
  handleCancel: PropTypes.func,
  /** 确定的回调事件 */
  handleEnsure: PropTypes.func,
  /**
   * 样式设定
   * {
   *   overlay: 蒙版,
   *   content: 内容
   * }
   */
  style: PropTypes.object,
  /** 修改取消按钮的内容 */
  btnCancelTxt: PropTypes.any,
  /** 修改确定按钮的内容 */
  btnEnsureTxt: PropTypes.any
};
