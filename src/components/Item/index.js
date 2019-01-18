import React from "react";
import isEmpty from "lodash/isEmpty";

export default ({
  show,
  children,
  default: defaultContent = null,
  ...others
}) => {
  if (isEmpty(others)) {
    return show ? children : defaultContent;
  }
  return show ? React.cloneElement(children, others) : defaultContent;
};
