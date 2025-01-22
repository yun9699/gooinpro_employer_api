import express from 'express';
import models from './models/index.js';
import mapRoutes from './routes/mapRoutes.js';

const { Employer } = models;

const app = express();
const PORT = 3000;

// 미들웨어 설정
app.use(express.json());

// 라우터 연결
app.use('/api/map', mapRoutes);  // 추가

// 기존 라우트들
app.get('/employers', async (req, res) => {
    try {
        const employers = await Employer.findAll();
        res.json(employers);
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
