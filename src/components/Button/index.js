/*
 * @Author: wangweixin
 * @Date: 2017-12-07 17:12:42
 * @Last Modified by: wangweixin
 * @Last Modified time: 2019-01-18 16:36:50
 */
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

/**
 * 最基本的Button组件，使用时请以此组件为基准
 */
export default function Button(props) {
  const { type, children, width, className, style = {}, ...others } = props;
  const classes = classNames(`btn btn-${type}`, className);
  return (
    <button
      className={classes}
      {...others}
      style={{
        ...style,
        width
      }}
    >
      {children}
    </button>
  );
}
Button.displayName = "Button";
Button.propTypes = {
  /** 按钮类型：默认类型, primary, secondary, cancel, link */
  type: PropTypes.string,
  /** 支持直接传宽度属性, 传200这样的，不要带单位 */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
