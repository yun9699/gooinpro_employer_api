
import { ChatRoomGetDTO } from '../dto/chatroomdto/ChatRoomGetDTO.js';
import ChatRoom from '../models/ChatRoom.js';
import Admin from '../models/Admin.js';
import PartTimer from '../models/PartTimer.js';


// 관리자 번호(admno)를 기반으로 채팅방을 조회하거나 없으면 새로 생성
export const findChatRoom = async (dto) => {

    const existingChatRoom = await ChatRoom.findOne({ where: { admno: dto.admno } });

    // 채팅방이 이미 존재하면 해당 정보 반환
    if (existingChatRoom) {
        return new ChatRoomGetDTO(existingChatRoom.erno);
    }

    // 관리자가 존재하는지 확인
    const admin = await Admin.findOne({ where: { admno: dto.admno } });
    if (!admin) {
        throw new Error('admin not found'); // 관리자 없으면 에러 발생
    }

    // 새로운 채팅방 생성
    const newChatRoom = await ChatRoom.create({ admno: dto.admno });
    return new ChatRoomGetDTO(newChatRoom.erno); // 생성된 채팅방 정보 반환
};


// 참여자 번호(pno)를 기반으로 채팅방을 조회하거나 없으면 새로 생성
export const findChatPartRoom = async (dto) => {
    // 기존 채팅방 조회
    const existingChatRoom = await ChatRoom.findOne({ where: { pno: dto.pno } });

    // 채팅방이 이미 존재하면 해당 정보 반환
    if (existingChatRoom) {
        return new ChatRoomGetDTO(existingChatRoom.erno);
    }

    // 참여자가 존재하는지 확인
    const partTimer = await PartTimer.findOne({ where: { pno: dto.pno } });
    if (!partTimer) {
        throw new Error('PartTimer not found'); // 참여자 없으면 에러 발생
    }

    // 새로운 채팅방 생성
    const newChatRoom = await ChatRoom.create({ pno: dto.pno });
    return new ChatRoomGetDTO(newChatRoom.erno); // 생성된 채팅방 정보 반환
};

// 에러 번호(erno)를 기반으로 채팅방 삭제
export const deleteChatRoom = async (erno) => {
    // 채팅방 삭제
    await ChatRoom.destroy({ where: { erno } });
    return 'Chat room deleted successfully'; // 성공 메시지 반환
};
