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
</style>