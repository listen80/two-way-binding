<template>
    <button class="btn">{{ title }}</button>
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
}
</script>

<style>
.btn {
    background-color: rgb(69, 147, 216);
}
</style>