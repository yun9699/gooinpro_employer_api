const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3000;

// 데이터베이스 연결 모듈
require('./config/dbConnection');

// Morgan 로그 출력
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello, Node.js!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
