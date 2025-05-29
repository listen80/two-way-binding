
import compile from './core/Compile.js';
import observe from './core/Observe.js';

// 定义一个简单的 Vue 类
class Vue {
    constructor(options) {
        this.$options = options;
        this.$data = options.data;
        this.$el = document.querySelector(options.el);
        // 对数据进行响应式处理
        observe(this.$data);
        // 编译模板
        compile(this.$el, this);
    }
}

export default Vue;