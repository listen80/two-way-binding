<template>
    <div>
        <h2>我是子元素 <button class="btn" @click="click">{{ title }}</button> </h2>
        <table border="1">
            <thead>
                <tr>
                    <th>姓名</th>
                    <th>年龄</th>
                    <th>职业</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>张三</td>
                    <td>25</td>
                    <td>前端开发</td>
                </tr>
                <tr $if="show">
                    <td>李四</td>
                    <td>30</td>
                    <td>后端开发</td>
                </tr>
                <tr>
                    <td>王五</td>
                    <td>28</td>
                    <td>UI设计师</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    data: {
        title: '显示',
        show: true,
    },
    methods: {
        click(e) {
            if (this.title === '显示') {
                this.title = '隐藏';
                this.show = false;
            } else {
                this.title = '显示';
                this.show = true;
            }
        },
    },
}
</script>

<style>
table {
    width: 100%;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
    margin-bottom: 20px;
}

th,
td {
    padding: 12px 15px;
    text-align: left;
    border: 1px solid #ddd;
}

th {
    background-color: #f2f2f2;
    font-weight: bold;
}

tr:nth-child(even) {
    background-color: #f9f9f9;
}

tr:hover {
    background-color: #f1f1f1;
}
</style>