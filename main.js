import Vue from './src/Vue.js';
import htmlParser from './src/nodes/htmlParse.js';

const app = new Vue({
    el: '#app',
    data: {
        message: 'Hello, Vue!',
        title: 'This is a title',
        myTitle: 'This is a aaa aaa bb ',
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
