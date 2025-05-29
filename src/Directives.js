import { update } from './Updater.js';

/**
     * 处理 `model` 指令，实现双向数据绑定
     * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} node - 要处理的表单元素
     * @param {object} vm - 视图模型实例
     * @param {string} exp - 表达式
     */
export const directives = {
    model(node, vm, exp) {
        update(node, vm, exp, 'model');
        const specialTypes = [
            'checkbox', 'radio', 'select', 'file', 'image', 'button',
            'submit', 'reset', 'color', 'date', 'datetime-local', 'email',
            'month', 'number', 'range', 'search', 'tel', 'time', 'url',
            'week', 'textarea', 'password', 'hidden'
        ];
        if (specialTypes.includes(node.type)) {
            node.addEventListener('change', (e) => {
                vm.$data[exp] = e.target.attributes.value.value;
                debugger;
            });
            return;
        }
        node.addEventListener('input', (e) => {
            vm.$data[exp] = e.target.value;
        });
    }
}