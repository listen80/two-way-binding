import Dep from '../reactivity/Dep.js';

function defineReactive(obj, key, val) {
  const dep = new Dep();
  observe(val); // 递归处理嵌套对象
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      if (Dep.target) {
        dep.addSub(Dep.target);
      }
      return val;
    },
    set(newVal) {
      if (newVal === val) {
        return;
      }
      val = newVal;
      dep.notify(); // 触发更新
    }
  });
}

export default function observe(data) {
  if (!data || typeof data !== 'object') {
    return;
  }
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key]);
  });
};