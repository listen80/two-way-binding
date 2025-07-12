import Dep from './Dep.js';

// 观察者
class Watcher {
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
        console.log('update', this);
        const oldValue = this.value;
        this.value = this.vm[this.expOrFn];
        this.cb.call(this.vm, this.value, oldValue);
    }
}

export default Watcher;