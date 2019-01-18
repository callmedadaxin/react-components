import React from "react";
import { Box } from "@/index";

export default function BoxWrap() {
  return (
    <div>
      <Box data={true} border>
        这是一个小盒子
      </Box>
      <Box data={true} border title="这是盒子标题" clientHeight="200">
        这是一个小盒子
      </Box>
      <Box border data={[]} title="这是盒子标题">
        这是一个小盒子
      </Box>
      <Box data={true} isLoading title="这是盒子标题">
        这是一个小盒子
      </Box>
      <Box data={true} collapse defaultOpen title="这是盒子标题">
        这是一个小盒子
      </Box>
      <Box
        data={true}
        collapse
        toggleRender={open => {
          return open ? "关闭！" : "打开！";
        }}
        title="这是盒子标题"
      >
        这是一个小盒子
      </Box>
    </div>
  );
}
