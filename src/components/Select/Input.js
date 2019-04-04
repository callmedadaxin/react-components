import React, { useState, useRef, useEffect, Fragment } from "react";
import get from "lodash/get";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import AutoSizeInput from "react-input-autosize";

import { nfn } from "../../common";
import Item from "../Item";
import Icon from "../Icon";
import ValueItem from "./ValueItem";
import delIcon from "./images/del_icon.svg";

export default function Input({
  disabled,
  showOption,
  isFocus,
  currentValue,
  filter,
  onFocus = nfn,
  onBlur,
  onChange,
  onInputChange,
  multi,
  placeholder = "Select...",
  clearable,
  options,
  onPressEnter,
  onPressBack
}) {
  const inputRef = useRef(null);
  const [input, setInput] = useState(false);

  // 当currentValue改变时，认定为用户选中了选项，更改输入状态为false
  useEffect(() => {
    if (!multi) {
      setInput(false);
    }
    // 保持focus状态
    if (multi && isFocus) {
      inputRef.current.focus();
    }
  }, [currentValue]);

  const triggerFocus = e => {
    if (disabled) return;
    e.stopPropagation();
    inputRef.current.focus();
    onFocus();
  };

  // filter改变的时候
  const handleValueChange = v => {
    const value = v.target.value;
    setInput(value === "" ? false : true);
    if (!showOption) {
      onFocus();
    }
    onInputChange(value);
  };

  // 清除值
  const clearValue = e => {
    onChange({});
    onInputChange("");
    inputRef.current.focus();
  };

  const handleKeyDown = e => {
    e.stopPropagation();

    if (e.keyCode === 13) {
      return onPressEnter && onPressEnter();
    }
    if (e.keyCode === 8) {
      if (filter === "") {
        return onPressBack();
      }
    }
  };

  const hasValue = filter !== "" || !isEmpty(currentValue);

  return (
    <div className="Select-control">
      <div className="Select-value-zone">
        <Item show={!hasValue} onClick={triggerFocus}>
          <div className="Select-placeholder">{placeholder}</div>
        </Item>
        <div className="Select-input" onClick={triggerFocus}>
          <Item show={!multi && !input}>
            <div className="select-single-value">
              {get(currentValue, "label")}
            </div>
          </Item>
          <Item show={multi}>
            <Fragment>
              {map(currentValue, item => (
                <ValueItem
                  onRemove={() => onChange(item, true)}
                  key={`select-multi-item-${item.label}-${item.value}`}
                  value={item}
                  disabled={disabled}
                />
              ))}
            </Fragment>
          </Item>
          <AutoSizeInput
            style={{ verticalAlign: "top" }}
            className="select-input-dom"
            value={filter}
            ref={inputRef}
            onKeyDown={handleKeyDown}
            onChange={handleValueChange}
          />
        </div>
      </div>
      <Item show={clearable && hasValue}>
        <span className="Select-clear-zone">
          <Icon onClick={clearValue} className="del-icon" link={delIcon} />
        </span>
      </Item>
      <span className="Select-arrow-zone">
        <span className="bottomTriangle drop-down-icon " />
      </span>
    </div>
  );
}
