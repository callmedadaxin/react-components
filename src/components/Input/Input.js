/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2018-01-18 17:50:52
 * @Last Modified by: wangweixin
 * @Last Modified time: 2019-03-04 15:51:57
 */
import React from "react";
import classNames from "classnames";
import Icon from "../Icon";
import searchIcon from "./images/search.svg";

export default function Input(props) {
  const {
    value,
    handleChange,
    isSearch,
    type,
    hasError: error,
    className,
    ...others
  } = props;

  const onChange = e => handleChange(e.target.value);

  const textarea = type === "textarea";

  const classes = classNames(className, {
    input: true,
    textarea,
    error
  });

  if (textarea) {
    return (
      <textarea
        value={value}
        onChange={onChange}
        className={classes}
        type={type}
        {...others}
      />
    );
  }
  if (isSearch) {
    return (
      <div className="input-wrapper">
        <input
          value={value}
          onChange={onChange}
          className={classes}
          placeholder={isSearch ? "搜索相关内容" : ""}
          type={type}
          {...others}
        />
        <Icon className="search-icon" link={searchIcon} />
      </div>
    );
  }
  return (
    <input
      value={value}
      onChange={onChange}
      className={classes}
      type={type}
      {...others}
    />
  );
}
