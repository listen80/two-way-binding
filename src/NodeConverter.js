/**
 * 将 DOM 元素转换为文档片段
 * @param {HTMLElement} el - 要转换的 DOM 元素
 * @returns {DocumentFragment} - 转换后的文档片段
 */
export function node2Fragment(el) {
    const fragment = document.createDocumentFragment();
    let child;
    while (child = el.firstChild) {
        fragment.appendChild(child);
    }
    return fragment;
}