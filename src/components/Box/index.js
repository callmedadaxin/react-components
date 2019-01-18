import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import iconArrow from "./images/coor-arrow.svg";

import Icon from "../Icon";
import Loading from "../Loading";
import NoResult from "../NoResult";
import Item from "../Item";

import isEmpty from "lodash/isEmpty";
import { nfn } from "@/common";

function getContent({ show, loading, error, children, emptyDesc }) {
  if (error) {
    return <NoResult desc={error} />;
  }
  if (loading) {
    return <Loading className="box-loading" size="lg" />;
  }
  if (show) {
    return children;
  }
  return <NoResult desc={emptyDesc} />;
}

function Title({ title, collapse, toggleRender, open, setOpen }) {
  return (
    <div className="box-title">
      {title}
      <Item show={collapse}>
        <div className="box-title-toggle" onClick={() => setOpen(!open)}>
          {toggleRender ? (
            toggleRender(open)
          ) : (
            <Fragment>
              <Icon className="box-title-toggle-icon" link={iconArrow} />
              {open ? "收起" : "展开"}
            </Fragment>
          )}
        </div>
      </Item>
    </div>
  );
}

/**
 * 基本的盒子，用于组成页面的各个小容器
 * 可设置标题，自带Loading样式，自身可判断是否有数据而进行展示/隐藏
 */
function Box(props) {
  const {
    title,
    data,
    className,
    border,
    collapse,
    defaultOpen,
    error,
    isLoading,
    children,
    emptyDesc,
    contentHeight,
    style,
    onToggle,
    toggleRender
  } = props;
  const [open, setOpen] = useState(defaultOpen);
  const classes = classNames("box", className, {
    border,
    collapse,
    open
  });
  const show = isEmpty(data);
  const onToggleClick = () => {
    setOpen(!open);
    onToggle(!open);
  };
  return (
    <div className={classes} style={style}>
      <Item show={title}>
        <Title
          title={title}
          collapse={collapse}
          toggleRender={toggleRender}
          open={open}
          setOpentitle={title}
          setOpen={onToggleClick}
        />
      </Item>
      <div
        className="box-content"
        style={{
          height: contentHeight ? parseInt(contentHeight, 10) : ""
        }}
      >
        {getContent({
          show,
          loading: isLoading,
          error,
          children,
          emptyDesc
        })}
      </div>
    </div>
  );
}
Box.defaultProps = {
  isLoading: false,
  defaultOpen: false,
  onToggle: nfn
};
Box.propTypes = {
  /** 盒子的标题，可以省略 */
  title: PropTypes.any,
  /** 盒子依赖的数据，会根据是否有该数据而判断是否展示数据为空, 当data为boolean的时候，直接判断是否展示盒子依赖的数据 */
  data: PropTypes.any,
  /** 数据为空时展示的描述 */
  emptyDesc: PropTypes.string,
  /** 是否正在Loading, 是的话会自带Loading样式 */
  isLoading: PropTypes.bool,
  /** 是否带border */
  border: PropTypes.bool,
  /** 是否可以折叠 */
  collapse: PropTypes.bool,
  /** 可以折叠时，是否默认展开 */
  defaultOpen: PropTypes.bool,
  /** 自定义折叠按钮 */
  toggleRender: PropTypes.func,
  /** 自定义盒子内容高度 */
  contentHeight: PropTypes.string
};

export default Box;
