/**
 * 处理节点属性的函数
 * @param {HTMLElement} node - 要处理的 DOM 节点
 * @param {Object} vm - 视图模型对象
 * @param {string} exp - 表达式，用于从 vm 中获取值
 * @param {string} dir - 指令名称
 * @param {Function} updaterFn - 更新节点属性的函数
 */
export function attributeHandler(node, vm, exp, dir, updaterFn) {
  updaterFn(node, vm[exp], '', dir);
}