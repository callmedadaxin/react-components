/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2018-01-18 17:51:18
 * @Last Modified by: wangweixin
 * @Last Modified time: 2019-03-04 16:08:48
 */
import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { useControlledInputs } from "../../common/hooks";

export default function Textarea(props) {
  const {
    defaultValue,
    onChange,
    max,
    className,
    hasError: error,
    disabled,
    style,
    placeholder,
    isSearch,
    ...others
  } = props;
  const [focus, setFocus] = useState(false);
  const { value, handleChange } = useControlledInputs({
    defaultValue,
    onChange,
    mapDefaultToValue: v => v,
    mapValuetoValue: e => e.target.innerText
  });
  const inputEl = useRef(null);
  useEffect(() => {
    inputEl && (inputEl.current.innerText = defaultValue);
  }, [defaultValue]);

  const classes = classNames("input", "textarea", "textarea-wrap", className, {
    error,
    "is-disabled": disabled,
    focus
  });
  return (
    <div className={classes} {...others}>
      <div
        style={style}
        contentEditable={disabled ? "false" : "true"}
        className="textarea-content"
        onInput={handleChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholder={placeholder}
        ref={inputEl}
      />
      <span className="max">
        <i>{value.length}</i>/{max}
      </span>
    </div>
  );
}
