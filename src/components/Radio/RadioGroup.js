/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2017-12-15 11:02:41
 * @Last Modified by: wangweixin
 * @Last Modified time: 2019-03-04 16:26:21
 */
import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useControlledInputs } from "../../common/hooks";
import { nfn } from "../../common";
import filter from "lodash/filter";
import map from "lodash/map";

export default function RadioGroup({
  defaultValue,
  onChange,
  children,
  disabled,
  className
}) {
  const { value, handleChange } = useControlledInputs({
    defaultValue,
    onChange,
    mapDefaultToValue: v => v,
    mapValuetoValue: v => v
  });

  const classes = classNames("radio-group", className, {
    disabled
  });

  return (
    <div className={classes}>
      {map(filter(children, Boolean), (child, index) =>
        cloneElement(child, {
          defaultChecked: value === child.props.value,
          onChange: (checked, value) => checked && handleChange(value),
          key: index,
          disabled
        })
      )}
    </div>
  );
}

RadioGroup.defaultProps = {
  onChange: nfn
};
RadioGroup.propTypes = {
  /** 默认值 */
  defaultValue: PropTypes.any,
  /** onchange事件 */
  onChange: PropTypes.any,
  /** disabled状态 */
  disabled: PropTypes.bool
};
