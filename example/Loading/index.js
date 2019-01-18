import React from "react";
import { Loading } from "@/index";

export default function Wrap() {
  return (
    <div>
      <Loading size="lg" />
      <Loading />
      <Loading type="box">正在提交...</Loading>
      <Loading type="bar" />
    </div>
  );
}
