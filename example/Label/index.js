import React from "react";
import { Label } from "@";

export default function Wrap() {
  return (
    <div>
      <Label className="mgr10" type="error">
        error
      </Label>
      <Label className="mgr10" type="warning">
        warning
      </Label>
      <Label className="mgr10" type="alarm">
        alarm
      </Label>
      <Label className="mgr10" type="info">
        info
      </Label>
      <Label className="mgr10" type="dark">
        dark
      </Label>
      <Label className="mgr10" light type="error">
        error
      </Label>
      <Label className="mgr10" light type="warning">
        warning
      </Label>
      <Label className="mgr10" light type="alarm">
        alarm
      </Label>
      <Label className="mgr10" light type="info">
        info
      </Label>
      <Label className="mgr10" light type="dark">
        info
      </Label>
      <Label maxWidth={90} light type="dark">
        特别长特别长的内容特别长特别长的内容
      </Label>
      <Label closable light type="dark">
        可关闭
      </Label>
    </div>
  );
}
