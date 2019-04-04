/*
 * @Author: zsj
 * @Date: 2018-09-20 13:49:22
 * @Last Modified by: wangweixin
 * @Last Modified time: 2019-04-04 14:26:38
 */

import React, { useCallback } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import get from "lodash/get";
// 包含省市数据
import data from "./data";
import Select from "../Select/";
import { useControlledInputs } from "../../common/hooks";

const _province = data["省份"];
const _params = {
  province: "",
  city: ""
};

export default function AreaLinkage({
  defaultValue,
  onChange,
  mapDefaultToValue,
  mapValuetoValue,
  className,
  style
}) {
  const { value, handleChange } = useControlledInputs({
    defaultValue,
    onChange,
    mapDefaultToValue: v => v,
    mapValuetoValue: v => v
  });

  const onProviceChange = useCallback(
    val => {
      const result = {
        province: val,
        city: ""
      };
      handleChange(result);
      onChange(result);
    },
    [onChange]
  );

  const onCityChange = useCallback(
    city => {
      const result = {
        ...value,
        city
      };
      handleChange(result);
      onChange(result);
    },
    [value, handleChange, onChange]
  );

  const classes = classNames("area-linkage", className);
  const cityOptions = get(data, value.province) || [];
  console.log("value", value);
  return (
    <div className={classes} style={style}>
      <Select
        options={_province}
        onChange={onProviceChange}
        clearable={false}
        defaultValue={value.province}
        placeholder="省份"
      />
      <div className="area-linkage-mid" />
      <Select
        options={cityOptions}
        onChange={onCityChange}
        defaultValue={value.city}
        clearable={false}
        placeholder="城市"
      />
    </div>
  );
}
AreaLinkage.displayName = "AreaLinkage";
AreaLinkage.defaultProps = {
  defaultValue: _params
};
AreaLinkage.propTypes = {
  /** 默认值 */
  defaultValue: PropTypes.object,
  /** 默认callback */
  onChange: PropTypes.func
};
