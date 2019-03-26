import React, { memo } from "react";
import map from "lodash/map";
import includes from "lodash/includes";

import BaseRow from "./Row";
import Item from "../Item";

import { withScrollHeight, withExpandRow } from "./helper";

const Row = memo(withExpandRow(BaseRow));

function Body({
  columns,
  data,
  lineHeight,
  hasMore,
  showMore,
  activeIndex,
  selected,
  ...others
}) {
  return (
    <tbody className="table-body">
      {map(data, (row, index) => (
        <Row
          key={`table-row-${index}`}
          columns={columns}
          index={index}
          data={row}
          lineHeight={lineHeight}
          checked={includes(selected, row)}
          active={activeIndex === index}
          {...others}
        />
      ))}
      <Item show={hasMore}>
        <tr
          className="table-body-row table-show-more"
          onClick={showMore}
          style={{
            height: lineHeight
          }}
        >
          <td
            colSpan={columns.length}
            style={{
              height: lineHeight
            }}
          >
            显示更多
          </td>
        </tr>
      </Item>
    </tbody>
  );
}

export default withScrollHeight(Body);
