import React from "react";
import PropTypes from "prop-types";
import Circle from "./Loading";
import Bar from "./LoadingBar";
import Box from "./LoadingBox";

/**
 * 各种Loading样式
 */
export default function Loading(props) {
  const { type, ...others } = props;
  switch (type) {
    case "bar":
      return <Bar {...others} />;
    case "box":
      return <Box {...others} />;
    default:
      return <Circle {...others} />;
  }
}
Loading.defaultProps = {
  type: "default"
};
Loading.propTypes = {
  /** loaing的不同样式 */
  type: PropTypes.oneOf(["bar", "box", "default"]),
  /** type='default' 的size大小  lg: 80,80  sm: 20,20  默认是sm */
  size: PropTypes.oneOf(["lg", "sm"])
};
