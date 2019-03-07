import React from "react";
import { Select, MultiInput } from "@";

const options = [
  // {
  //   label: "空",
  //   value: ""
  // },
  {
    label: "111",
    value: 1
  },
  {
    label: "222",
    value: 2
  },
  {
    label: "333",
    disabled: true,
    value: 3
  },
  {
    label: "444",
    value: 4
  },
  {
    label: "555",
    value: 5,
    disabled: true
  },
  {
    label: "666",
    value: 6
  },
  {
    label: "777",
    value: 7
  },
  {
    label: "888",
    value: 8
  },
  {
    label: "999",
    value: 9
  }
];

export default function Wrap() {
  return (
    <div>
      <Select
        className="mgb10"
        defaultValue={8}
        options={options}
        onChange={console.log}
      />
      <Select
        className="mgb10"
        defaultValue={8}
        disabled
        options={options}
        onChange={console.log}
      />
      <Select
        className="mgb10"
        defaultValue={8}
        hasError
        options={options}
        onChange={console.log}
      />
      <Select
        defaultValue={[8, 9]}
        multi
        className="mgb10"
        options={options}
        onChange={console.log}
      />
      <Select
        defaultValue={[8, 9]}
        multi
        className="mgb10"
        disabled
        options={options}
        onChange={console.log}
      />
      <Select
        defaultValue={[8, 9]}
        multi
        className="mgb10"
        hasError
        options={options}
        onChange={console.log}
      />
      {/* <MultiInput className="mgb10" onChange={console.log} /> */}
      <MultiInput
        className="mgb10"
        defaultValue={[1, 2]}
        onChange={console.log}
      />
      {/* <MultiInput
        className="mgb10"
        disabled
        defaultValue={[1, 2]}
        onChange={console.log}
      />
      <MultiInput
        className="mgb10"
        hasError
        defaultValue={[1, 2]}
        onChange={console.log}
      /> */}
    </div>
  );
}
