import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default function NoResult(props) {
  const { desc, className, style } = props;
  const classes = classNames("no-result", className);
  return (
    <div role="no-result" className={classes} style={style}>
      {desc}
    </div>
  );
}
NoResult.propTypes = {
  /** 无数据时的描述 */
  desc: PropTypes.string
};
NoResult.defaultProps = {
  desc: "暂无数据"
};
