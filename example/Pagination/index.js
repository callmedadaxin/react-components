import React from "react";
import { Pagination } from "@";

export default function Wrap() {
  return (
    <div>
      <Pagination total={205} />
      <Pagination total={0} />
      <Pagination total={70} />
      <Pagination total={80} />
      <Pagination total={15} />
      <Pagination total={1000} />
    </div>
  );
}
