import express from 'express';
import models from './src/models/index.js';

const { Employer } = models;

const app = express();
const PORT = 3000;

// '/employers' 경로로 Employer 데이터 조회
app.get('/employers', async (req, res) => {
    try {
        const employers = await Employer.findAll();
        res.json(employers);  // 조회된 데이터를 JSON 형식으로 반환
    } catch (err) {
        console.error('Employer 조회 실패:', err);
        res.status(500).send('서버 오류');
    }
});

app.get('/', (req, res) => {
    res.send('Hello, Node.js!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
