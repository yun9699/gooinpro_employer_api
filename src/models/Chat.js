import mongoose from 'mongoose';

// 채팅 메시지 스키마 정의
const chatSchema = new mongoose.Schema({
    sender: String,  // 발신자
    receiver: String,  // 수신자
    message: String,  // 메시지 내용
    timestamp: { type: Date, default: Date.now },  // 메시지 전송 시간
    roomId: String  // 채팅방 ID
});

// Chat 모델 생성
const Chat = mongoose.model('Chat', chatSchema);

export default Chat;