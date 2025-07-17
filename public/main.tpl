<template>
  <div class="app">
    <h1>双向绑定示例 {{ message }}</h1>
    <h4>{{ text }}</h4>
    <x-form></x-form>
    <x-table></x-table>
  </div>
</template>
<script>
  export default {
    data: {
      text: 'A good day',
    },
    components: {
      'x-table': 'table',
      'x-form': 'form',
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

  button:focus {
    outline: 2px solid var(--primary-color);
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color 0.3s;
  }

  a:hover {
    color: #369f6d;
  }

  a:focus {
    outline: 2px solid var(--primary-color);
    color: var(--primary-color);
  }
</style>