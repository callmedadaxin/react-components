/*
 * @Author: wangweixin
 * @Date: 2017-12-15 11:01:33
 * @Last Modified by: wangweixin
 * @Last Modified time: 2019-04-02 17:17:16
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import validate from "./validators";
import classNames from "classnames";

import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";

/**
 * 单个表单元素
 * 自带样式，规则验证等
 * 直接填充表单组件的内容即可
 */
export default class FormItem extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      !isEqual(nextProps.value, prevState.prevValue) &&
      nextProps.value !== undefined
    ) {
      return {
        ...prevState,
        value: nextProps.value,
        prevValue: nextProps.value
      };
    }
    return null;
  }
  state = {
    hasError: false,
    value: this.props.defaultValue
  };
  componentDidMount = () => {
    const { collector } = this.props;
    collector && collector.add(this);
  };
  componentWillUnmount = () => {
    const { collector } = this.props;
    collector && collector.remove(this);
  };
  /**
   * 重置值为defaultValue
   * @public
   */
  reset() {
    const { defaultValue } = this.props;
    this.setState({
      value: defaultValue,
      hasError: false
    });
  }
  /**
   * validate方法，会在collector.validate调用时被自动调用
   */
  validate = currentValue => {
    const { validators, data } = this.props;
    const { value } = this.state;
    const testValue = currentValue || value;
    if (isEmpty(validators)) return true;

    const failed = validators.some(rule => {
      if (Array.isArray(testValue)) {
        if (rule.required) {
          return !validate(testValue, rule);
        }
        return testValue.some(v => {
          return !validate(v, rule, data);
        });
      }
      return !validate(testValue, rule, data);
    });

    if (failed) {
      this.setState({
        hasError: true
      });
    }
    return !failed;
  };
  handleInput = value => {
    const { onChange, trigger } = this.props;

    if (trigger === "input") {
      let isOk = this.validate(value);

      this.setState({
        hasError: !isOk
      });
    }

    this.setState({
      value
    });
    console.log(onChange);
    onChange && onChange(value);
  };
  renderChildren() {
    const { children, showInfo } = this.props;
    const { hasError, value } = this.state;

    if (showInfo) {
      return <div className="form-item-info">{value}</div>;
    }
    return children
      ? React.cloneElement(children, {
          onChange: this.handleInput,
          defaultValue: value,
          hasError
        })
      : "";
  }
  render() {
    const {
      label,
      labelWidth = "100px",
      labelStyle,
      className,
      style,
      hasColon
    } = this.props;
    const { hasError } = this.state;
    const lwidth =
      labelWidth.indexOf("px") > 0 ? labelWidth : labelWidth + "px";
    const classes = classNames("form-group form-item-group", className);
    const labelClasses = classNames("form-item-title-label", {
      required: this.isRequired,
      hasColon
    });
    return (
      <div className={classes} style={style}>
        <div
          className={labelClasses}
          style={{ flex: `0 0 ${lwidth}`, ...labelStyle }}
        >
          <span>{label}</span>
          {hasColon ? " :" : ""}
        </div>
        <div className={`form-item-input ${hasError ? "has-error" : ""}`}>
          {this.renderChildren()}
        </div>
      </div>
    );
  }
}
FormItem.displayName = "FormItem";
FormItem.defaultProps = {
  trigger: "input",
  hasColon: true,
  showInfo: false
};
FormItem.propTypes = {
  /** 表单元素的标签 */
  label: PropTypes.any,
  /** 标签宽度 */
  labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** 标签的特殊样式 */
  labelStyle: PropTypes.object,
  /** 默认值 */
  defaultValue: PropTypes.any,
  /** 验证规则 */
  validators: PropTypes.array,
  /** 是否有冒号 */
  hasColon: PropTypes.bool,
  /** 是否以信息形式展示 */
  showInfo: PropTypes.bool,
  /** 验证触发的时机 */
  trigger: PropTypes.oneOf(["input", "blur"]),
  /** Collector实例 */
  collector: PropTypes.any
};
