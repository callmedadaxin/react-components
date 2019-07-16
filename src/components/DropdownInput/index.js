import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Input from "../Input";
import DropDown from "../Dropdown";
import Button from "../Button";
import { nfn } from "../../common";

import Icon from "../Icon";
import closeIcon from "./images/close.svg";

const Overlay = ({ title, onChange, close, onEnsure, value }) => (
  <div className="checkbox-select-content">
    <h3 className="checkbox-select-content-title">{title}</h3>
    <Input defaultValue={value} onChange={onChange} />
    <div className="checkbox-select-button-wrap">
      <Button type="link" onClick={close}>
        关闭
      </Button>
      <Button type="secondary" onClick={onEnsure}>
        确定
      </Button>
    </div>
  </div>
);

/**
 * 下拉输入框
 */
export default function DropdownInput(props) {
  const {
    defaultValue,
    defaultOpen,
    onChange,
    title,
    onDelete,
    disabled,
    trigger,
    className,
    style
  } = props;

  const [value, setValue] = useState(defaultValue);
  const [result, setResult] = useState(defaultValue);
  const [visible, setVisible] = useState(defaultOpen);

  useEffect(() => {
    if (value !== defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const handleValueChange = useCallback(v => setValue(v), []);

  const handleEnsure = useCallback(() => {
    onChange(value);
    setResult(value);
    setVisible(false);
  }, [onChange, value]);

  const handleClear = () => {
    setValue("");
	if (onDelete) {
	  onDelete();
	}
  };

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  const classes = classNames(
    "checkbox-select-wrap",
    {
      "can-delete": onDelete
    },
    className
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
          title={title}
          close={handleClose}
          onChange={handleValueChange}
          onEnsure={handleEnsure}
          value={value}
        />
      }
    >
      <div className="checkbox-select-result">
        <span className="checkbox-select-result-label">{title}</span>
        <p className="checkbox-select-result-value" title={result}>
          {result}
        </p>
        {onDelete ? (
          <Icon className="close-icon" link={closeIcon} onClick={handleClear} />
        ) : (
          ""
        )}
      </div>
    </DropDown>
  );
}

DropdownInput.defaultProps = {
  onChange: nfn,
  defaultOpen: false,
  clearable: true
};

DropdownInput.propTypes = {
  /** 是否默认打开 */
  defaultOpen: PropTypes.bool,
  /** 是否禁用 */
  disabled: PropTypes.bool,
  /** 触发显示的方式 */
  trigger: PropTypes.oneOf("click", "hover"),
  /** 标题 */
  title: PropTypes.string,
  /** 默认值 */
  defaultValue: PropTypes.any,
  /** 更改值时的回调 */
  onChange: PropTypes.func,
  onDelete: PropTypes.oneOfType([null, PropTypes.func])
};
