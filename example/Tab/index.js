import React, { useState, useEffect } from "react";
import { Tab } from "@";

const TabPanel = Tab.TabPanel;

export default function Wrap() {
  const [time, setTime] = useState(1);
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(time + 1);
    }, 1000);

    return () => clearInterval(timer);
  });
  return (
    <Tab defaultActiveKey="2" onChange={console.log} theme="card">
      <TabPanel header="告警明细" keys="1">
        111
      </TabPanel>
      <TabPanel header={<div>测试header改变{time}</div>} keys="2">
        222
      </TabPanel>
    </Tab>
  );
}
