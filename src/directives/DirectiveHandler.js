
/**
 * 处理 `model` 指令，实现双向数据绑定
 * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} node - 要处理的表单元素
 * @param {object} vm - 视图模型实例
 * @param {string} exp - 表达式
 */
// 定义特殊输入类型的数组，这些类型在处理 model 指令时会有特定逻辑
const specialTypes = [
    'checkbox', 'radio', 'select-one'
];

const inputTypes = [
    'text', 'password', 'email', 'tel', 'url', 'number', 'range', 'date', 'datetime-local', 'month', 'week', 'time', 'color', 'search', 'image', 'textarea',
    'select-multiple', 'select-one', 'select'
]

export const directiveHandler = (node, vm, exp, dir) => {
    directiveHandlerFuncs[dir]?.(node, vm, exp);
}

// 导出指令对象，包含 model 和 if 指令的处理函数
export const directiveHandlerFuncs = {
    /**
     * 处理 model 指令，实现表单元素与视图模型数据的双向绑定
     * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} node - 要处理的表单元素
     * @param {object} vm - 视图模型实例
     * @param {string} exp - 表达式，用于指定视图模型中的数据属性
     */
    model(node, vm, exp) {
        // 调用 update 函数更新节点，传入节点、视图模型、表达式和指令类型
        // update(node, vm, exp, 'model');
        // 如果节点类型属于特殊类型，监听 change 事件
        if (inputTypes.includes(node.type)) {
            node.addEventListener('input', (e) => {
                // 当输入事件触发时，将表单元素的当前值赋值给视图模型中的对应属性
                vm[exp] = e.target.value;
            });
        } else if (specialTypes.includes(node.type)) {
            node.addEventListener('change', (e) => {
                // 当事件触发时，将表单元素的 value 属性值赋值给视图模型中的对应属性
                if (node.type === 'checkbox') {
                    // if (!Array.isArray(vm[exp])) {
                    //     vm[exp] = [];
                    // }
                    if (vm[exp].includes(e.target.getAttribute('value'))) {
                        vm[exp].splice(vm[exp].indexOf(e.target.getAttribute('value')), 1);
                    } else {
                        vm[exp].push(e.target.getAttribute('value'));
                    }
                    vm[exp] = vm[exp].slice()
                } else if (node.type === 'radio') {
                    vm[exp] = e.target.value;
                } else if (node.type === 'select') {
                    vm[exp] = e.target.value;
                }
            });
        }
        // 如果节点类型为 text，监听 input 事件

        // 处理不支持的输入类型，输出警告信息
        else {
            console.warn(`Unsupported input type: ${node.type}`);
        }
    },
    /**
     * 处理 if 指令，根据表达式的值决定节点的显示与隐藏
     * @param {HTMLElement} node - 要处理的节点
     * @param {object} vm - 视图模型实例
     * @param {string} exp - 表达式，用于判断节点是否显示
     */
    if(node, vm, exp) {
        node.parentNode.__if__ = node;
    },
    for(node, vm, exp) {
        for (let i = 0; i < Number(exp); i++) {
            node.parentNode.appendChild(node.cloneNode(true));
        }
    }
}