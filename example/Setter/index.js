import React, { useRef } from "react";
import { Setter, Form, Input, Button, Select, Item } from "@";

const FormItem = Form.Item;
const Collector = Form.Collector;

const data = {
  user: {
    name: "wwx",
    sex: "male"
  },
  job: {
    type: "工程师",
    workTime: 9
  }
};

const sexOptions = [
  {
    label: "男",
    value: "male"
  },
  {
    label: "女",
    value: "female"
  }
];

const collector = new Collector();

export default function Wrap() {
  const setterRef = useRef();

  const onSubmit = () => {
    const result = setterRef.current.getResult();
    console.log(result);
  };

  return (
    <Setter data={data} ref={setterRef}>
      {(draft, value) => {
        const isMale = value.user.sex === "male";
        return (
          <div>
            <FormItem
              label="姓名"
              value={value.user.name}
              validators={[
                {
                  requires: true
                },
                {
                  length: [3, 6]
                }
              ]}
              collector={collector}
              onChange={name => (draft.user.name = name)}
            >
              <Input />
            </FormItem>
            <FormItem
              label="性别"
              value={value.user.sex}
              onChange={sex => (draft.user.sex = sex)}
            >
              <Select options={sexOptions} />
            </FormItem>
            <Item show={isMale}>
              <FormItem
                label="工作"
                value={value.job.type}
                onChange={type => (draft.job.type = type)}
              >
                <Input />
              </FormItem>
            </Item>
            <Item show={!isMale}>
              <FormItem
                label="工作年限"
                value={value.job.workTime}
                onChange={workTime => (draft.job.workTime = workTime)}
              >
                <Input />
              </FormItem>
            </Item>
            <Button onClick={onSubmit}>提交</Button>
          </div>
        );
      }}
    </Setter>
  );
}
