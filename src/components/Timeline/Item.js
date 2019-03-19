import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

export default function TimelineItem({
  last,
  dot,
  desc,
  children,
  className,
  end
}) {
  const classes = classNames(
    {
      "timeline-item": true,
      last
    },
    className
  );
  return (
    <li className={classes}>
      {!end ? <div className="timeline-item-tail" /> : null}
      {end ? (
        <div className="timeline-item-end" />
      ) : (
        <div className="timeline-item-dot">{dot}</div>
      )}
      {desc ? <div className="timeline-item-dot-desc">{desc}</div> : null}
      {!end ? <div className="timeline-item-content">{children}</div> : null}
    </li>
  );
}
TimelineItem.propTypes = {
  /** 点的内容 */
  dot: PropTypes.any,
  /** 左侧点的描述 */
  desc: PropTypes.any,
  /** 是否是末尾节点 */
  end: PropTypes.bool
};
