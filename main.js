import Binding from './src/Binding.js';

const app = new Binding({
    el: '#app',
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
            this.$data.count++;
        },
        reduce() {
            this.$data.count--;
        },
        changeMessage() {
            if (this.$data.message === 'Message changed!') {
                this.$data.message = 'Hello, Vue!';
                return;
            }
            this.$data.message = 'Message changed!';
        },
        onChange(e) {
            console.log('onChange', e);
        },

    }
});

window.app = app
