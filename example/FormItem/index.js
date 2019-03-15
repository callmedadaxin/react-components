import React, { useState } from "react";
import { FormItem, Input, Collector, Button } from "@";

const collector = new Collector();

export default function Wrap() {
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const onClick = () => {
    const ok = collector.validate();

    if (!ok) {
      console.log("验证不通过!");
    } else {
      console.log(name, age);
    }
  };
  return (
    <div>
      <div>
        单独使用FormItem, 配合Collector进行验证
        <FormItem
          className="mgb20"
          label="姓名"
          onChange={val => setName(val)}
          collector={collector}
          validators={[
            {
              required: true
            },
            {
              length: [1, 20]
            }
          ]}
        >
          <Input placeholder="请输入姓名，必填，长度20" />
        </FormItem>
        <FormItem
          label="年龄"
          onChange={val => setAge(val)}
          collector={collector}
          validators={[
            {
              required: true
            },
            {
              fn(num) {
                return num < 20;
              }
            }
          ]}
        >
          <Input placeholder="请输入年龄，必填，必须小于20" />
        </FormItem>
        <Button onClick={onClick}>提交</Button>
      </div>
    </div>
  );
}
