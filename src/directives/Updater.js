// 该引用可能需要调整，Watcher.js 在 reactivity 目录下
import Watcher from '../reactivity/Watcher.js';

/**
 * 更新节点内容并添加观察者
 * @param {Node} node - 要更新的节点
 * @param {object} vm - 视图模型实例
 * @param {string|function} exp - 表达式或更新函数
 * @param {string} dir - 指令类型
 * @param {string} [attr] - 属性名（可选）
 */


// 定义各种更新函数的对象
const updaters = {
    /**
     * 更新元素属性值
     * @param {HTMLElement} node - 要更新的元素节点
     * @param {any} value - 新的属性值
     * @param {string} attr - 属性名
     */
    // 此函数用于更新元素的指定属性值
    attribute(node, value, oldValue, attr) {
        if (value !== oldValue) {
            // 调用元素的 setAttribute 方法设置属性值
            node.setAttribute(attr, value || '');
        }
    },
    /**
     * 更新文本节点内容
     * @param {Text} node - 要更新的文本节点
     * @param {any} value - 新的文本内容
     */
    // 此函数用于更新文本节点的内容
    text(node, value) {
        // 设置文本节点的文本内容
        node.textContent = value;
    },
    /**
     * 更新表单元素的值
     * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} node - 要更新的表单元素
     * @param {any} value - 新的值
     */
    // 此函数用于更新表单元素的值
    model(node, value) {
        // 设置表单元素的值
        if (node.type === 'checkbox') {
            node.checked = value.includes(node.value);
        } else if (node.type === 'radio') {
            node.checked = value === node.value;
        } else {
            node.value = value;
        }
    },
    // 此函数用于根据条件显示或隐藏节点
    if(node, value, oldValue) {
        if (Boolean(value) === Boolean(oldValue)) {
            return
        }
        if (value) {
            node.__if__.replaceWith(node);
        } else {
            node.replaceWith(node.__if__);
        }
    },
    for(node, value, oldValue) {
        let last = node.__for__;
        for (let i = 0; i < oldValue; i++) {
            last.nextElementSibling?.remove()
        }
        for (let i = 0; i < value; i++) {
            last.after(node.cloneNode(true));
        }
    },
    show(node, value, oldValue) {
        if (value !== oldValue) {
            value ? node.style.display = '' : node.style.display = 'none';
        }
    },
}


// 此函数的作用是更新节点内容，并且为节点添加观察者
// 当数据发生变化时，观察者会触发回调函数来更新节点
export function update(node, vm, exp, dir, attr) {
    // 根据 exp 的类型确定更新函数
    const updaterFn = typeof dir === 'function' ? dir : updaters[`${dir}`];
    if (updaterFn) {
        // 调用更新函数更新节点内容
        const watcher = new Watcher(vm, exp, (value, oldValue) => {
            // 数据变化时调用更新函数更新节点
            updaterFn(node, value, oldValue, attr);
        });
        watcher.update()
    }
    // 创建一个新的观察者，当数据变化时触发回调更新节点
}
