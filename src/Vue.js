
import Compile from './Compile.js';
import observe from './Observe.js';

// 定义一个简单的 Vue 类
class Vue {
    constructor(options) {
        this.$options = options;
        this.$data = options.data;
        // 对数据进行响应式处理
        observe(this.$data);
        // 编译模板
        new Compile(options.el, this);
    }



}

export default Vue;