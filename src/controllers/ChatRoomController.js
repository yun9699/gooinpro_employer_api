
import { findChatRoom, findChatPartRoom, deleteChatRoom } from '../services/ChatRoomService.js';
import { ChatRoomAddAdminDTO } from '../dto/chatroomdto/ChatRoomAddAdminDTO.js';
import { ChatRoomAddPartDTO } from '../dto/chatroomdto/ChatRoomAddPartDTO.js';


// 관리자 채팅방 조회
export const getChatRoom = async (req, res) => {
    const { admno } = req.params;

    try {
        const dto = new ChatRoomAddAdminDTO(Number(admno)); // DTO 생성
        const chatRoom = await findChatRoom(dto); // 채팅방 조회
        res.status(200).json(chatRoom); // 조회 결과 반환
    } catch (error) {
        res.status(400).json({ error: error.message }); // 에러 처리
    }
};

// 근로자 채팅방 조회
export const getChatPartRoom = async (req, res) => {
    const { pno } = req.params;

    try {
        const dto = new ChatRoomAddPartDTO(Number(pno)); // DTO 생성
        const chatRoom = await findChatPartRoom(dto); // 채팅방 조회
        res.status(200).json(chatRoom); // 조회 결과 반환
    } catch (error) {
        res.status(400).json({ error: error.message }); // 에러 처리
    }
};

// 채팅방 삭제
export const deleteChat = async (req, res) => {
    const { erno } = req.params;

    try {
        const message = await deleteChatRoom(erno); // 채팅방 삭제
        res.status(200).json({ message }); // 성공 메시지 반환
    } catch (error) {
        res.status(400).json({ error: error.message }); // 에러 처리
    }
};
