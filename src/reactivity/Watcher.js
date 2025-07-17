import Dep from './Dep.js';

export default class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    this.expOrFn = expOrFn;
    this.cb = cb;
    this.value = this.get();
  }

  get() {
    Dep.target = this;
    const value = this.vm[this.expOrFn];
    Dep.target = null;
    return value;
  }

  update() {
    const oldValue = this.value;
    this.value = this.vm[this.expOrFn];
    this.cb.call(this.vm, this.value, oldValue);
  }
}
