const express = require('express');
const app = express();

// 导入跨域 cors 全局挂载
const cors = require('cors');
app.use(cors());

// 处理表单数据中间件
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extend: false}));      // false 时值为数组或字符串，true 时可以为任意值
app.use(bodyParser.json());

app.listen(3007, () => {
    console.log('http://127.0.0.1:30071212');
})
