import React, { useState } from "react";
import { DatePicker, DateRange, Button } from "@";

export default function Wrap() {
  const [value, setValue] = useState(+new Date("2017-03-03"));
  const [range, setRange] = useState("seven_days");

  return (
    <div>
      <DatePicker defaultValue={value} onChange={console.log} />
      <Button onClick={() => setValue(+new Date())}>reset</Button>
      <DateRange defaultValue={range} onChange={console.log} />
      <Button onClick={() => setRange("thirty_days")}>reset</Button>
    </div>
  );
}
