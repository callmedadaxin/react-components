import React, { useState } from "react";
import { TimePicker, Button } from "@";

const { DatePicker, RangePicker } = TimePicker;

export default function Wrap() {
  const [value, setValue] = useState(+new Date("2017-03-03"));
  const [range, setRange] = useState("seven_days");

  return (
    <div>
      <DatePicker defaultValue={value} onChange={console.log} />
      <Button onClick={() => setValue(+new Date())}>reset</Button>
      <RangePicker
        defaultValue={range}
        // onChange={console.log}
        onOk={() => {
          console.log(111);
        }}
      />
      <Button onClick={() => setRange("thirty_days")}>reset</Button>
    </div>
  );
}
