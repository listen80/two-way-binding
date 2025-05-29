import Watcher from './Watcher.js';
// 模板编译器
class Compile {
    constructor(el, vm) {
        this.$vm = vm;
        this.$el = document.querySelector(el);
        if (this.$el) {
            this.$fragment = this.node2Fragment(this.$el);
            this.compile(this.$fragment);
            this.$el.appendChild(this.$fragment);
        }
    }

    node2Fragment(el) {
        const fragment = document.createDocumentFragment();
        let child;
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    }

    compile(el) {
        const childNodes = el.childNodes;
        Array.from(childNodes).forEach(node => {
            if (this.isElementNode(node)) {
                this.compileElement(node);
            } else if (this.isTextNode(node)) {
                this.compileText(node);
            }
            if (node.childNodes && node.childNodes.length) {
                this.compile(node);
            }
        });
    }

    compileElement(node) {
        const attrs = node.attributes;
        Array.from(attrs).forEach(attr => {
            const attrName = attr.name;
            const exp = attr.value;
            if (this.isDirective(attrName)) {
                const dir = attrName.substring(1);
                this[dir] && this[dir](node, this.$vm, exp);
            } else if (this.isEventDirective(attrName)) {
                const dir = attrName.substring(1);
                this.eventHandler(node, this.$vm, exp, dir);
            } else if (this.isDataDirective(attrName)) {
                const attr = attrName.substring(1);
                this.update(node, this.$vm, exp, 'attribute', attr);
            }
        });
    }

    compileText(node) {
        const reg = /\{\{(.*)\}\}/;
        const text = node.textContent;
        if (reg.test(text)) {
            const exp = RegExp.$1.trim();
            this.update(node, this.$vm, exp, 'text');
        }
    }

    isDataDirective(attr) {
        return attr.indexOf('!') === 0;
    }

    isDirective(attr) {
        return attr.indexOf('$') === 0;
    }

    isEventDirective(dir) {
        return dir.indexOf('@') === 0;
    }

    isElementNode(node) {
        return node.nodeType === 1;
    }

    isTextNode(node) {
        return node.nodeType === 3;
    }

    update(node, vm, exp, dir, attr) {
        const updaterFn = typeof exp === 'function' ? exp : this[dir + 'Updater'];
        updaterFn && updaterFn(node, vm.$data[exp], attr);
        new Watcher(vm, exp, function (value) {
            updaterFn && updaterFn(node, value, attr);
        });
    }
    attributeUpdater(node, value, attr) {
        node.setAttribute(attr, value);
    }

    textUpdater(node, value, attr) {
        node.textContent = value;
    }

    modelUpdater(node, value) {
        node.value = value;
    }

    model(node, vm, exp) {
        this.update(node, vm, exp, 'model');
        // 定义一个包含需要判断的类型的数组
        const specialTypes = [
            'checkbox', 'radio', 'select', 'file', 'image', 'button',
            'submit', 'reset', 'color', 'date', 'datetime-local', 'email',
            'month', 'number', 'range', 'search', 'tel', 'time', 'url',
            'week', 'textarea', 'password', 'hidden'
        ];
        if (specialTypes.includes(node.type)) {
            node.addEventListener('change', e => {
                vm.$data[exp] = e.target.attributes.value.value;
                debugger
            });
            return;
        }
        node.addEventListener('input', e => {
            vm.$data[exp] = e.target.value;
        });
    }


    eventHandler(node, vm, exp, dir) {
        const fn = vm.$options.methods && vm.$options.methods[exp];
        if (fn && dir) {
            node.addEventListener(dir, fn.bind(vm));
        }
    }
}

export default Compile;