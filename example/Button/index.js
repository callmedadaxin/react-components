import React from "react";
import { Button } from "@";

export default function Wrap() {
  return (
    <div>
      <Button className="mgr20">按钮</Button>
      <Button className="mgr20" type="primary">
        按钮
      </Button>
      <Button className="mgr20" type="secondary">
        按钮
      </Button>
      <Button className="mgr20" type="cancel">
        按钮
      </Button>
      <Button className="mgr20" type="link">
        按钮
      </Button>
      <Button width="200">设置了宽度</Button>
    </div>
  );
}
