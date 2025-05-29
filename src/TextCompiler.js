import { update } from './Updater.js';

/**
 * 编译文本节点，处理文本中的插值表达式
 * @param {Text} node - 要编译的文本节点
 * @param {object} vm - 视图模型实例
 */
export function compileText(node, vm) {
    const reg = /\{\{(.*)\}\}/;
    const text = node.textContent;
    if (reg.test(text)) {
        const exp = RegExp.$1.trim();
        update(node, vm, exp, 'text');
    }
}