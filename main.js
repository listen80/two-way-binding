import Vue from './src/Vue.js';

const app = new Vue({
    el: '#app',
    data: {
        message: 'Hello, Vue!',
        title: 'This is a title',
        mytitle: 'This is a mytitlemytitlemytitlemytitlemytitle',
        sss: 'This is a sss',
        checkbox: false,
        select: 'option1',
        radio: 'option1',
    },
    methods: {
        changeMessage() {
            if (this.$data.message === 'Message changed!') {
                this.$data.message = 'Hello, Vue!';
                return;
            }
            this.$data.message = 'Message changed!';
        },
        onChange(e) {
            console.log('onChange', e);
        }
    }
});

