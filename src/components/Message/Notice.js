import React, { useEffect, Component } from "react";
import Icon from "../Icon";
import cx from "classnames";

import alertIcon from "./images/alert.svg";
import errorIcon from "./images/fail.svg";
import successIcon from "./images/success.svg";

const typeMap = {
  success: successIcon,
  error: errorIcon,
  warning: alertIcon
};

export default class Notice extends Component {
  componentDidMount = () => {
    const { onEnd, time = 3000 } = this.props;
    setTimeout(onEnd, time);
  };

  render() {
    const { type = "warning", content } = this.props;

    const icon = typeMap[type];

    const cls = cx("notice", type);

    return (
      <div className={cls}>
        <Icon link={icon} className="notice-icon" />
        {content}
      </div>
    );
  }
}
