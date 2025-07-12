import { node2Fragment } from '../nodes/NodeConverter.js';
import { compilerNode } from '../nodes/NodeCompiler.js';
import parserHTML from '../nodes/htmlParse.js';

/**
 * 构造函数，初始化编译器
 * @param {string|HTMLElement} el - 要编译的 DOM 元素或选择器
 * @param {object} vm - 视图模型实例
 */
export default function compile(template, vm, methods) {

    // let $fragment = node2Fragment(el);
    // debugger
    compilerNode(template, vm, methods);

    // el.appendChild(json);
}
