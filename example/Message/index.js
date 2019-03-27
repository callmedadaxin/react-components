import React from "react";
import { Message } from "@";

Message.error("111");

export default function Wrap() {
  return (
    <div>
      <button
        onClick={() =>
          Message.success(
            "是否带水电费水电费是的分水电费水电费是的分收到水电费水电费是"
          )
        }
      >
        点我
      </button>
    </div>
  );
}
