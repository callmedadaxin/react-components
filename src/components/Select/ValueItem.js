import React from "react";
import cx from "classnames";
import delIconCavity from "./images/del_icon_cavity.svg";
import Icon from "../Icon";

export default function ValueItem({ value = {}, onRemove, disabled }) {
  const classes = cx("multi-select-value", {
    disabled: disabled || value.disabled
  });
  return (
    <div className={classes}>
      <span>{value.label || value.value}</span>
      <span
        onClick={e => {
          e.stopPropagation();
          onRemove(value);
        }}
        style={{ cursor: "pointer" }}
      >
        <Icon className="multi-item-del-icon" link={delIconCavity} />
      </span>
    </div>
  );
}
