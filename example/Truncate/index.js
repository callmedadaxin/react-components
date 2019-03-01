import React from "react";
import { Truncate } from "@";

export default function Wrap() {
  return (
    <div style={{ width: 200 }}>
      <Truncate line={4}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos
        labore sit vel itaque delectus atque quos magnam assumenda quod
        architecto perspiciatis animi.
      </Truncate>
    </div>
  );
}
