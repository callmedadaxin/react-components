import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Checkbox from "../Checkbox";
import DropDown from "../Dropdown";
import Icon from "../Icon";
import closeIcon from "@/images/svg/close.svg";
import Button from "../Button";
import Input from "../Input";
import Item from "../Item";
import { useDefault } from "../../common/hooks";

const { CheckboxGroup } = Checkbox;

const Overlay = props => {
  const {
    options,
    title,
    onChange,
    close,
    onEnsure,
    defaultValue,
    withSearch,
    searchTxt,
    onSearch
  } = props;
  return (
    <div className="checkbox-select-content">
      <h3 className="checkbox-select-content-title">{title}</h3>
      <Item show={withSearch}>
        <Input
          isSearch={true}
          onChange={onSearch}
          className="checkbox-select-search-input"
        />
      </Item>
      <CheckboxGroup
        className="checkbox-select-content-checkbox"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {withSearch && searchTxt.trim() !== ""
          ? options
              .filter(item => item.label.includes(searchTxt))
              .map((item, index) => (
                <Checkbox
                  key={`${item.label}-${index}`}
                  label={item.label}
                  value={item.value}
                />
              ))
          : options.map((item, index) => (
              <Checkbox
                key={`${item.label}-${index}`}
                label={item.label}
                value={item.value}
              />
            ))}
      </CheckboxGroup>
      <div className="checkbox-select-button-wrap">
        <Button type="link" className="left" onClick={() => onChange([])}>
          清除
        </Button>
        <Button type="link" onClick={close}>
          关闭
        </Button>
        <Button type="secondary" onClick={() => onEnsure(close)}>
          确定
        </Button>
      </div>
    </div>
  );
};
export default function CheckboxSelect({
  defaultValue,
  defaultOpen,
  withSearch,
  onChange,
  title,
  options,
  onDelete,
  className,
  style
}) {
  const [value, setValue] = useDefault(defaultValue);
  const [searchTxt, setSearchTxt] = useState("");
  const [visible, setVisible] = useState(defaultOpen);

  const handleEnsure = () => {
    onChange(value);
    setVisible(false);
  };

  const handleSearch = val => setSearchTxt(val);

  const valueStr = options
    .filter(item => value.includes(item.value))
    .map(item => item.label)
    .join(",");
  const classes = classNames(
    "checkbox-select-wrap",
    onDelete ? className + " can-delete" : className
  );
  return (
    <div className={classes}>
      <DropDown
        visible={visible}
        onVisibleChange={setVisible}
        overlay={
          <Overlay
            options={options}
            title={title}
            defaultValue={value}
            withSearch={withSearch}
            searchTxt={searchTxt}
            onSearch={setSearchTxt}
            onEnsure={handleEnsure}
            onChange={setValue}
          />
        }
        defaultOpen={defaultOpen}
      >
        <div className="checkbox-select-result">
          <span className="checkbox-select-result-label">{title}</span>
          <p className="checkbox-select-result-value" title={valueStr}>
            {valueStr}
          </p>
          <Item show={onDelete}>
            <Icon className="close-icon" link={closeIcon} onClick={onDelete} />
          </Item>
        </div>
      </DropDown>
    </div>
  );
}

CheckboxSelect.propTypes = {
  /** 选项列表，包含label, value字段 */
  options: PropTypes.array,
  /** 标题 */
  title: PropTypes.string,
  /** 默认值 */
  defaultValue: PropTypes.array,
  /** 回调事件 */
  onChange: PropTypes.func,
  /** 支持搜索 */
  withSearch: PropTypes.boolean,
  /** 删除回调 */
  onDelete: PropTypes.oneOfType([null, PropTypes.func])
};
CheckboxSelect.defaultProps = {
  withSearch: false,
  onDelete: null
};
