import Watcher from './Watcher.js';

/**
 * 更新节点内容并添加观察者
 * @param {Node} node - 要更新的节点
 * @param {object} vm - 视图模型实例
 * @param {string|function} exp - 表达式或更新函数
 * @param {string} dir - 指令类型
 * @param {string} [attr] - 属性名（可选）
 */
export function update(node, vm, exp, dir, attr) {
    const updaterFn = typeof exp === 'function' ? exp : updaters[`${dir}Updater`];
    if (updaterFn) {
        updaterFn(node, vm.$data[exp], attr);
    }
    new Watcher(vm, exp, (value) => {
        if (updaterFn) {
            updaterFn(node, value, attr);
        }
    });
}


const updaters = {
    /**
     * 更新元素属性值
     * @param {HTMLElement} node - 要更新的元素节点
     * @param {any} value - 新的属性值
     * @param {string} attr - 属性名
     */
    attributeUpdater(node, value, attr) {
        node.setAttribute(attr, value);
    },
    /**
     * 更新文本节点内容
     * @param {Text} node - 要更新的文本节点
     * @param {any} value - 新的文本内容
     */


    textUpdater(node, value) {
        node.textContent = value;
    },
    /**
     * 更新表单元素的值
     * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} node - 要更新的表单元素
     * @param {any} value - 新的值
     */

    modelUpdater(node, value) {
        node.value = value;
    }
}

