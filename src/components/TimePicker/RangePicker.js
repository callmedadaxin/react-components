import React from "react";
import { DatePicker as BaseDatePicker, LocaleProvider } from "antd";
import moment from "moment";
import { ranges, getStartAndEndTime } from "./constant";
import zhCN from "antd/es/locale-provider/zh_CN";
import { nfn } from "../../common";
import { useControlledInputs } from "../../common/hooks";
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

function DateRangePicker(props) {
  const { defaultValue, style, onChange, ...others } = props;
  const { value, handleChange } = useControlledInputs({
    defaultValue,
    onChange,
    mapDefaultToValue,
    mapValuetoValue,
    mapValueWhenChange: false
  });
  const handleOk = () => {
    setTimeout(() => {
      onChange(mapValuetoValue(value));
    }, 0);
  };
  return (
    <LocaleProvider locale={zhCN}>
      <BaseRangePicker
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
        {...others}
      />
    </LocaleProvider>
  );
}

DateRangePicker.defaultProps = {
  onChange: nfn,
  style: {}
};

export default DateRangePicker;
