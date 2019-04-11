/*
 * @Author: zsj
 * @Date: 2018-02-12 15:58:08
 * @Last Modified by: wangweixin
 * @Last Modified time: 2019-04-10 14:22:09
 */

import React, { Component } from "react";
import { any } from "prop-types";
import classNames from "classnames";

/**
 * 页面头部标题
 */

class PageTitle extends Component {
  render() {
    const { name, children, className, style } = this.props;
    const classes = classNames("row page-max-title", className);
    // const _key = `${Math.random().toFixed(6)}hjsd`
    return (
      <div className={classes} style={style}>
        {children}
        {name}
      </div>
    );
  }
}
PageTitle.displayName = "PageTitle";
PageTitle.propTypes = {
  /** 唯一需要传入的属性 */
  name: any.isRequired
};
PageTitle.defaultProps = {
  name: ""
};

export default PageTitle;
