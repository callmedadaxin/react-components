import React from "react";
import PropTypes from "prop-types";
import Base from "./Input";
import TextAreaWithMax from "./TextareaWithMax";
import { useControlledInputs } from "../../common/hooks";
import { nfn } from "../../common";

export default function Input(props) {
  const { defaultValue, onChange, type, max, ...others } = props;

  if (type === "textarea" && max) {
    return (
      <TextAreaWithMax
        type={type}
        max={max}
        defaultValue={defaultValue}
        onChange={onChange}
        {...others}
      />
    );
  }

  const { value, handleChange } = useControlledInputs({
    defaultValue,
    onChange,
    mapDefaultToValue: v => v,
    mapValuetoValue: v => v
  });

  return (
    <Base type={type} value={value} handleChange={handleChange} {...others} />
  );
}

Input.defaultProps = {
  type: "text",
  defaultValue: "",
  isSearch: false,
  onChange: nfn
};

Input.propTypes = {
  /** 输入内容改变时的回调 */
  onChange: PropTypes.func,
  /** 默认值 */
  defaultValue: PropTypes.string,
  /** 是否显示搜索图标 */
  isSearch: PropTypes.bool,
  /** 主动修改组件值时候的值， @see controled input */
  value: PropTypes.string,
  /** 类型 */
  type: PropTypes.oneOf(["text", "textarea"]),
  /** 是否Error, 自带error样式 */
  hasError: PropTypes.bool,
  /** 当type为textarea时，设置max,则会显示当前输入的字数 */
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
