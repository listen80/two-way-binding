import { node2Fragment } from '../nodes/NodeConverter.js';
import { compilerNode } from '../nodes/NodeCompiler.js';


/**
 * 构造函数，初始化编译器
 * @param {string|HTMLElement} el - 要编译的 DOM 元素或选择器
 * @param {object} vm - 视图模型实例
 */
export default function compile(el, vm) {
    if (el) {
        let $fragment = node2Fragment(el);
        compilerNode($fragment, vm);
        el.appendChild($fragment);
    }
}
