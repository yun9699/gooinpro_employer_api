import express from 'express';
import ChatController from '../controllers/ChatController.js';

const router = express.Router();  // express 라우터 생성

export default (io) => {
    const controller = new ChatController(io);  // ChatController 인스턴스 생성

    // 채팅 메시지 조회
    router.get('/chat', controller.getChatMessages.bind(controller));

    // 채팅 메시지 전송
    router.post('/send', controller.sendMessage.bind(controller));

    // 채팅 메시지 삭제
    router.delete('/chat/:roomId', controller.deleteMessages.bind(controller));

    return router;
};
