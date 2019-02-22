import React, { useState } from "react";
import { Modal, Button } from "@";

export default function ModalWrap() {
  const [show, setShow] = useState(false);

  return (
    <div className="row mgb20">
      <Button onClick={() => setShow(true)} type="secondary">
        点击展示modal
      </Button>
      <Button className="mgr20" onClick={() => Modal.alert("测试！！！！")}>
        alert
      </Button>
      <Button
        onClick={() =>
          Modal.confirm("测试！！！！", {
            title: "标题",
            ensureTxt: "哦了",
            cancelTxt: "不能"
          })
            .then(() => {
              console.log("哦了！！");
            })
            .catch(() => {
              console.log("呸！");
            })
        }
      >
        confirm
      </Button>
      <Modal
        isOpen={show}
        title="测试Modal"
        footer={<Button onClick={() => setShow(false)}>确定</Button>}
        handleCancel={() => setShow(false)}
        handleEnsure={() => setShow(false)}
        style={{
          content: {
            width: 1000
          }
        }}
      >
        <div>这是Modal里面的内容</div>
      </Modal>
    </div>
  );
}
