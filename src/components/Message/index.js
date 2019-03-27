import React, { createRef } from "react";
import ReactDOM from "react-dom";
import Animate from "rc-animate";
import filter from "lodash/filter";
import Notice from "./Notice";

let seed = 0;

class AlertGroup extends React.Component {
  state = {
    alerts: []
  };

  onEnd = key => {
    const { alerts } = this.state;
    this.setState({
      alerts: filter(alerts, alert => alert.key !== key)
    });
  };

  addAlert = a => {
    this.setState({
      alerts: this.state.alerts.concat(a)
    });
  };

  render() {
    const { alerts } = this.state;
    const children = alerts.map(a => {
      if (!a.key) {
        seed++;
        a.key = String(seed);
      }
      return <Notice {...a} onEnd={() => this.onEnd(a.key)} />;
    });

    return (
      <Animate transitionAppear transitionName="move-up" component="div">
        {children}
      </Animate>
    );
  }
}

const alertGroup = new Map();

function alert(content, time, type, target = document.body) {
  let group = alertGroup.get(target);
  const add = group =>
    group.addAlert({
      content,
      time,
      type
    });

  if (!group) {
    const div = document.createElement("div");

    div.setAttribute("class", "notice-group");

    // body容器下 默认为fix
    if (target === document.body) {
      div.style.position = "fixed";
    }

    target.appendChild(div);
    const ref = createRef();
    ReactDOM.render(<AlertGroup ref={ref} />, div, () => {
      group = ref.current;
      alertGroup.set(target, group);
      add(group);
    });
  } else {
    add(group);
  }
}

export default {
  success: (info, time = 3000, target) => alert(info, time, "success", target),
  error: (info, time = 9000, target) => alert(info, time, "error", target),
  warning: (info, time = 3000, target) => alert(info, time, "warning", target)
};
