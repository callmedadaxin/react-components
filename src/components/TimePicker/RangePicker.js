import React from "react";
import PropTypes from "prop-types";
import { DatePicker as BaseDatePicker, LocaleProvider } from "antd";
import moment from "moment";
import { ranges, getStartAndEndTime } from "./constant";
import zhCN from "antd/es/locale-provider/zh_CN";
import { nfn } from "../../common";
import { useControlledInputs } from "../../common/hooks";
import { getDefaultPortalSelector } from "../../common/portalHelpers";
import isString from "lodash/isString";

const { RangePicker: BaseRangePicker } = BaseDatePicker;

const mapDefaultToValue = (defaultValue = "seven_days") => {
  if (Array.isArray(defaultValue)) {
    return defaultValue;
  }
  const ret = isString(defaultValue)
    ? getStartAndEndTime(defaultValue)
    : defaultValue;
  return [
    ret && ret.start ? moment(ret.start) : moment(new Date()),
    ret && ret.end ? moment(ret.end) : moment(new Date())
  ];
};
const mapValuetoValue = value => ({
  start: +value[0],
  end: +value[1]
});

/**
 * 日期区间选择器
 * @see https://ant.design/components/date-picker-cn/
 */
function RangePicker(props) {
  const { defaultValue, style, onChange, onOk, placeholder, ...others } = props;
  const { value, handleChange } = useControlledInputs({
    defaultValue,
    onChange,
    mapDefaultToValue,
    mapValuetoValue,
    mapValueWhenChange: false
  });
  const handleOk = value => {
    const v = mapValuetoValue(value);
    setTimeout(() => {
      onChange && onChange(v);
      onOk && onOk(v);
    }, 0);
  };
  return (
    <LocaleProvider locale={zhCN}>
      <BaseRangePicker
        allowClear={false}
        ranges={ranges}
        showTime={{
          format: "HH:mm"
        }}
        style={{
          ...style,
          width: style.width || "100%"
        }}
        value={value}
        format="YYYY-MM-DD HH:mm"
        onOk={handleOk}
        onChange={handleChange}
        getCalendarContainer={getDefaultPortalSelector()}
        {...others}
      />
    </LocaleProvider>
  );
}

RangePicker.defaultProps = {
  onChange: nfn,
  onOk: nfn,
  style: {}
};
RangePicker.propTypes = {
  /**
   * 两种方式的默认值
   * 1: string : [
   *   "one_hour",
   *   "twenty\_four_hours",
   *   "today",
   *   "seven_days",
   *   "thirty_days"
   * ]中的一种,
   * 2: {
   *   start, //时间戳
   *   end //时间戳
   * }
   */
  defaultValue: PropTypes.oneOfType([
    PropTypes.oneOf([
      "one_hour",
      "twenty_four_hours",
      "today",
      "seven_days",
      "thirty_days"
    ]),
    PropTypes.shape({
      start: PropTypes.number,
      end: PropTypes.number
    })
  ]),
  /** 回调，传入的值{ start, end } */
  onChange: PropTypes.func
};

export default RangePicker;
