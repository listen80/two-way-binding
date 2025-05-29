import { node2Fragment } from './NodeConverter.js';
import { compile } from './NodeCompiler.js';

/**
 * Compile 类，用于将模板中的指令和表达式编译成可执行的 DOM 操作
 */
export default class Compile {
    /**
     * 构造函数，初始化编译器
     * @param {string|HTMLElement} el - 要编译的 DOM 元素或选择器
     * @param {object} vm - 视图模型实例
     */
    constructor(el, vm) {
        this.$vm = vm;
        this.$el = document.querySelector(el);
        if (this.$el) {
            this.$fragment = node2Fragment(this.$el);
            compile(this.$fragment, this.$vm);
            this.$el.appendChild(this.$fragment);
        }
    }
}
