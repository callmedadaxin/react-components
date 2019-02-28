import React, { useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { nfn } from "../../common";
import "rc-pagination/assets/index.css";
import last from "lodash/last";
import head from "lodash/head";
import isNumber from "lodash/isNumber";

const getTotalPage = (total, pageSize) => {
  return Math.ceil(total / pageSize);
};

// 获取start开始的total个数的数组
const getArraysWithIndex = (total, start = 0) => {
  return Array(total)
    .fill(1)
    .map((item, index) => start + index + 1);
};
// 获取一个current周围的5个数
const getPageSurround = (total, current) => {
  if (current < 4) {
    return getArraysWithIndex(5);
  }
  if (current > total - 3) {
    return getArraysWithIndex(5, total - 5);
  }
  return getArraysWithIndex(5, current - 3);
};
const getPages = (pageNum, current) => {
  // 页数 < 7 不需要快速跳转
  if (pageNum <= 7) return getArraysWithIndex(pageNum);

  const nums = getPageSurround(pageNum, current);
  const prev = head(nums) === 1 ? [] : head(nums) === 2 ? [1] : [1, "jumpPrev"];
  const next =
    last(nums) === pageNum
      ? []
      : last(nums) === pageNum - 1
      ? [pageNum]
      : ["jumpNext", pageNum];
  return [...prev, ...nums, ...next].filter(Boolean);
};

const disabledPrev = current => current <= 1;
const disabledNext = (current, total) => current >= total;

const onPrev = (page, setPage) => {
  return () => {
    if (disabledPrev(page)) return;
    setPage(page - 1);
  };
};

const onNext = (page, setPage, total) => {
  return () => {
    if (disabledNext(page, total)) return;
    setPage(page + 1);
  };
};

const isJump = num => {
  if (isNumber(num)) return false;

  return num.indexOf("jump") >= 0;
};

const isJumpPrev = num => {
  if (!isJump(num)) return false;

  return num === "jumpPrev";
};

const isJumpNext = num => {
  if (!isJump(num)) return false;

  return num === "jumpNext";
};

/**
 * 分页组件
 */
function Pagination(props) {
  const { current, total, pageSize, onChange, className } = props;

  const [page, setPage] = useState(current);
  const pagesNum = getTotalPage(total, pageSize);
  const pages = getPages(pagesNum, page);

  const cls = cx("rc-pagination", "tip-pagination", className);
  const prevCls = cx("rc-pagination-prev", {
    "rc-pagination-disabled": disabledPrev(page)
  });
  const nextCls = cx("rc-pagination-next", {
    "rc-pagination-disabled": disabledNext(page, pagesNum)
  });

  const onPageChange = page => {
    if (page < 1) {
      page = 1;
    }
    if (page > pagesNum) {
      page = pagesNum;
    }
    console.log(page);
    setPage(page);
    onChange(page);
  };
  return (
    <ul className={cls}>
      <li title="上一页" onClick={onPrev(page, onPageChange)} class={prevCls}>
        <a className="rc-pagination-item-link" />
      </li>
      {pages.map(num => {
        const itemCls = cx("rc-pagination-item", {
          "rc-pagination-item-active": page === num,
          "rc-pagination-jump-prev": isJumpPrev(num),
          "rc-pagination-jump-next": isJumpNext(num)
        });
        return (
          <li
            className={itemCls}
            onClick={() => {
              if (isJumpPrev(num)) {
                return onPageChange(page - 5);
              }
              if (isJumpNext(num)) {
                return onPageChange(page + 5);
              }
              return onPageChange(num);
            }}
          >
            <a className="rc-pagination-item-link">{isJump(num) ? "" : num}</a>
          </li>
        );
      })}
      <li
        title="下一页"
        onClick={onNext(page, onPageChange, pagesNum)}
        className={nextCls}
      >
        <a className="rc-pagination-item-link" />
      </li>
    </ul>
  );
}

Pagination.defaultProps = {
  current: 1,
  pageSize: 10,
  onChange: nfn
};

Pagination.propTypes = {
  /** 当前的在第几页，比如一共5页面，current=1，则显示当前在第一页 */
  current: PropTypes.number.isRequired,
  /** 点击切换分页的时候，调用的函数 */
  onChange: PropTypes.func.isRequired,
  /** 当前分页所有的总数目 */
  total: PropTypes.number.isRequired,
  /** 每页显示多少条数据，默认是10 */
  pageSize: PropTypes.number
};

export default Pagination;
