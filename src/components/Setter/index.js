import React, { Component } from "react";
import { observable, observe, unobserve, Dep } from "./helper";
import clone from "lodash/cloneDeep";
import debounce from "lodash/debounce";

/**
 * Setter组件，会监听传入data的改变，并在每次改变后返回新的值，
 * 可用于处理深层次，复杂的表单
 */
export default class Setter extends Component {
  dep = new Dep();

  state = {
    draft: false,
    result: {}
  };

  componentDidMount = () => {
    this.initData();
  };

  componentWillUnmount = () => {
    this.clearData();
  };

  handleDataChange = () => {
    const { draft } = this.state;

    this.setState({
      result: clone(draft)
    });
  };

  initData() {
    const { data } = this.props;
    const draft = observable(data, this.dep);

    this.loger = debounce(this.handleDataChange, 200);

    observe(this.loger, this.dep);

    this.setState({
      draft,
      result: data
    });
  }

  clearData() {
    unobserve(this.loger, this.dep);
  }

  getResult() {
    return this.state.result;
  }

  render() {
    const { data, children, ...others } = this.props;
    const { draft, result } = this.state;
    return draft ? children(draft, result, others) : "";
  }
}
