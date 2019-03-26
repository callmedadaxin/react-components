import React from "react";

import map from "lodash/map";

export default function ColGroup({ columns }) {
  return (
    <colgroup>
      {map(columns, (column, index) => (
        <col
          key={`table-col-${column.key}-${index}`}
          style={{
            width: column.width,
            minWidth: column.width
          }}
        />
      ))}
    </colgroup>
  );
}
