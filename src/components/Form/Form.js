/*
 * @Author: wangweixin
 * @Date: 2017-12-15 11:00:25
 * @Last Modified by: wangweixin
 * @Last Modified time: 2019-04-12 10:53:21
 */
import React, { Component, Children, cloneElement } from "react";
import PropTypes from "prop-types";
import forEach from "lodash/forEach";
import get from "lodash/get";
import classNames from "classnames";
import FormItem from "./FormItem";
import DataMap from "./formDataMap";
import { Collector } from "./validators";

/**
 * 表单封装
 * 包含默认样式，表单验证的功能
 */
export default class Form extends Component {
  collector = new Collector();
  dataMap = new DataMap();

  componentWillMount() {
    this.initData();
  }

  initData() {
    const { data } = this.props;

    forEach(data, (item = {}, key) => {
      this.dataMap.set(key, item.value);
    });
  }
  /**
   * 验证当前内容并返回表单的值
   * @public
   */
  validateAndSubmit() {
    const isOk = this.collector.validate();
    return isOk ? this.dataMap.get() : false;
  }
  /**
   * 重新初始化表单
   * @public
   */
  reset() {
    this.initData();
    this.collector.reset();
  }
  isFormItem(children) {
    const name = get(children, "type.displayName");

    return name === FormItem.displayName;
  }
  renderChildrens = children => {
    const { data, showInfo } = this.props;

    if (Array.isArray(children)) {
      return Children.map(children, child => {
        return this.renderChildrens(child);
      });
    }
    // 遇到FormItem,则绑定id
    if (this.isFormItem(children)) {
      const { field, onChange, value } = children.props;
      const fieldData = data[field] || {};
      const dataMap = this.dataMap.get();
      return cloneElement(children, {
        data: dataMap,
        showInfo,
        collector: this.collector,
        defaultValue: fieldData.value,
        value: value || dataMap[field],
        validators: fieldData.validators || [],
        onChange: val => {
          this.dataMap.set(field, val);
          onChange && onChange(val, field);
        }
      });
    }

    // 循环处理
    if (children.props && children.props.children) {
      const props = Object.assign({}, children.props, {
        children: this.renderChildrens(children.props.children)
      });
      return Object.assign({}, children, {
        props
      });
    }
    return children;
  };
  render() {
    const { children, className, style } = this.props;
    const classes = classNames("form", className);
    return (
      <div className={classes} style={style}>
        {this.renderChildrens(children)}
      </div>
    );
  }
}
Form.propTypes = {
  /**
   * 表单对应的数据
   * 针对该数据会生成最终的表单数据
   */
  data: PropTypes.object.isRequired,
  /** 以信息形式展示表单 */
  showInfo: PropTypes.bool
};
