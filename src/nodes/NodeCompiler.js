import { isDirective, isEventDirective, isAttributDirective } from '../directives/DirectiveUtils.js';
import { eventHandler } from '../events/EventBinder.js';
import { directiveHandler } from '../directives/DirectiveHandler.js';
import Binding from '../core/Binding.js';
import { update } from '../utils/Updater.js';
/**
 * 将 DOM 元素转换为文档片段
 * @param {HTMLElement} el - 要转换的 DOM 元素
 * @returns {DocumentFragment} - 转换后的文档片段
/**
 * 编译文档片段或 DOM 节点
 * @param {Node} el - 要编译的节点
 * @param {object} vm - 视图模型实例
 */
export function compilerNode(el, vm, methods, components) {
    const childNodes = el.childNodes;

    Array.from(childNodes).forEach(node => {
        if (node.nodeType === 1) {
            if (node.tagName.includes('-')) {
                // console.log(node.tagName)
                const comment = document.createComment('');
                node.replaceWith(comment)
                try {
                    const component = node.tagName.toLowerCase();
                    new Binding({ component: components[component], el: comment })

                } catch (error) {
                    console.log(error)
                }
            } else {
                compileElement(node, vm, methods, components);

            }
        } else if (node.nodeType === 3) {
            compileText(node, vm);
        }
        if (node.childNodes && node.childNodes.length) {
            compilerNode(node, vm, methods, components);

        }
    });
}

/**
 * 编译元素节点，处理元素的属性
 * @param {HTMLElement} node - 要编译的元素节点
 * @param {object} vm - 视图模型实例
 */
export function compileElement(node, vm, methods) {

    const attrs = node.attributes;
    Array.from(attrs).forEach(attr => {
        const attrName = attr.name;
        const exp = attr.value;
        const dir = attrName.substring(1);
        if (isDirective(attrName)) {
            directiveHandler(node, vm, exp, dir)
            update(node, vm, exp, dir);
        } else if (isAttributDirective(attrName)) {
            update(node, vm, exp, 'attribute', dir);
        } else if (isEventDirective(attrName)) {
            eventHandler(node, vm, exp, dir, methods);
        }
    });
}

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