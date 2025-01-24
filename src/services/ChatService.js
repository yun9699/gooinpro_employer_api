import Chat from '../models/Chat.js';

class ChatService {
    // 메시지를 저장하는 메서드
    static async saveMessage(chatMessage) {
        const chat = new Chat({
            sender: chatMessage.sender,  // 발신자
            receiver: chatMessage.receiver,  // 수신자
            message: chatMessage.message,  // 메시지 내용
            roomId: chatMessage.roomId  // 채팅방 ID
        });
        await chat.save();  // 메시지 저장
        return chat;  // 저장된 메시지 반환
    }

    // roomId로 메시지를 조회하는 메서드
    static async getMessagesByRoomId(roomId) {
        return await Chat.find({ roomId });  // 해당 roomId에 속한 메시지 반환
    }

    // roomId로 메시지를 삭제하는 메서드
    static async deleteMessagesByRoomId(roomId) {
        await Chat.deleteMany({ roomId });  // 해당 roomId의 모든 메시지 삭제
    }
}

export default ChatService;
