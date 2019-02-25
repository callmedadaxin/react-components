import React, { useState, useEffect, Children, cloneElement } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import TabHeader from "./TabHeader";
import get from "lodash/get";
import { nfn } from "../../common";

/**
 * 选项卡组件
 */
function Tab(props) {
  const {
    defaultActiveKey,
    beforeChange,
    onChange,
    children = [],
    className,
    style,
    theme,
    tabStyle,
    activeStyle,
    tabClassName,
    activeClassName,
    isTrapezoid
  } = props;

  if (tabStyle || activeStyle || tabClassName || activeClassName) {
    console.warn(
      `
      通过tabStyle, activeStyle, tabClassName, activeClassName
      设置tab样式的方法已经废弃，请使用css-module的特性来进行处理
      `
    );
  }

  if (isTrapezoid) {
    console.warn(
      `
      通过isTrapzoid设置tab样式的方法已经废弃，请使用主题来进行更改
      `
    );
  }

  const [active, setActive] = useState(defaultActiveKey);
  useEffect(() => {
    // 改为受苦的组件
    // 若defaultActiveKey改变，则修改active
    // 若没有传，则设置第一个key为active
    if (defaultActiveKey) {
      setActive(defaultActiveKey);
    } else {
      const firstChild = get(children, 0);
      const key = get(firstChild, "props.keys");
      if (key) {
        setActive(key);
      }
    }
  }, [defaultActiveKey]);

  const cls = classNames("tab-wrap", className, `tab-${theme}`);
  const handleTabChange = (key, disabled) => {
    if (disabled) return;

    const shouldChange = beforeChange();

    // 若返回false, 则不进行离开
    if (!shouldChange) {
      return;
    }

    setActive(key);
    onChange(key);
  };

  return (
    <div className={cls} style={style}>
      <TabHeader
        activeKey={active}
        childPanels={children}
        onTitleClick={handleTabChange}
      />
      <div className="tab-content">
        {Children.map(children, (child, index) => {
          const isActive = get(child, "props.keys") === active;
          if (!child) return null;
          return cloneElement(child, {
            active: isActive
          });
        }).filter(item => item)}
      </div>
    </div>
  );
}

export default Tab;

Tab.defaultProps = {
  beforeChange: () => true,
  onChange: nfn,
  theme: "title"
};

Tab.propTypes = {
  /** 默认active的tab, 默认第一个展示 */
  defaultActiveKey: PropTypes.string,
  /** 切换tab时的回调 */
  onChange: PropTypes.func,
  /** 切换tab前的回调，若返回false，则不进行切换 */
  beforeChange: PropTypes.func,
  /** 默认主题 */
  theme: PropTypes.oneOf(["title", "card"])
};
