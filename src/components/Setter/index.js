import React, { Component } from "react";
import {
  observable,
  observe,
  unobserve
} from "@nx-js/observer-util/dist/es.es6.js";
import clone from "lodash/cloneDeep";
import debounce from "lodash/debounce";
import isEqual from "lodash/isEqual";

/**
 * Setter组件，会监听传入data的改变，并在每次改变后返回新的值，
 * 可用于处理深层次，复杂的表单
 */
export default class Setter extends Component {
  state = {
    draft: false,
    result: {}
  };

  componentDidMount = () => {
    this.initData();
    this.bindFunction();
  };

  componentWillUnmount = () => {
    this.clearData();
  };

  initData() {
    const { data } = this.props;
    const draft = observable(data, this.handleSetting);
    this.setState({
      draft,
      result: data
    });
  }

  clearData() {
    unobserve(this.loger);
  }

  bindFunction() {
    const { draft, result } = this.state;
    this.loger = debounce(() => {
      if (isEqual(draft, result)) return;

      this.setState({
        result: clone(draft)
      });
    }, 300);
    observe(this.loger);
  }

  getResult() {
    return this.state.result;
  }

  reset() {
    this.clearData();
    this.initData();
    this.bindFunction();
  }

  render() {
    const { data, children, ...others } = this.props;
    const { draft, result } = this.state;
    return draft ? children(draft, result, others) : "";
  }
}
