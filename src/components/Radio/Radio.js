/*
 * @Author: wangweixin
 * @Date: 2017-12-15 11:02:29
 * @Last Modified by: wangweixin
 * @Last Modified time: 2019-03-04 16:28:10
 */
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

/**
 * 对Radio进行简单的封装
 * 并没有进行样式的修改
 */
export default function Radio({
  defaultChecked,
  onChange,
  label,
  value,
  disabled,
  className,
  ...others
}) {
  const classes = classNames("radio-label", className, {
    disabled
  });
  return (
    <label key={`radio-label-${value}`} className={classes}>
      <input
        className="radio"
        type="radio"
        checked={defaultChecked}
        value={value}
        disabled={disabled}
        onChange={e =>
          onChange(e.target.checked, value, { checked: e.target.checked })
        }
      />
      {label}
    </label>
  );
}
Radio.propTypes = {
  /** radio标签描述 */
  label: PropTypes.string,
  /** 是否默认选中 */
  defaultChecked: PropTypes.bool,
  /** 该选项对应的值，会在onChange时传入回调 */
  value: PropTypes.any,
  /** 值更改时的回调 */
  onChange: PropTypes.func,
  /** 禁用状态 */
  disabled: PropTypes.bool
};
