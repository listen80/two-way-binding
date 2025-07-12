<template>
    <div class="app">
        <ol>
            <li>
                <span>类型</span>
                <span>值</span>
                <span>元素</span>
            </li>
            <li>
                <span>文本/事件</span>
                <span>{{ count }}</span>
                <div>
                    <button @click="add">add</button>
                    <button @click="reduce">reduce</button>
                </div>
            </li>
            <li>
                <span>属性(a标签)</span>
                <span>{{ href }}</span>
                <a :href="href">{{ href }}</a>
            </li>
            <li>
                <span>input</span>
                <span>{{ message }}</span>
                <input type="text" $model="message">
            </li>
            <li>
                <span>textarea</span>
                <span>{{ message }}</span>
                <textarea $model="message"></textarea>
            </li>
            <li>
                <span>number</span>
                <span>{{ number }}</span>
                <input type="number" $model="number">
            </li>
            <li>
                <span>color</span>
                <span>{{ color }}</span>
                <input type="color" $model="color">
            </li>
            <li>
                <span>select</span>
                <span>{{ select }}</span>
                <select $model="select">
                    <option value="22">22</option>
                    <option value="223">223</option>
                    <option value="224">224</option>
                </select>
            </li>
            <li>
                <span>checkbox</span>
                <span>{{ checkbox }}</span>
                <div>
                    <input type="checkbox" $model="checkbox">
                    <input type="checkbox" $model="checkbox">
                    <input type="checkbox" $model="checkbox">
                    <input type="checkbox" $model="checkbox">
                </div>
            </li>
            <li>
                <span>radio</span>
                <span>{{ radio }}</span>
                <div>
                    <input type="radio" name="radio" value="1" $model="radio">
                    <input type="radio" name="radio" value="2" $model="radio">
                    <input type="radio" name="radio" value="3" $model="radio">
                </div>
            </li>
            <x-button>点我</x-button>
        </ol>
    </div>
</template>
<script>
export default {
    data: {
        count: 0,
        message: 'Hello, World!',
        href: './?' + Date.now(),
        number: 33,
        title: 'This is a title',
        myTitle: 'This is a aaa aaa bb ',
        sss: 'This is a sss',
        checkbox: false,
        select: '223',
        radio: 'option1',
        text: 'just a simple text',
        color: '#f3c'
    },
    methods: {
        add() {
            console.log(this)
            this.count++;
        },
        reduce() {
            this.count--;
        },
        changeMessage() {
            if (this.message === 'Message changed!') {
                this.message = 'Hello, Vue!';
                return;
            }
            this.message = 'Message changed!';
        },
        onChange(e) {
            console.log('onChange', e);
        },

    },
    components: {
        'x-button': './public/x-button.vue'
    }
}
</script>

<style>
.app {
    background-color: white;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    padding: 30px;
    width: 100%;
    max-width: 800px;
    margin: 20px;
}

ol {
    list-style-type: none;
    padding: 0;
}

li {
    padding: 20px;
    margin-bottom: 20px;
    background-color: var(--secondary-color);
    border-radius: var(--border-radius);
    transition: transform 0.2s;
    display: flex;
    /* 使用 flex 布局 */
    align-items: center;
    /* 垂直居中对齐 */
    gap: 10px;
    word-break: break-all;
}

li:hover {
    transform: translateY(-3px);
}

/* 为 li 下的子元素设置宽度 */
li>* {
    flex: 0 0 20%;
    /* 前两个元素宽度 20% */
}

li> :last-child {
    /* flex: 0 0 60%; 最后一个元素宽度 60% */
}

button {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #369f6d;
}

a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color 0.3s;
}

a:hover {
    color: #369f6d;
}

input[type="text"],
input[type="color"],
textarea,
select {
    /* padding: 10px; */
    border: 1px solid #8fd;
    border-radius: var(--border-radius);
    width: 100%;
    /* 修改为 100% 以适应父容器 */
    margin-top: 5px;
}

input[type="checkbox"],
input[type="radio"] {
    margin-left: 10px;
}

p {
    margin-top: 10px;
    min-height: 20px;
    padding: 10px;
    background-color: var(--secondary-color);
    border-radius: var(--border-radius);
}
</style>