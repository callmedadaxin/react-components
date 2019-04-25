/*
 * @Author: wangweixin
 * @Date: 2018-01-18 17:52:04
 * @Last Modified by: wangweixin
 * @Last Modified time: 2019-04-25 15:01:10
 */
import React, { useState, useEffect } from "react";
import classNames from "classnames";
import includes from "lodash/includes";
import filter from "lodash/filter";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";
import last from "lodash/last";
import lowerCase from "lodash/lowerCase";

import Input from "./Input";
import Options from "./Options";
import PropTypes from "prop-types";
import {
  useControlledInputs,
  useDefault,
  useDropdownPosition
} from "../../common/hooks";
import { nfn } from "../../common";

// 设置默认显示的defaultValue
const mapDefaultToValue = (value, props) => {
  const { multi, options } = props;
  // 没传
  if (!value && value !== 0) {
    return multi ? [] : "";
  }
  return multi
    ? options.filter(item => value.indexOf(item.value) >= 0)
    : options.filter(item => item.value === value)[0];
};
const mapValuetoValue = (value, props) => {
  const { multi } = props;
  return multi ? value.map(item => item.value) : value.value;
};
export default function Select({
  defaultValue,
  onChange,
  options,
  hasError: error,
  theme,
  multi,
  placeholder,
  disabled,
  clearable,
  className,
  style
}) {
  const { value, handleChange } = useControlledInputs({
    defaultValue,
    onChange,
    mapDefaultToValue,
    mapValuetoValue,
    mapValueWhenChange: false,
    props: {
      multi,
      options
    }
  });
  // 是否展示选项
  const [showOption, setShow] = useState(false);
  const [resultOptions, setOptions] = useDefault(options);
  // 输入的值, 在select中对应为filter
  const [filterItem, setFilter] = useState("");
  // 当前focus的选项，用户回车时，会选中该选项
  const [focusItem, setFocusItem] = useState(undefined);
  // 是否正在操控select
  const [isFocus, setFocus] = useState(false);
  const [position, ref] = useDropdownPosition();

  const onWindowClick = () => {
    setShow(false);
    setFocus(false);
  };

  useEffect(() => {
    window.addEventListener("click", onWindowClick);

    return () => window.removeEventListener("click", onWindowClick);
  });

  /**
   * 获取最新的options(会根据filter和多选的值改变)
   * @param {*} filterItem 当前的filter
   * @param {*} currentValue 针对于多选，会根据选中结果进行过滤
   */
  const getResultOptions = (filterItem = "", currentValue) => {
    const resultOptions = multi
      ? filter(options, item => !includes(currentValue || value, item))
      : options;

    if (filterItem === "") {
      return resultOptions;
    }

    return filter(
      resultOptions,
      item =>
        includes(lowerCase(item.label), filterItem) ||
        includes(lowerCase(item.value), filterItem)
    );
  };

  /**
   * 展示下拉菜单
   * 会更新focusItem
   */
  const showOptionsWrap = () => {
    const options = getResultOptions();

    if (!multi) {
      setFocusItem(value);
    } else {
      setFocusItem(options[0]);
    }

    setShow(true);
    setFocus(true);
  };

  /**
   * fitler改变的回调
   * 会更新options和focusItem
   */
  const handleFilterChange = (filterItem, currentValue) => {
    const resultOptions = getResultOptions(filterItem, currentValue);
    setFilter(filterItem);
    setOptions(resultOptions);
    setFocusItem(resultOptions[0]);
  };

  // 选中值时的回调
  const handleSelectChange = (val, remove, hide = true) => {
    if (multi) {
      let resultVal;

      // val为空时，将内容清空
      if (isEmpty(val)) {
        resultVal = [];
      } else if (remove) {
        // 移除元素
        resultVal = filter(value, item => !isEqual(val, item));
      } else {
        resultVal = [...value, val];
      }
      handleChange(resultVal);
      handleFilterChange("", resultVal);
    } else {
      handleChange(val);
      handleFilterChange("");
    }
    if (hide) {
      setShow(false);
    }
  };

  /**
   * 敲击回车时，认定选中当前focus的值
   */
  const onPressEnter = () => {
    if (!showOption || focusItem === undefined) return;
    if (focusItem.disabled) {
      return;
    }
    handleSelectChange(focusItem);
    setShow(false);
  };

  /**
   * 敲击后退时，清空值
   */
  const onPressBack = () => {
    // 单选时，清空
    if (!multi && !isEmpty(value)) {
      handleSelectChange({}, false, false);
    }
    if (multi && !isEmpty(value)) {
      handleSelectChange(last(value), true);
    }
  };

  const classes = classNames("select", className, theme, {
    multi,
    error,
    disabled,
    "is-open": showOption,
    "has-value": get(value, "length") || get(value, "value") !== undefined
  });

  return (
    <div className={classes} style={style} ref={ref}>
      <Input
        disabled={disabled}
        multi={multi}
        clearable={clearable}
        options={options}
        currentValue={value}
        filter={filterItem}
        onChange={handleSelectChange}
        onInputChange={handleFilterChange}
        onFocus={showOptionsWrap}
        showOption={showOption}
        onPressEnter={onPressEnter}
        onPressBack={onPressBack}
        placeholder={placeholder}
        isFocus={isFocus}
      />
      <Options
        single
        position={position}
        value={value}
        options={resultOptions}
        show={showOption}
        handleItemClick={handleSelectChange}
        filterItem={filterItem}
        focusItem={focusItem}
        setFocusItem={setFocusItem}
      />
    </div>
  );
}
Select.defaultProps = {
  theme: "default",
  clearable: true,
  onChange: nfn
};
Select.propTypes = {
  /** 是否是多选 */
  multi: PropTypes.bool,
  /**
   * 选项
   * {
   *   label: '标签',
   *   value: '值'
   * }
   */
  options: PropTypes.array,
  /** 错误状态 */
  hasError: PropTypes.bool,
  /** disabled状态 */
  disabled: PropTypes.bool,
  /** 是否可清空 */
  clearable: PropTypes.bool,
  /** 默认值，必须是options中的value的值 */
  defaultValue: PropTypes.any,
  /** change回调 */
  onChange: PropTypes.func,
  /** 可选主题颜色 default, white */
  theme: PropTypes.string
};
