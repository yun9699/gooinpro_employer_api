import ChatService from '../services/ChatService.js';

class ChatController {
    constructor(io) {
        this.io = io;  // WebSocket 객체 저장
    }

    // 채팅 메시지 조회
    async getChatMessages(req, res) {
        const { roomId } = req.query;  // roomId 추출
        const messages = await ChatService.getMessagesByRoomId(roomId);  // 메시지 조회
        res.json(messages);  // 메시지 응답
    }

    // 채팅 메시지 전송
    async sendMessage(req, res) {
        const chatMessageDTO = req.body;  // 메시지 데이터 추출
        const savedMessage = await ChatService.saveMessage(chatMessageDTO);  // 메시지 저장
        res.json(savedMessage);  // 저장된 메시지 응답

        // 실시간으로 메시지 전송
        this.io.to(chatMessageDTO.roomId).emit('chatMessage', savedMessage);
    }

    // 채팅 메시지 삭제
    deleteMessages(req, res) {
        const { roomId } = req.params;  // roomId 추출
        ChatService.deleteMessagesByRoomId(roomId);  // 메시지 삭제
        res.status(204).send();  // 삭제 완료 응답
    }
}

export default ChatController;
