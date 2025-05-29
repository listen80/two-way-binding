// 响应式处理函数
import Dep from './Dep.js';

function defineReactive(obj, key, val) {
    const dep = new Dep();
    observe(val); // 递归处理嵌套对象
    Object.defineProperty(obj, key, { enumerable: true, configurable: true, get() {
            if (Dep.target) {
                dep.addSub(Dep.target);
            }
            return val;
        }, set(newVal) {
            if (newVal === val) {
                return;
            }
            val = newVal;
            dep.notify(); // 触发更新
        }
    });
}

function observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    Object.keys(data).forEach(key => {
        defineReactive(data, key, data[key]);
    });
}

// 假设 defineReactive 函数在 Vue.js 中，这里需要导入或者重新定义
// 暂时先假设已经导入，实际使用时需要处理

export default observe;