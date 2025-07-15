/**
 * 处理事件指令，为元素添加事件监听器
 * @param {HTMLElement} node - 要添加事件监听器的元素节点
 * @param {object} vm - 视图模型实例
 * @param {string} exp - 方法名
 * @param {string} dir - 事件类型
 */
export function eventHandler(node, vm, exp, dir, methods) {
    const fn = methods[exp];
    if (fn && dir) {
        node.addEventListener(dir, fn.bind(vm));
    }
}