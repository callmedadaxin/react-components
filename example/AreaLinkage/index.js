import React from "react";
import { AreaLinkage } from "@";

export default function Wrap() {
  return (
    <AreaLinkage
      defaultValue={{
        province: "天津",
        city: "天津"
      }}
      onChange={console.log}
    />
  );
}
