import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function TabPanel(props) {
  const { children, active, className, defaultLoad } = props;
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // 默认对非激活的tab不进行展示
    if (active && !shown) {
      setShown(true);
    }
  }, [active]);

  const classes = classNames("tab-panel", className, {
    active
  });

  return (
    <div className={classes}>
      {(shown && children) || (defaultLoad && children)}
    </div>
  );
}

TabPanel.propTypes = {
  /** 头部内容, 可以传入节点 */
  header: PropTypes.any,
  /** 特有的key */
  keys: PropTypes.string.isRequired,
  /** 是否active, 会被父组件自动传入，不用关心 */
  active: PropTypes.bool,
  /** 是否在初次加载的时候加载 */
  defaultLoad: PropTypes.bool,
  /** 是否禁用 */
  disabled: PropTypes.bool
};

export default TabPanel;
