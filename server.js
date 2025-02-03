import express from 'express';
import http from 'http'; // HTTP 서버 생성 모듈
import dotenv from 'dotenv';
import bodyParser from 'body-parser'; // 요청 본문 처리
import connectMongoDB from './src/config/mongoDB.js';
import { configureWebSocket } from './src/socket/socketConfig.js';  // WebSocket 설정 파일 임포트
import corsConfig from "./src/security/config/CustomSecurityConfig.js"; // CORS 설정

// 라우터
import chatRoomRoutes from './src/routes/ChatRoomRoutes.js';
import ChatRoutes from './src/routes/ChatRoutes.js';
import mapRoutes from './src/routes/MapRoutes.js';
import JWTCheckFilter from "./src/security/filter/JWTCheckFilter.js";
import EmployerLoginRoutes from "./src/routes/EmployerLoginRoutes.js";
import EmployerRoutes from "./src/routes/EmployerRoutes.js";
import JWTNotFilter from "./src/security/filter/JWTNotFilter.js";
import PartTimerRoutes from "./src/routes/PartTimerRoutes.js";

// 환경 변수 로드
dotenv.config();

// MongoDB 연결
connectMongoDB();

// Express 애플리케이션 및 서버 생성
const app = express();
const server = http.createServer(app);

// WebSocket 서버 설정
const wss = configureWebSocket(server);  // WebSocket 서버 설정 호출

// 서버 설정
const PORT = 3000;

// filterChain
const excludedPaths = ['/employer/api/v1/login'];

// 미들웨어
app.use(bodyParser.json()); // JSON 형식 요청 본문 처리
app.use(express.json());    // Express JSON 처리
app.use(corsConfig);        // CORS 설정
// app.use(JWTCheckFilter(excludedPaths)); // jwtFilter 걸기
app.use(JWTNotFilter()); // 개발위해서 filter 제외

// 라우터 연결
app.use('/employer/api/v1/login', EmployerLoginRoutes);
app.use('/employer/api/v1/emp', EmployerRoutes);
app.use('/employer/api/v1/chatmessage', ChatRoutes(wss)); // WebSocket 서버 전달
app.use('/employer/api/v1/chatroom', chatRoomRoutes);
app.use('/api/map', mapRoutes);
app.use('/employer/api/v1/partTimer', PartTimerRoutes);

// 서버 시작
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
