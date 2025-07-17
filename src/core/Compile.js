import { isCustomDirective, isEventDirective, isAttributeDirective } from '../utils/attr.js';
import { eventHandler } from '../directives/EventBinder.js';
import { directiveHandler } from '../directives/DirectiveHandler.js';
import { update } from '../directives/Updater.js';
import Binding from './Binding.js';

/**
 * 编译元素节点，处理元素的属性
 * @param {HTMLElement} node - 要编译的元素节点
 * @param {object} vm - 视图模型实例
 */
function compileElement(node, vm, methods) {
  const attrs = node.attributes;
  Array.from(attrs).forEach(attr => {
    const name = attr.name;
    const exp = attr.value;
    const dir = name.substring(1);

    if (isCustomDirective(name)) {
      directiveHandler(node, vm, exp, dir)
      update(node, vm, exp, dir);
      node.removeAttribute(name);
    } else if (isAttributeDirective(name)) {
      update(node, vm, exp, 'attribute', dir);
      node.removeAttribute(name);
    } else if (isEventDirective(name)) {
      eventHandler(node, vm, exp, dir, methods);
      node.removeAttribute(name);
    }
  });
}

/**
 * 编译文本节点，处理文本中的插值表达式
 * @param {Text} node - 要编译的文本节点
 * @param {object} vm - 视图模型实例
 */
function compileText(node, vm) {
  const reg = /\{\{(.*)\}\}/g;
  const text = node.textContent;

  text.replace(reg, (match, p1) => {
    const exp = p1.trim()
    update(node, vm, exp, () => {
      node.textContent = text.replace(reg, (match, p1) => {
        return vm[p1.trim()] ?? '';
      });
    });
  });
}

/**
 * 将 DOM 元素转换为文档片段
 * @param {HTMLElement} el - 要转换的 DOM 元素
 * @returns {DocumentFragment} - 转换后的文档片段
/**
 * 编译文档片段或 DOM 节点
 * @param {Node} el - 要编译的节点
 * @param {object} vm - 视图模型实例
 */
export default function compilerNode(el, vm, methods, components) {
  const childNodes = el.childNodes;

  Array.from(childNodes).forEach(node => {
    if (node.nodeType === 1) {
      if (node.tagName.includes('-')) {
        // console.log(node.tagName)
        const comment = document.createComment('');
        node.replaceWith(comment)
        try {
          const componentName = node.tagName.toLowerCase();
          new Binding({ component: components[componentName], el: comment })
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