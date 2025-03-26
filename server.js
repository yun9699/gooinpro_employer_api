import express from 'express';
import http from 'http'; // HTTP 서버 생성 모듈
import dotenv from 'dotenv';
import bodyParser from 'body-parser'; // 요청 본문 처리
import corsConfig from "./src/security/config/CustomSecurityConfig.js"; // CORS 설정
import path from 'path';
import fs from 'fs';

// 라우터
import mapRoutes from './src/routes/MapRoutes.js';
import EmployerLoginRoutes from "./src/routes/EmployerLoginRoutes.js";
import EmployerRoutes from "./src/routes/EmployerRoutes.js";
import JWTNotFilter from "./src/security/filter/JWTNotFilter.js";
import PartTimerRoutes from "./src/routes/PartTimerRoutes.js";
import JobPostingsRoutes from './src/routes/JobPostingsRoutes.js';
import CalendarRoutes from "./src/routes/CalendarRoutes.js";
import jobPostingImageRoutes from './src/routes/JobPostingImageRoutes.js';

// 환경 변수 로드
dotenv.config();

// Express 애플리케이션 및 서버 생성
const app = express();
const server = http.createServer(app);

// 서버 설정
const PORT = 3000;

// filterChain
const excludedPaths = ['/employer/api/v1/login'];

// 미들웨어
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); // JSON 형식 요청 본문 처리
app.use(express.json());    // Express JSON 처리
app.use(corsConfig);        // CORS 설정
// app.use(JWTCheckFilter(excludedPaths)); // jwtFilter 걸기
app.use(JWTNotFilter()); // 개발위해서 filter 제외

// 업로드 디렉토리 생성
app.use((req, res, next) => {
    const uploadDir = path.join(process.cwd(), 'uploads/jobpostings');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    next();
});

// 정적 파일 서빙 설정
app.use('/uploads/jobpostings', express.static('uploads/jobpostings'));

// 라우터 연결
app.use('/employer/api/v1/login', EmployerLoginRoutes);
app.use('/employer/api/v1/emp', EmployerRoutes);
app.use('/employer/api/map', mapRoutes);
app.use('/employer/api/v1/partTimer', PartTimerRoutes);
app.use('/employer/api/v1/jobposting', JobPostingsRoutes);
app.use('/employer/api/v1/calendar', CalendarRoutes);
app.use('/employer/api/jobpostings-images', jobPostingImageRoutes);

// 서버 시작
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

