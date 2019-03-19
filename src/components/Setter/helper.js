import isObject from "lodash/isObject";
import isArray from "lodash/isArray";
import isFunc from "lodash/isFunction";

export class Dep {
  deps = new Set();

  listen(fn) {
    this.deps.add(fn);
  }

  fire() {
    this.deps.forEach(fn => isFunc(fn) && fn());
  }

  clear() {
    this.deps.clear();
  }

  remove(fn) {
    this.deps.delete(fn);
  }
}

export function observable(o, dep) {
  if (!isObject(o) && !isArray(o)) {
    return o;
  }

  return defineReactive(o, dep);
}

export function observe(fn, dep) {
  dep.listen(fn);
}

export function unobserve(fn, dep) {
  dep.remove(fn);
}

function defineReactive(obj, dep) {
  return new Proxy(obj, {
    get: (target, prop, receiver) => {
      if (prop in obj && prop !== "prototype") {
        return observable(Reflect.get(target, prop), dep);
      }
      return Reflect.get(target, prop, receiver);
    },

    set: (target, prop, value) => {
      const result = Reflect.set(target, prop, value);

      // 触发订阅
      dep.fire();

      return result;
    }
  });
}
