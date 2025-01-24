// 모듈 및 설정 파일 임포트
import express from 'express';
import http from 'http'; // HTTP 서버 생성 모듈
import dotenv from 'dotenv';
import bodyParser from 'body-parser'; // 요청 본문 처리
import connectMongoDB from './src/config/mongoDB.js';
import { configureSocket } from './src/socket/socketIoConfig.js'; // WebSocket 설정
import corsConfig from "./src/security/CustomSecurityConfig.js"; // CORS 설정

// 라우터
import employerRoutes from "./src/routes/employerRoutes.js";
import chatRoomRoutes from './src/routes/ChatRoomRoutes.js';
import ChatRoutes from './src/routes/ChatRoutes.js';
import mapRoutes from './src/routes/MapRoutes.js';

// 환경 변수 로드
dotenv.config();

// MongoDB 연결
connectMongoDB();

// Express 애플리케이션 및 서버 생성
const app = express();
const server = http.createServer(app);
const io = configureSocket(server); // WebSocket 설정

// 서버 설정
const PORT = 3000;

// 미들웨어
app.use(bodyParser.json()); // JSON 형식 요청 본문 처리
app.use(express.json());    // Express JSON 처리
app.use(corsConfig);        // CORS 설정

// 라우터 연결
app.use('/employer/api/v1/login', employerRoutes);
app.use('/employer/api/v1/chatmessage', ChatRoutes(io));
app.use('/employer/api/v1/chatroom', chatRoomRoutes);
app.use('/api/map', mapRoutes);

// 서버 시작
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});