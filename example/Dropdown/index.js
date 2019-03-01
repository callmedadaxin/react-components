import React, { useState, Fragment } from "react";
import { Dropdown, Box } from "@";

function Controled() {
  const [show, setShow] = useState(false);

  const overlay = (
    <Box style={{ width: 300 }} title="控制关闭">
      <Fragment>
        <button>点我不可以关闭</button>
        <button onClick={() => setShow(false)}>点我可以关闭</button>
      </Fragment>
    </Box>
  );
  return (
    <Dropdown overlay={overlay} visible={show} onVisibleChange={setShow}>
      <button>点我</button>
    </Dropdown>
  );
}

export default function Wrap() {
  return (
    <div>
      <Dropdown overlay="1111111111111">
        <button>点我</button>
      </Dropdown>
      <Dropdown overlay={<Box title="内容title">内嵌组件</Box>}>
        <button>点我</button>
      </Dropdown>
      <Dropdown trigger="hover" overlay={<Box title="内容title">内嵌组件</Box>}>
        <button>hover</button>
      </Dropdown>
      <Controled />
    </div>
  );
}
