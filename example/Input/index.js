import React, { useState, useEffect } from "react";
import { MultiInput } from "@";

export default function Wrap() {
  return (
    <MultiInput
      placeholder="最多不超过5个邮箱地址"
      onChange={(val) => {
        console.log(val);
      }}
      // defaultValue={""}
    ></MultiInput>
  );
}
