import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import { useControlledInputs } from "../../common/hooks";
import { nfn } from "../../common";
import map from "lodash/map";

const mapDefaultToValue = (defaultValue, { options = [] }) => {
  if (defaultValue === undefined) {
    return options[0] ? options[0].value : defaultValue;
  }
  return defaultValue;
};
const mapValuetoValue = item => item.value;

/**
 * 按钮式Radio
 */
export default function RadioButton({
  defaultValue,
  onChange,
  options,
  disabled,
  role,
  className,
  style
}) {
  const classes = classNames("radio-btn", disabled, className);
  const { value, handleChange } = useControlledInputs({
    defaultValue,
    onChange,
    mapDefaultToValue,
    mapValuetoValue,
    props: { options }
  });
  return (
    <div className={classes} style={style}>
      {map(options, item => {
        const itemClasses = classNames("radio-btn-item", {
          active: item.value === value
        });
        return (
          <span
            key={`radio-btn-${item.value}`}
            className={itemClasses}
            role={role}
            onClick={() => !disabled && handleChange(item)}
          >
            {item.label}
          </span>
        );
      })}
    </div>
  );
}

RadioButton.defaultProps = {
  onChange: nfn
};
RadioButton.propTypes = {
  /** 选项列表，遵循各选项格式 包含label,value字段 */
  options: PropTypes.array,
  /** 默认值 */
  defaultValue: PropTypes.any,
  /** change回调 */
  onChange: PropTypes.func
};
