import React, { memo } from "react";
import get from "lodash/get";
import cx from "classnames";
import { nfn } from "../../common";

export function Column({
  data,
  index,
  rowIndex,
  open,
  lineHeight,
  checked,
  config = {}
}) {
  const { key, render, align, limit, width } = config;
  const cls = cx("table-row-item", {
    pdl10: align === "left",
    pdr10: align === "right",
    limit
  });
  const columnData = get(data, key);
  const content = render
    ? render(columnData, data, {
        rowIndex,
        columnIndex: index,
        expandShow: open,
        checked
      })
    : columnData;

  return (
    <td
      className={cls}
      style={{
        height: lineHeight,
        textAlign: align || "center",
        maxWidth: width
      }}
    >
      {content}
    </td>
  );
}

function Row({
  columns,
  data,
  index,
  active,
  open,
  className,
  lineHeight,
  striped,
  onClick,
  checked,
  ...others
}) {
  const cls = cx("table-body-row", className, {
    active,
    striped
  });
  const onRowClick = () => onClick(data, index);
  const columnProps = {
    data,
    rowIndex: index,
    lineHeight,
    open
  };
  return (
    <tr
      className={cls}
      onClick={onRowClick}
      style={{ height: lineHeight }}
      {...others}
    >
      {columns.map((column, i) => (
        <Column
          key={`table-row-item-${index}-${i}`}
          {...columnProps}
          config={column}
          checked={checked}
          index={i}
        />
      ))}
    </tr>
  );
}

Row.defaultProps = {
  onClick: nfn
};

export default memo(Row);
