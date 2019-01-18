import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import isString from "lodash/isString";

export default function Label(props) {
  const {
    type,
    children,
    light,
    className,
    closable,
    maxWidth,
    style,
    ...others
  } = props;
  const classes = classNames(
    "label",
    `label-${type}`,
    {
      light,
      closable,
      "max-width": maxWidth
    },
    className
  );
  const retStyle = {
    ...style,
    maxWidth
  };
  return (
    <span
      className={classes}
      style={retStyle}
      {...others}
      title={isString(children) ? children : ""}
    >
      {children}
    </span>
  );
}
Label.propTypes = {
  /** 标签类型 */
  type: PropTypes.string,
  /** 轻版label */
  light: PropTypes.bool,
  /** 最大宽度，超出时会将内容以省略号显示 */
  maxWidth: PropTypes.number
};
