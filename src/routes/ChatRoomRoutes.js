
import express from 'express';
import { getChatRoom, getChatPartRoom, deleteChat } from '../controllers/ChatRoomController.js';

// 라우터 객체 생성
const router = express.Router();

// 관리자 번호(admno)를 기반으로 채팅방 조회
router.get('/get/admin/:admno', getChatRoom);

// 근로자 번호(pno)를 기반으로 채팅방 조회
router.get('/get/part/:pno', getChatPartRoom);

// 채팅방 번호(erno)를 기반으로 채팅방 삭제
router.delete('/delete/all/:erno', deleteChat);

export default router;
