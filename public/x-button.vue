<template>
    <div>
        我是子元素
    </div>
    <button class="btn" @click="click">{{ title }}</button>
    
</template>
<script>
export default {
    data: {
        title: '我是子元素',
    },
    methods: {
        click(e) {
            console.log(this)
            this.title = '我是子元素2';
        },
    },
}
</script>

<style>
.btn {
    background-color: rgb(69, 147, 216);
    transform: scale(0.9);
    transition: all .3s ease;
}
</style>