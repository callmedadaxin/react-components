import React from "react";
import { Select } from "@";

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
    value: 3
  },
  {
    label: "444",
    value: 4
  },
  {
    label: "555",
    value: 5
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
      <Select defaultValue={8} options={options} onChange={console.log} />
      <Select
        defaultValue={[8, 9]}
        multi
        options={options}
        onChange={console.log}
      />
    </div>
  );
}
