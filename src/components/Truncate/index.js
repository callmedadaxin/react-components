import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import TextTruncate from "react-text-truncate";
import classNames from "classnames";

/**
 * 文字截断
 */
export default function Truncate(props) {
  const {
    children,
    line,
    defaultExpand,
    canReadMore,
    less,
    more,
    ...others
  } = props;

  const [expand, setExpand] = useState(defaultExpand);

  const moreDom = (
    <a className="truncate-expand" onClick={() => setExpand(!expand)}>
      {expand ? less : more}
    </a>
  );
  const cls = classNames(
    {
      "break-all": line > 1
    },
    "truncate"
  );
  return expand ? (
    <Fragment>
      {children} {moreDom}
    </Fragment>
  ) : (
    <TextTruncate
      {...others}
      text={children}
      line={line}
      containerClassName={cls}
      textTruncateChild={canReadMore ? moreDom : ""}
    />
  );
}

Truncate.propTypes = {
  /** 是否默认展开 */
  defaultExpand: PropTypes.bool,
  /** 超过多少行开始截断 */
  line: PropTypes.number,
  /** 展开的提示 */
  more: PropTypes.node,
  /** 收起的提示 */
  less: PropTypes.node,
  /** 是否可以展开收起 */
  canReadMore: PropTypes.bool
};
Truncate.defaultProps = {
  line: 1,
  more: "展开",
  less: "收起",
  canReadMore: true
};
