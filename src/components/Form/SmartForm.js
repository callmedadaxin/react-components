/*
 * @Author: wangweixin
 * @Date: 2017-12-15 11:00:25
 * @Last Modified by: wangweixin
 * @Last Modified time: 2019-04-04 19:51:06
 */
import React, { Component, cloneElement } from "react";
import PropTypes from "prop-types";

import forEach from "lodash/forEach";
import debounce from "lodash/debounce";
import set from "lodash/set";
import isFunction from "lodash/isFunction";

import classNames from "classnames";
import { Collector } from "./validators";

/**
 * 表单封装
 * 包含默认样式，表单验证的功能
 */
export default class SmartForm extends Component {
  collector = new Collector();

  state = {
    dataMap: {}
  };

  componentDidMount() {
    this.initData();
  }

  initData() {
    const { data } = this.props;
    let dataMap = {};

    forEach(data, (item = {}, key) => {
      set(dataMap, key, item.value);
    });

    this.setState({
      dataMap
    });
  }
  /**
   * 验证当前内容并返回表单的值
   * @public
   */
  validateAndSubmit() {
    const { dataMap } = this.state;
    const isOk = this.collector.validate();
    return isOk ? dataMap : false;
  }
  /**
   * 重新初始化表单
   * @public
   */
  reset() {
    this.initData();
    this.collector.reset();
  }
  renderItem = (children, others) => {
    const { data, showInfo } = this.props;
    const { dataMap } = this.state;
    const { field, onChange, value } = children.props;
    const fieldData = data[field] || {};
    return cloneElement(children, {
      key: field,
      data: dataMap,
      showInfo,
      collector: this.collector,
      defaultValue: fieldData.value,
      value: value || dataMap[field],
      validators: fieldData.validators || [],
      onChange: debounce(val => {
        this.setState({
          dataMap: {
            ...dataMap,
            [field]: val
          }
        });
        onChange && onChange(val);
      }, 300),
      ...others
    });
  };
  setValue = (field, val) => {
    const { dataMap } = this.state;
    this.setState({
      dataMap: {
        ...dataMap,
        [field]: val
      }
    });
  };
  render() {
    const { children, className, style } = this.props;
    const { dataMap } = this.state;

    const classes = classNames("form", className);

    if (!isFunction(children)) {
      throw new Error("children必须为函数");
    }

    return (
      <div className={classes} style={style}>
        {children(dataMap, this.renderItem, this.setValue)}
      </div>
    );
  }
}
SmartForm.propTypes = {
  /**
   * 表单对应的数据
   * 针对该数据会生成最终的表单数据
   */
  data: PropTypes.object.isRequired,
  /** 以信息形式展示表单 */
  showInfo: PropTypes.bool
};
