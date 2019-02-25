import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import jsonFormat from "json-format";
import JSONPretty from "react-json-pretty";
import map from "lodash/map";
import isString from "lodash/isString";
import { stringfy } from "../../common";

/**
 * 针对代码块的统一封装，提供table,json两种格式
 */
function Code(props) {
  const { data, type, className, labelWidth, style } = props;
  const cls = classNames("code-wrap", className);

  if (type === "json") {
    const json = jsonFormat(data);
    return (
      <div className={cls} style={style}>
        <JSONPretty json={json} />
      </div>
    );
  }

  return (
    <div className={cls} style={style}>
      <table className="code-table">
        <thead className="code-thead">
          <tr>
            <th className="key">KEY</th>
            <th className="value">VALUE</th>
          </tr>
        </thead>
        <tbody className="code-tbody">
          {map(data, (item, key) => {
            return (
              <tr className="code-tr-content" key={key}>
                <td className="key" style={{ width: labelWidth }}>
                  {key}
                </td>
                <td className="value">
                  {isString(item) ? item : stringfy(item)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

Code.defaultProps = {
  type: "table"
};
Code.propTypes = {
  /** 要展示的代码 */
  data: PropTypes.object,
  /** 展示的数据类型 */
  type: PropTypes.oneOf(["table", "json"]),
  /** 表格的标签宽度 */
  labelWidth: PropTypes.string
};

export default Code;
