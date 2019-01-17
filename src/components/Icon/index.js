/*
 * @Author: wangweixin
 * @Date: 2017-12-15 11:00:11
 * @Last Modified by: wangweixin
 * @Last Modified time: 2019-01-17 17:52:07
 */
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
 * icon的基本封装
 */
function Icon(props) {
  const { link, className = "", style, ...others } = props;
  const classes = classnames("icon", className);
  return (
    <svg className={classes} {...others} style={style}>
      <use xlinkHref={link} />
    </svg>
  );
}

Icon.propTypes = {
  /** svg的路径 */
  link: PropTypes.string.isRequired
};

export default Icon;
