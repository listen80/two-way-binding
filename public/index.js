/**
 * 判断属性是否为数据指令
 * @param {string} attr - 属性名
 * @returns {boolean} - 是否为数据指令
 */
function isAttributeDirective(attr) {
  return attr[0] === ':';
}

/**
 * 判断属性是否为自定义指令
 * @param {string} attr - 属性名
 * @returns {boolean} - 是否为自定义指令
 */
function isDirective(attr) {
  return attr[0] === '$';
}

/**
 * 判断属性是否为事件指令
 * @param {string} attr - 属性名
 * @returns {boolean} - 是否为事件指令
 */
function isEventDirective(attr) {
  return attr[0] === '@';
}

/**
 * 处理事件指令，为元素添加事件监听器
 * @param {HTMLElement} node - 要添加事件监听器的元素节点
 * @param {object} vm - 视图模型实例
 * @param {string} exp - 方法名
 * @param {string} dir - 事件类型
 */
function eventHandler(node, vm, exp, dir, methods) {
  const fn = methods[exp];
  if (fn && dir) {
    node.addEventListener(dir, fn.bind(vm));
  }
}

/**
 * 处理 `model` 指令，实现双向数据绑定
 * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} node - 要处理的表单元素
 * @param {object} vm - 视图模型实例
 * @param {string} exp - 表达式
 */
// 定义特殊输入类型的数组，这些类型在处理 model 指令时会有特定逻辑
const specialTypes = ['checkbox', 'radio', 'select-one'];

// 定义普通输入类型的数组，这些类型在处理 model 指令时监听 input 事件
const inputTypes = ['text', 'password', 'email', 'tel', 'url', 'number', 'range', 'date', 'datetime-local', 'month', 'week', 'time', 'color', 'search', 'image', 'textarea', 'select-multiple', 'select-one', 'select'];

/**
 * 指令处理器，根据指令类型调用对应的处理函数
 * @param {HTMLElement} node - 要处理的节点
 * @param {object} vm - 视图模型实例
 * @param {string} exp - 表达式
 * @param {string} dir - 指令类型
 */
const directiveHandler = (node, vm, exp, dir) => {
  directiveHandlerFuncs[dir]?.(node, vm, exp);
};

// 导出指令对象，包含 model、if 和 for 指令的处理函数
const directiveHandlerFuncs = {
  /**
   * 处理 model 指令，实现表单元素与视图模型数据的双向绑定
   * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} node - 要处理的表单元素
   * @param {object} vm - 视图模型实例
   * @param {string} exp - 表达式，用于指定视图模型中的数据属性
   */
  model(node, vm, exp) {
    // 调用 update 函数更新节点，传入节点、视图模型、表达式和指令类型
    // update(node, vm, exp, 'model');
    // 如果节点类型属于普通输入类型，监听 input 事件
    if (inputTypes.includes(node.type)) {
      node.addEventListener('input', e => {
        // 当输入事件触发时，将表单元素的当前值赋值给视图模型中的对应属性
        vm[exp] = e.target.value;
      });
    }
    // 如果节点类型属于特殊类型，监听 change 事件
    else if (specialTypes.includes(node.type)) {
      node.addEventListener('change', e => {
        // 当事件触发时，根据不同类型处理表单元素的值并赋值给视图模型中的对应属性
        if (node.type === 'checkbox') {
          // if (!Array.isArray(vm[exp])) {
          //     vm[exp] = [];
          // }
          // 若当前值已存在于数组中则移除，否则添加
          if (vm[exp].includes(e.target.getAttribute('value'))) {
            vm[exp].splice(vm[exp].indexOf(e.target.getAttribute('value')), 1);
          } else {
            vm[exp].push(e.target.getAttribute('value'));
          }
          // 创建新数组，触发数据更新
          vm[exp] = vm[exp].slice();
        } else if (node.type === 'radio') {
          // 单选框直接赋值当前值
          vm[exp] = e.target.value;
        } else if (node.type === 'select-one') {
          // 单选下拉框直接赋值当前值
          vm[exp] = e.target.value;
        }
      });
    }
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
    // 将节点存储在父节点的 __if__ 属性上，便于后续处理
    node.__if__ = document.createComment('if');
  },
  /**
   * 处理 for 指令，根据表达式的值复制节点
   * @param {HTMLElement} node - 要处理的节点
   * @param {object} vm - 视图模型实例
   * @param {string} exp - 表达式，指定复制次数
   */
  for(node, vm, exp) {
    node.__for__ = document.createComment('for');
    node.replaceWith(node.__for__);
  }
};

