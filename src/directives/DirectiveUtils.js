
/**
 * 判断属性是否为数据指令
 * @param {string} attr - 属性名
 * @returns {boolean} - 是否为数据指令
 */
export function isAttributDirective(attr) {
    return attr.indexOf(':') === 0;
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
 * @param {string} attr - 属性名
 * @returns {boolean} - 是否为事件指令
 */
export function isEventDirective(attr) {
    return attr.indexOf('@') === 0;
}

