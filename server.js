import express from 'express';
import connectMongoDB from './config/mongoDB.js';
import models from './models/index.js';
import bodyParser from 'body-parser';  // 요청 본문을 처리하기 위한 body-parser 모듈
import http from 'http';  // HTTP 서버 생성 모듈
import ChatRoutes from './routes/ChatRoutes.js';  // 채팅 관련 라우터 불러오기
import { configureSocket } from './socket/socketIoConfig.js';  // 분리한 소켓 설정 모듈 임포트

// MongoDB 연결
connectMongoDB();
import models from './src/models/index.js';

const { Employer } = models;

const app = express();  // express 애플리케이션 생성
const server = http.createServer(app);  // HTTP 서버 생성
const io = configureSocket(server);  // WebSocket 설정 호출

const PORT = 3000;  // 서버 포트

// 서버 설정
app.use(bodyParser.json());  // JSON 형식의 요청 본문 처리
app.use(express.json());  // Express에서 JSON 처리
app.use('/employer/api/v1/chatmessage', ChatRoutes(io));  // 채팅 관련 라우터 설정

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

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);  // 서버 시작 로그
});