// 依赖收集器
class Dep {
  constructor() {
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  notify() {
    this.subs.forEach(sub => sub.update());
  }
}
Dep.target = null;

class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    this.expOrFn = expOrFn;
    this.cb = cb;
    this.value = this.get();
  }
  get() {
    Dep.target = this;
    const value = this.vm[this.expOrFn];
    Dep.target = null;
    return value;
  }
  update() {
    const oldValue = this.value;
    this.value = this.vm[this.expOrFn];
    this.cb.call(this.vm, this.value, oldValue);
  }
}

// 该引用可能需要调整，Watcher.js 在 reactivity 目录下

/**
 * 更新节点内容并添加观察者
 * @param {Node} node - 要更新的节点
 * @param {object} vm - 视图模型实例
 * @param {string|function} exp - 表达式或更新函数
 * @param {string} dir - 指令类型
 * @param {string} [attr] - 属性名（可选）
 */

// 定义各种更新函数的对象
const updaters = {
  /**
   * 更新元素属性值
   * @param {HTMLElement} node - 要更新的元素节点
   * @param {any} value - 新的属性值
   * @param {string} attr - 属性名
   */
  // 此函数用于更新元素的指定属性值
  attribute(node, value, oldValue, attr) {
    if (value !== oldValue) {
      // 调用元素的 setAttribute 方法设置属性值
      node.setAttribute(attr, value || '');
    }
  },
  /**
   * 更新文本节点内容
   * @param {Text} node - 要更新的文本节点
   * @param {any} value - 新的文本内容
   */
  // 此函数用于更新文本节点的内容
  text(node, value) {
    // 设置文本节点的文本内容
    node.textContent = value;
  },
  /**
   * 更新表单元素的值
   * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} node - 要更新的表单元素
   * @param {any} value - 新的值
   */
  // 此函数用于更新表单元素的值
  model(node, value) {
    // 设置表单元素的值
    if (node.type === 'checkbox') {
      node.checked = value.includes(node.value);
    } else if (node.type === 'radio') {
      node.checked = value === node.value;
    } else {
      node.value = value;
    }
  },
  // 此函数用于根据条件显示或隐藏节点
  if(node, value, oldValue) {
    if (Boolean(value) === Boolean(oldValue)) {
      return;
    }
    if (value) {
      node.__if__.replaceWith(node);
    } else {
      node.replaceWith(node.__if__);
    }
  },
  for(node, value, oldValue) {
    let last = node.__for__;
    for (let i = 0; i < oldValue; i++) {
      last.nextElementSibling?.remove();
    }
    for (let i = 0; i < value; i++) {
      last.after(node.cloneNode(true));
    }
  },
  show(node, value, oldValue) {
    if (value !== oldValue) {
      value ? node.style.display = '' : node.style.display = 'none';
    }
  }
};

// 此函数的作用是更新节点内容，并且为节点添加观察者
// 当数据发生变化时，观察者会触发回调函数来更新节点
function update(node, vm, exp, dir, attr) {
  // 根据 exp 的类型确定更新函数
  const updaterFn = typeof dir === 'function' ? dir : updaters[`${dir}`];
  if (updaterFn) {
    // 调用更新函数更新节点内容
    const watcher = new Watcher(vm, exp, (value, oldValue) => {
      // 数据变化时调用更新函数更新节点
      updaterFn(node, value, oldValue, attr);
    });
    watcher.update();
  }
  // 创建一个新的观察者，当数据变化时触发回调更新节点
}

/**
 * 将 DOM 元素转换为文档片段
 * @param {HTMLElement} el - 要转换的 DOM 元素
 * @returns {DocumentFragment} - 转换后的文档片段
/**
 * 编译文档片段或 DOM 节点
 * @param {Node} el - 要编译的节点
 * @param {object} vm - 视图模型实例
 */
