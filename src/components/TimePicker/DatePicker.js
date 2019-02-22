import React from "react";
import { DatePicker as BaseDatePicker, LocaleProvider } from "antd";
import moment from "moment";
import zhCN from "antd/es/locale-provider/zh_CN";
import { nfn } from "../../common";
import { useControlledInputs } from "../../common/hooks";

const mapDefaultToValue = defaultValue => {
  return defaultValue ? moment(defaultValue) : null;
};
const mapValuetoValue = value => +value;

function DatePicker(props) {
  const { defaultValue, onChange, ...others } = props;
  const { value, handleChange } = useControlledInputs({
    defaultValue,
    onChange,
    mapDefaultToValue,
    mapValuetoValue,
    mapValueWhenChange: false
  });
  return (
    <LocaleProvider locale={zhCN}>
      <BaseDatePicker
        value={value}
        format="YYYY-MM-DD"
        onChange={handleChange}
        {...others}
      />
    </LocaleProvider>
  );
}

DatePicker.propTypes = {
  onChange: nfn
};

export default DatePicker;
