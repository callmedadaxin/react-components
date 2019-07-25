import { setDefaultPortalSelector } from "./portalHelpers";

const handlers = {
  "defaultPortalSelector": fn => {
    if (typeof fn === "function") {
      setDefaultPortalSelector(fn);
    }
  }
};

export default (config) => {
  config = (config && typeof config === "object") ? config : {};
  for(let key in config) {
    if (config.hasOwnProperty(key) && handlers[key]) {
      handlers[key](config[key]);
    }
  }
};
