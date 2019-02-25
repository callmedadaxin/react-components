import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useControlledInputs } from "../../common/hooks";

const defaultMap = [
  {
    label: "关闭",
    value: false
  },
  {
    label: "开启",
    value: true
  }
];

const mapDefaultToValue = v => v;
const mapValuetoValue = v => v;
/**
 * 开关
 */
function Switch(props) {
  const {
    defaultValue,
    onChange,
    itemMap = defaultMap,
    className,
    disabled,
    style
  } = props;
  const { value, handleChange } = useControlledInputs({
    defaultValue,
    onChange,
    mapDefaultToValue,
    mapValuetoValue
  });
  const classes = classNames("switch", className, {
    active: value,
    disabled
  });
  return (
    <div
      style={style}
      className={classes}
      onClick={() => !disabled && handleChange(!value)}
    >
      {itemMap.map(item => {
        return (
          <span key={item.label} className="switch-item">
            {item.label}
          </span>
        );
      })}
    </div>
  );
}

Switch.propTypes = {
  /** 开关对应的Item和值 */
  itemMap: PropTypes.array,
  /** 变化回调 */
  onChange: PropTypes.func,
  /** 默认值 */
  defaultValue: PropTypes.bool
};

export default Switch;
