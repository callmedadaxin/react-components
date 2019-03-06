import React from "react";
import delIconCavity from "./images/del_icon_cavity.svg";
import Icon from "../Icon";

export default function ValueItem({ value, onRemove }) {
  const delIconStyle = {
    width: "14px",
    height: "14px",
    marginLeft: "5px",
    fill: "#2d84e5"
  };
  return (
    <div className="multi-select-value">
      <span>{value.label || value.value}</span>
      <span
        onClick={e => {
          e.stopPropagation();
          onRemove(value);
        }}
        style={{ cursor: "pointer" }}
      >
        <Icon style={delIconStyle} link={delIconCavity} />
      </span>
    </div>
  );
}
