import React from "react";
import PropTypes from "prop-types";
import { DatePicker as BaseDatePicker, LocaleProvider } from "antd";
import moment from "moment";
import zhCN from "antd/es/locale-provider/zh_CN";
import { nfn } from "../../common";
import { useControlledInputs } from "../../common/hooks";

const mapDefaultToValue = defaultValue => {
  return defaultValue ? moment(defaultValue) : null;
};
const mapValuetoValue = value => +value;

/**
 * 日期选择器,
 * 修改了默认值和onChange。
 * 其他的props见文档
 * @see https://ant.design/components/date-picker-cn/
 */
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

DatePicker.defaultProps = {
  onChange: nfn
};

DatePicker.propTypes = {
  /** 默认值，时间戳 */
  defaultValue: PropTypes.number,
  /** 回调，传入的值为时间戳 */
  onChange: PropTypes.func
};

export default DatePicker;
