import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import DropDown from "../Dropdown";
import classNames from "classnames";
import { useControlledInputs } from "../../common/hooks";
import find from "lodash/find";
import { nfn } from "../../common";

const mapDefaultToValue = (defaultValue, props) => {
  const { listItems } = props;
  const item = find(listItems, { value: defaultValue });
  return item ? item.value : "";
};
const mapValuetoValue = value => value;

function Overlay(props) {
  const { listItems, changeValue, value, handleChange } = props;
  return (
    <ul className="dropdown-list-content">
      {listItems
        .filter(item => !changeValue || item.value !== value)
        .map((item, index) => {
          const classes = classNames({
            "text-overflow": true,
            "dropdown-list-item": true,
            "dropdown-list-item-active": item.value === value
          });
          return (
            <li
              className={classes}
              key={`label-${index}`}
              onClick={() => handleChange(item.value)}
            >
              {item.label}
            </li>
          );
        })}
    </ul>
  );
}

/**
 * 在Dropdown组件上封装的list组件
 */
function DropdownList(props) {
  const {
    trigger,
    defaultValue,
    afterChange,
    changeValue,
    onChange,
    disabled,
    listItems,
    style,
    className,
    children
  } = props;

  if (afterChange) {
    console.warn("afterChange目前已经不在使用，使用changeValue代替");
  }

  const [visible, setVisible] = useState(false);
  const { value, handleChange } = useControlledInputs({
    defaultValue,
    onChange,
    mapDefaultToValue,
    mapValuetoValue,
    props
  });

  const item = find(listItems, item => item.value === value);
  const label = changeValue ? (item ? item.label : children) : children;
  const classes = classNames(
    {
      "dropdown-list": true,
      disabled
    },
    className
  );
  const handleItemClick = useCallback(
    value => {
      handleChange(value);
      setVisible(false);
    },
    [handleChange]
  );
  return (
    <DropDown
      visible={visible}
      onVisibleChange={setVisible}
      trigger={trigger}
      className={classes}
      disabled={disabled}
      style={style}
      overlay={
        <Overlay
          listItems={listItems}
          changeValue={changeValue}
          value={value}
          handleChange={handleItemClick}
        />
      }
    >
      <div className="dropdown-tirgger-item text-overflow">{label}</div>
    </DropDown>
  );
}

DropdownList.propTypes = {
  /** 触发展示的方式 */
  trigger: PropTypes.oneOf(["click", "hover"]),
  /** 列表内容 */
  listItems: PropTypes.array,
  /** 点击内容的回调事件 */
  onChange: PropTypes.func,
  /** 值改变时，是否改变点击按钮的内容 */
  changeValue: PropTypes.bool,
  /** 默认值 */
  defaultValue: PropTypes.any,
  /** 是否禁用 */
  disabled: PropTypes.bool
};

DropdownList.defaultProps = {
  onChange: nfn,
  changeValue: false
};

export default DropdownList;
