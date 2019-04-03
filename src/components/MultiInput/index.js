/*
 * @Author: wangweixin
 * @Date: 2018-01-18 17:52:04
 * @Last Modified by: wangweixin
 * @Last Modified time: 2019-04-03 16:29:18
 */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import includes from "lodash/includes";
import map from "lodash/map";
import filter from "lodash/filter";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";
import last from "lodash/last";
import toString from "lodash/toString";

import Input from "../Select/Input";
import { useControlledInputs } from "../../common/hooks";
import { nfn } from "../../common";
import Item from "../Item";

// 设置默认显示的defaultValue
const mapDefaultToValue = (defaultValue = []) => defaultValue.map(toString);
const mapValuetoValue = value => value;

export default function MultiInput({
  defaultValue,
  onChange,
  hasError: error,
  disabled,
  className,
  style
}) {
  const { value, handleChange } = useControlledInputs({
    defaultValue,
    onChange,
    mapDefaultToValue,
    mapValuetoValue
  });
  // 展示提示
  const [showTip, setShowTip] = useState(false);
  // 输入的值, 在select中对应为filter
  const [filterItem, setFilter] = useState("");
  // 是否正在操控select
  const [isFocus, setFocus] = useState(false);

  const onWindowClick = () => {
    setShowTip(false);
    setFocus(false);
  };
  useEffect(() => {
    window.addEventListener("click", onWindowClick);

    return () => window.removeEventListener("click", onWindowClick);
  });

  const onFocus = () => setFocus(true);

  /**
   * fitler改变的回调
   */
  const handleFilterChange = filterItem => {
    setFilter(filterItem);
    if (isEmpty(filterItem)) {
      return setShowTip(false);
    }
    // 当前的值不包含输入的值时，才提示可以按回车进行确定
    if (!includes(value, filterItem)) {
      setShowTip(true);
    } else {
      setShowTip(false);
    }
  };

  // 值更改时的回调
  const handleSelectChange = (val, remove) => {
    let resultVal;
    // val为空时，将内容清空
    if (val === undefined) {
      resultVal = [];
    } else if (remove) {
      // 移除元素
      resultVal = filter(value, item => !isEqual(val, item));
    } else {
      resultVal = [...value, val];
    }
    handleChange(resultVal);
    handleFilterChange("", resultVal);
  };

  /**
   * 敲击回车时，认定选中当前focus的值
   */
  const onPressEnter = () => {
    if (includes(value, filterItem)) return;
    if (filterItem === "" || filterItem === undefined) return;
    handleSelectChange(filterItem);
    setShowTip(false);
  };

  /**
   * 敲击后退时，清空值
   */
  const onPressBack = () => {
    handleSelectChange(last(value), true);
  };

  const onValueChange = (value, remove) => {
    handleSelectChange(get(value, "value"), remove);
  };

  const classes = classNames("select", "no-arrow", className, {
    error,
    disabled,
    "is-open": isFocus,
    "has-value": get(value, "length")
  });

  return (
    <div className={classes} style={style}>
      <Input
        multi
        disabled={disabled}
        clearable={true}
        currentValue={map(value, item => ({
          label: item,
          value: item
        }))}
        filter={filterItem}
        onChange={onValueChange}
        onInputChange={handleFilterChange}
        onFocus={onFocus}
        showOption={showTip}
        onPressEnter={onPressEnter}
        onPressBack={onPressBack}
        isFocus={isFocus}
      />
      <Item show={showTip}>
        <div className="multi-input-tip">{filterItem} 逗号或回车结束</div>
      </Item>
    </div>
  );
}
MultiInput.defaultProps = {
  onChange: nfn
};
MultiInput.propTypes = {
  /** 错误状态 */
  hasError: PropTypes.bool,
  /** disabled状态 */
  disabled: PropTypes.bool,
  /** 默认值，必须是options中的value的值 */
  defaultValue: PropTypes.any,
  /** change回调 */
  onChange: PropTypes.func
};
