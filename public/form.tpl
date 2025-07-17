<template>
  <h2>Form - 子元素</h2>
  <form action="javascript:void(0);">
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
  </form>
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
  ol {
    padding: 0;
  }

  li {
    padding: 20px;
    margin-bottom: 20px;
    background-color: var(--secondary-color);
    border-radius: var(--border-radius);
    transition: transform 0.2s;
    display: flex;
    align-items: center;
    gap: 10px;
    word-break: break-all;
  }

  li:hover {
    transform: scale(1.03);
  }

  li>* {
    flex: 0 0 20%;
  }

  input,
  textarea,
  select {
    border: 2px solid rgb(13, 249, 96);
    border-radius: var(--border-radius);
    padding: 2px;
    min-width: 200px;
  }

  input:focus,
  textarea:focus,
  select:focus {
    outline: 2px solid var(--primary-color);
    border-color: var(--primary-color);
  }

  input[type="checkbox"],
  input[type="radio"] {
    margin-left: 12px;
    width: 18px;
    /* 增大尺寸 */
    height: 18px;
    /* 增大尺寸 */
    cursor: pointer;
    /* 改变鼠标指针 */
    min-width: auto;
  }
</style>