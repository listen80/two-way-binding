<template>
  <h2>Form - 子元素</h2>
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
      <span>if</span>
      <span>{{ message }}</span>
      <a $if="message">我在呢</a>
    </li>
    <li>
      <span>show</span>
      <span>{{ message }}</span>
      <a $show="message">我在呢</a>
    </li>
    <li>
      <span>for</span>
      <span>{{ count }}</span>
      <div>
        <div $for="count">
          <a href="https://www.baidu.com">我是一个重复元素</a>
        </div>
      </div>
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
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
    </li>
    <li>
      <span>checkbox</span>
      <span>{{ checkbox }}</span>
      <div>
        <input type="checkbox" value="1" $model="checkbox">
        <input type="checkbox" value="2" $model="checkbox">
        <input type="checkbox" value="3" $model="checkbox">
        <input type="checkbox" value="4" $model="checkbox">
      </div>
    </li>
    <li>
      <span>radio</span>
      <span>{{ radio }}</span>
      <div>
        <input type="radio" value="1" $model="radio">
        <input type="radio" value="2" $model="radio">
        <input type="radio" value="3" $model="radio">
      </div>
    </li>
  </ol>
  <button class="btn" @click="clear">赋值</button>
  <button class="btn" @click="selectAll">全选</button>
</template>
<script>
  export default {
    data: {
      count: 2,
      message: 'Hello, World!',
      href: './?' + Date.now(),
      number: '33',
      color: '#168128',
      select: '1',
      checkbox: ["1", "3"],
      radio: '1',
    },
    methods: {
      add() {
        this.count++;
      },
      reduce() {
        this.count--;
      },
      changeMessage() {
        if (this.message === 'Message changed!') {
          this.message = 'Hello, Demo!';
          return;
        }
        this.message = 'Message changed!';
      },
      onChange(e) {
        console.log('onChange', e);
      },
      clear() {
        this.message = 'clear';
        this.number = '99';
        this.color = '#3f51b5';
        this.select = '';
        this.checkbox = [];
        this.radio = '';
        this.href = './?' + Date.now();
        this.count = 5
      },
      selectAll() {
        this.checkbox = ['1', '2', '3', '4'];
      }
    },
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
    /* list-style-type: none; */
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
    transform: scale(1.03);
  }

  li>* {
    flex: 0 0 20%;
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
  input[type="color"] {

    border: 1px solid #8fd;
    border-radius: var(--border-radius);
    width: 100%;
  }

  textarea,
  select {
    padding: 10px;
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