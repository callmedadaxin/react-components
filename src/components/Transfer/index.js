import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { map, includes, filter } from "lodash";
import Item from "../Item";
import Input from "../Input";
import Checkbox from "../Checkbox";
import Box from "../Box";
import { nfn } from "../../common";

const { CheckboxGroup } = Checkbox;

const mapValueToSource = (value, source) => {
  return filter(source, item => includes(value, item.value));
};
const mapSourceToValue = source => map(source, item => item.value);

function TransferList({ withSearch, listItems, selected, render, onSelect }) {
  const [filterItem, setFilter] = useState("");
  // 是否全部选中
  const allSelected =
    listItems.length === selected.length && selected.length !== 0;

  // 点击全部选中
  const handleAllSelectChange = checked =>
    checked ? onSelect(mapSourceToValue(listItems)) : onSelect([]);

  return (
    <div className="transfer-list">
      <div className="transfer-list-title">
        <Checkbox
          defaultChecked={allSelected}
          onChange={handleAllSelectChange}
        />
        <Item show={selected.length}>{selected.length}/</Item>
        {listItems.length}项
      </div>
      <Item show={withSearch}>
        <Input isSearch onChange={setFilter} />
      </Item>
      <Box data={listItems}>
        <CheckboxGroup defaultValue={selected} onChange={onSelect}>
          {map(
            filterItem === ""
              ? listItems
              : filter(listItems, item => includes(item.label, filterItem)),
            (item, index) => (
              <Checkbox
                disabled={item.disabled}
                key={`${item.label}-${index}`}
                label={render(item)}
                value={item.value}
              />
            )
          )}
        </CheckboxGroup>
      </Box>
      <ul />
    </div>
  );
}

function Transfer({
  className,
  defaultValue,
  dataSource,
  withSearch,
  onChange,
  render
}) {
  const cls = cx("transfer", className);

  // 右侧list展示的内容
  const [targetList, setTarget] = useState([]);
  useEffect(() => {
    setTarget(mapValueToSource(defaultValue, dataSource));
  }, [defaultValue, dataSource]);

  // 左侧list展示的内容
  const sourceList = useMemo(
    () => filter(dataSource, item => !includes(targetList, item)),
    [dataSource, targetList]
  );

  // 控制左侧选中
  const [sourceSelected, handleSourceSelect] = useState([]);
  // 控制右侧选中
  const [targetSelected, handleTargetSelect] = useState([]);

  const toRight = () => {
    const moved = mapValueToSource(sourceSelected, dataSource);
    const targetResultList = [...moved, ...targetList];
    setTarget(targetResultList);
    handleSourceSelect([]);
    onChange(mapSourceToValue(targetResultList), "right", moved);
  };

  const toLeft = () => {
    const moved = mapValueToSource(targetSelected, dataSource);
    const targetResultList = filter(targetList, item => !includes(moved, item));
    setTarget(targetResultList);
    handleTargetSelect([]);
    onChange(mapSourceToValue(targetResultList), "left", moved);
  };

  return (
    <div className={cls}>
      <div className="transfer-list-wrap transter-left">
        <TransferList
          listItems={sourceList}
          selected={sourceSelected}
          onSelect={handleSourceSelect}
          render={render}
          withSearch={withSearch}
        />
      </div>
      <div className="transfer-controll-center">
        <button onClick={toLeft}>left</button>
        <button onClick={toRight}>right</button>
      </div>
      <div className="transfer-list-wrap transter-right">
        <TransferList
          listItems={targetList}
          selected={targetSelected}
          onSelect={handleTargetSelect}
          render={render}
          withSearch={withSearch}
        />
      </div>
    </div>
  );
}

Transfer.propTypes = {
  /** 已选择的值，展示在右边 */
  defaultValue: PropTypes.array,
  /** 全部可选的值, 必须包含 { label, value } */
  dataSource: PropTypes.arrayOf(PropTypes.object),
  /** 变更时的回调, 回传已选value, direction, 未选value */
  onChange: PropTypes.func,
  /** 用于列表展示的丰富 */
  render: PropTypes.func,
  /** 禁用状态 */
  disabled: PropTypes.disabled,
  /** 是否可筛选 */
  withSearch: PropTypes.bool
};

Transfer.defaultProps = {
  render: n => n.label,
  defaultValue: [],
  onChange: nfn,
  disabled: false
};

export default Transfer;
