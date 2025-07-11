
import compile from './Compile.js';
import observe from './Observe.js';
import { loadComponent } from '../utils/get.js';

export default class Binding {
    constructor({ component, el, props = {} }) {

        if (!component) {
            throw new Error('component is required');
        }
        if (typeof component === 'string') {
            component = loadComponent(component)
        }

        const { script, template, style } = component
        // 1. 获取的ES6代码是模
        const es6ModuleCode = script.textContent;

        // 2. 将代码转为blob URL（模拟模块文件）
        const blob = new Blob([es6ModuleCode], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        // 动态import 默认是异步的，无法直接同步执行。若要实现类似同步的效果，可以使用 async/await 语法，但需在 async 函数环境中使用。

        // 3. 用动态import()加载该模块
        import(url).then(module => {
            document.body.append(style)
            // console.log(module.default); // 输出 'ES6 Module'
            const data = module.default.data || {};
            const methods = module.default.methods || {};
            const components = module.default.components || {};
            Object.assign(this, props, data);
            observe(this);
            // this.data = data
            compile(template, this, methods, components);
            // 终于明白这里为什么是replace
            el.replaceWith(template)
        }).catch(err => {
            console.error('加载模块失败', err);
        });
        // this.$el = document.querySelector(options.el);
        // // 对数据进行响应式处理
        // // 编译模板
    }
};