import React, { useEffect } from "react";
import cx from "classnames";
import map from "lodash/map";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";

export default function Options({
  value: currentValue,
  single,
  show,
  options,
  filterItem,
  handleItemClick,
  focusItem,
  setFocusItem
}) {
  if (!show) return "";
  const noFilterResult = filterItem !== "" && isEmpty(options);
  return (
    <div className="select-option-wrap">
      {noFilterResult ? (
        <div className="select-no-result">No results found</div>
      ) : (
        <ul className="select-option-content">
          {map(options, (option = {}) => {
            const { label, value, disabled } = option;
            const active = single ? isEqual(option, currentValue) : false;
            const focus = isEqual(option, focusItem);
            const cls = cx("select-option-item", {
              active,
              focus,
              disabled
            });
            return (
              <li
                key={"select" + label + value}
                className={cls}
                onClick={e => {
                  if (!disabled) {
                    handleItemClick(option);
                  } else {
                    e.stopPropagation();
                  }
                }}
                onMouseEnter={() => setFocusItem(option)}
              >
                {label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
