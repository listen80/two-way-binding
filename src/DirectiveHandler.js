import { update } from './Updater.js';
import { eventHandler } from './EventBinder.js';
import { directives } from './Directives.js';
/**
 * 判断属性是否为数据指令
 * @param {string} attr - 属性名
 * @returns {boolean} - 是否为数据指令
 */
export function isDataDirective(attr) {
    return attr.indexOf('!') === 0;
}

/**
 * 判断属性是否为自定义指令
 * @param {string} attr - 属性名
 * @returns {boolean} - 是否为自定义指令
 */
export function isDirective(attr) {
    return attr.indexOf('$') === 0;
}

/**
 * 判断属性是否为事件指令
 * @param {string} dir - 属性名
 * @returns {boolean} - 是否为事件指令
 */
export function isEventDirective(dir) {
    return dir.indexOf('@') === 0;
}

/**
 * 编译元素节点，处理元素的属性
 * @param {HTMLElement} node - 要编译的元素节点
 * @param {object} vm - 视图模型实例
 */
export function compileElement(node, vm) {
    const attrs = node.attributes;
    Array.from(attrs).forEach(attr => {
        const attrName = attr.name;
        const exp = attr.value;
        debugger;
        if (isDirective(attrName)) {
            const dir = attrName.substring(1);
            const updateFn = directives[dir];
            if (updateFn) {
                updateFn(node, vm, exp);
            } else {
                console.warn(`Unknown directive: ${dir}`);
            }

        } else if (isEventDirective(attrName)) {
            const dir = attrName.substring(1);
            eventHandler(node, vm, exp, dir);
        } else if (isDataDirective(attrName)) {
            const attrKey = attrName.substring(1);
            update(node, vm, exp, 'attribute', attrKey);
        }
    });
}