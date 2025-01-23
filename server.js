import express from 'express';
import models from './src/models/index.js';
import bodyParser from "body-parser";
import employerRoutes from "./src/routes/employerRoutes.js";
import corsConfig from "./src/security/CustomSecurityConfig.js";

const { Employer } = models;

const app = express();
const PORT = 3000;

// CORS 미들웨어 적용
app.use(corsConfig);

// JSON 요청 본문 처리
app.use(bodyParser.json());

// 라우트 설정
app.use('/employer/api/v1/login', employerRoutes);

// 기본 라우터 예시
app.get('/', (req, res) => {
    res.send('Hello, Node.js!');
});

// 서버 포트 설정
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});