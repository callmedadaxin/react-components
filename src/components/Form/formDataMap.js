import set from "lodash/set";

export default class {
  data = {};
  set(key, val) {
    set(this.data, key, val);
  }
  get() {
    return this.data;
  }
}
