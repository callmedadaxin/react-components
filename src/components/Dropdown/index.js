import React, { cloneElement, useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { nfn } from "../../common";

/**
 * 基本的Dropdown组件，可在其上针对业务逻辑进行封装
 */
function Dropdown(props) {
  const {
    children,
    defaultOpen,
    disabled,
    trigger,
    className,
    style,
    overlay,
    visible,
    onVisibleChange
  } = props;
  const [show, setShow] = useState(defaultOpen);
  const changeVisible = show => {
    setShow(show);
    onVisibleChange(show);
  };
  const onMouseEnter = trigger === "hover" ? () => changeVisible(true) : null;
  const onMouseLeave = trigger === "hover" ? () => changeVisible(false) : null;
  const onWindowClick = trigger === "click" ? () => changeVisible(false) : null;

  useEffect(() => {
    window.addEventListener("click", onWindowClick);

    return () => window.removeEventListener("click", onWindowClick);
  });

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  const classes = classNames("dropdown", className, {
    open: show,
    disabled
  });

  return (
    <div
      className={classes}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={e => e.stopPropagation()}
    >
      {cloneElement(children, {
        onClick:
          trigger === "click" && !disabled
            ? e => {
                e.stopPropagation();
                changeVisible(!show);
              }
            : null
      })}
      <div className="dropdown-overlay">{overlay}</div>
    </div>
  );
}

Dropdown.defaultProps = {
  trigger: "click",
  onVisibleChange: nfn
};
Dropdown.propTypes = {
  /** dropdown展示的内容 */
  overlay: PropTypes.any,
  /** 触发展示的方式 */
  trigger: PropTypes.oneOf(["click", "hover"]),
  /** 是否默认展开 */
  defaultOpen: PropTypes.bool,
  /** 主动控制展开收起 */
  visible: PropTypes.bool,
  /** 展开收起的回调 */
  onVisibleChange: PropTypes.func
};

export default Dropdown;