function compilerNode(el, vm, methods, components) {
  const childNodes = el.childNodes;
  Array.from(childNodes).forEach(node => {
    if (node.nodeType === 1) {
      if (node.tagName.includes('-')) {
        // console.log(node.tagName)
        const comment = document.createComment('');
        node.replaceWith(comment);
        try {
          const componentName = node.tagName.toLowerCase();
          new Binding({
            component: components[componentName],
            el: comment
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        compileElement(node, vm, methods);
      }
    } else if (node.nodeType === 3) {
      compileText(node, vm);
    }
    if (node.childNodes && node.childNodes.length) {
      compilerNode(node, vm, methods, components);
    }
  });
}

/**
 * 编译元素节点，处理元素的属性
 * @param {HTMLElement} node - 要编译的元素节点
 * @param {object} vm - 视图模型实例
 */
function compileElement(node, vm, methods) {
  const attrs = node.attributes;
  Array.from(attrs).forEach(attr => {
    const name = attr.name;
    const exp = attr.value;
    const dir = name.substring(1);
    if (isDirective(name)) {
      directiveHandler(node, vm, exp, dir);
      update(node, vm, exp, dir);
      node.removeAttribute(name);
    } else if (isAttributeDirective(name)) {
      update(node, vm, exp, 'attribute', dir);
      node.removeAttribute(name);
    } else if (isEventDirective(name)) {
      eventHandler(node, vm, exp, dir, methods);
      node.removeAttribute(name);
    }
  });
}

/**
 * 编译文本节点，处理文本中的插值表达式
 * @param {Text} node - 要编译的文本节点
 * @param {object} vm - 视图模型实例
 */
function compileText(node, vm) {
  const reg = /\{\{(.*)\}\}/g;
  const text = node.textContent;
  text.replace(reg, (match, p1) => {
    const exp = p1.trim();
    update(node, vm, exp, () => {
      node.textContent = text.replace(reg, (match, p1) => {
        return vm[p1.trim()] ?? '';
      });
    });
  });
}

function defineReactive(obj, key, val) {
  const dep = new Dep();
  observe(val); // 递归处理嵌套对象
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      if (Dep.target) {
        dep.addSub(Dep.target);
      }
      return val;
    },
    set(newVal) {
      if (newVal === val) {
        return;
      }
      val = newVal;
      dep.notify(); // 触发更新
    }
  });
}
function observe(data) {
  if (!data || typeof data !== 'object') {
    return;
  }
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key]);
  });
}

const parser = new DOMParser();
var DOMParser$1 = template => {
  const doc = parser.parseFromString(`<body>${template}</body>`, 'text/html');
  const body = doc.querySelector('body');
  return {
    template: body.querySelector('template')?.content,
    script: body.querySelector('script'),
    style: body.querySelector('style')
  };
};

function loadComponent(url) {
  const result = syncXmlHttpRequest(url);
  return DOMParser$1(result);
}
function syncXmlHttpRequest(url) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, false); // 第三个参数设为 false 表示同步请求
  xhr.send(null);
  if (xhr.status === 200) {
    return xhr.responseText;
  } else {
    throw new Error(`请求失败，状态码: ${xhr.status}`);
  }
}

/**
 * Binding 类用于实现双向绑定功能，初始化组件并处理组件的加载和渲染
 */
class Binding {
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
    });
    // 从配置选项中解构出组件路径
    let {
      component
    } = this.options;

    // 处理组件路径
    const suffix = '.tpl';
    if (!component.includes(suffix)) {
      component = component + suffix;
    }
    // 加载组件相关属性
    const componentProperties = loadComponent(component);
    // 定义不可变的 componentProperties 属性，存储组件相关属性
    Object.defineProperty(this, 'componentProperties', {
      value: componentProperties,
      writable: false,
      enumerable: false,
      configurable: false
    });
    // 调用 create 方法创建组件
    this.create();
  }
  /**
   * 创建组件，加载组件脚本、样式和模板，并进行渲染
   */
  create() {
    // 从配置选项中解构出目标元素和属性
    const {
      el,
      props = {}
    } = this.options;
    // 从组件属性中解构出脚本、模板和样式
    const {
      script,
      template,
      style
    } = this.componentProperties;
    // 1. 获取的ES6代码是模
    // 获取脚本标签中的 ES6 模块代码
    const es6ModuleCode = script.textContent;

    // 2. 将代码转为blob URL（模拟模块文件）
    // 创建一个包含 ES6 模块代码的 Blob 对象
    const blob = new Blob([es6ModuleCode], {
      type: 'text/javascript'
    });
    // 为 Blob 对象创建一个 URL
    const url = URL.createObjectURL(blob);

    // 3. 用动态import()加载该模块
    // 动态导入模块
    import(url).then(module => {
      // 将样式添加到文档中
      document.body.append(style);
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
      compilerNode(template, this, methods, components);
      // 终于明白这里为什么是replace
      // 用模板替换目标元素
      el.replaceWith(template);
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
}

export { Binding as default };
//# sourceMappingURL=index.js.map
