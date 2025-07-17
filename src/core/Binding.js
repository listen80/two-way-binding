import compile from './Compile.js';
import observe from './Observe.js';
import { loadComponent } from '../utils/get.js';

/**
 * Binding 类用于实现双向绑定功能，初始化组件并处理组件的加载和渲染
 */
export default class Binding {
    /**
     * 构造函数，初始化 Binding 实例
     * @param {Object} options - 配置选项
     * @param {HTMLElement} options.el - 要替换的 DOM 元素
     * @param {Object} options.props - 传入的属性
     * @param {string} options.component - 组件路径
     */
    constructor(options) {
        // 定义不可变的 options 属性，存储配置选项
        Object.defineProperty(this, 'options', {
            value: options,
            writable: false,
            enumerable: false,
            configurable: false
        })
        // 从配置选项中解构出组件路径
        let { component } = this.options

        // 处理组件路径
        const suffix = '.tpl'
        if (!component.includes(suffix)) {
            component = component + suffix
        }
        // 加载组件相关属性
        const componentProperties = loadComponent(component)
        // 定义不可变的 componentProperties 属性，存储组件相关属性
        Object.defineProperty(this, 'componentProperties', {
            value: componentProperties,
            writable: false,
            enumerable: false,
            configurable: false
        })
        // 调用 create 方法创建组件
        this.create()
    }
    /**
     * 创建组件，加载组件脚本、样式和模板，并进行渲染
     */
    create() {
        // 从配置选项中解构出目标元素和属性
        const { el, props = {} } = this.options
        // 从组件属性中解构出脚本、模板和样式
        const { script, template, style } = this.componentProperties
        // 1. 获取的ES6代码是模
        // 获取脚本标签中的 ES6 模块代码
        const es6ModuleCode = script.textContent;

        // 2. 将代码转为blob URL（模拟模块文件）
        // 创建一个包含 ES6 模块代码的 Blob 对象
        const blob = new Blob([es6ModuleCode], { type: 'text/javascript' });
        // 为 Blob 对象创建一个 URL
        const url = URL.createObjectURL(blob);

        // 3. 用动态import()加载该模块
        // 动态导入模块
        import(url).then(module => {
            // 将样式添加到文档中
            document.body.append(style)
            // console.log(module.default); // 输出 'ES6 Module'
            // 获取模块中的数据，若不存在则使用空对象
            const data = module.default.data || {};
            // 获取模块中的方法，若不存在则使用空对象
            const methods = module.default.methods || {};
            // 获取模块中的子组件，若不存在则使用空对象
            const components = module.default.components || {};
            // 将属性和数据合并到当前实例
            Object.assign(this, props, data);
            // 对当前实例进行数据观测
            observe(this);
            // this.data = data
            // 编译模板并渲染
            compile(template, this, methods, components);
            // 终于明白这里为什么是replace
            // 用模板替换目标元素
            el.replaceWith(template)
        }).catch(err => {
            // 捕获模块加载失败的错误并打印
            console.error('加载模块失败', err);
        });
    }
    /**
     * 销毁组件，当前为空实现，可根据需求添加销毁逻辑
     */
    destroy() {
        //
    }
};