import React from "react";
import { createPortal } from "react-dom";
import cx from "classnames";
import map from "lodash/map";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";

export default function Options({
  position,
  value: currentValue,
  single,
  show,
  options,
  filterItem,
  handleItemClick,
  focusItem,
  setFocusItem,
  getContainer
}) {
  const noFilterResult = filterItem !== "" && isEmpty(options);
  const cls = cx("select-option-wrap", {
    show
  });
  const container = getContainer && getContainer() || document.body;
  return createPortal(
    <div className={cls} style={position}>
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
    </div>,
    container
  );
}
