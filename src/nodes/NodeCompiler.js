import { compileElement } from '../directives/DirectiveHandler.js';
import { compileText } from './TextCompiler.js';

/**
 * 编译文档片段或 DOM 节点
 * @param {Node} el - 要编译的节点
 * @param {object} vm - 视图模型实例
 */
export function compile(el, vm) {
    const childNodes = el.childNodes;
    Array.from(childNodes).forEach(node => {
        if (node.nodeType === 1) {
            compileElement(node, vm);
        } else if (node.nodeType === 3) {
            compileText(node, vm);
        }
        if (node.childNodes && node.childNodes.length) {
            compile(node, vm);
        }
    });
}