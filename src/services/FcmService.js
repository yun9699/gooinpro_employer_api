// FCMService.js
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

class FCMService {
    constructor() {
        // 환경 변수에서 FCM API URL 가져오기
        this.fcmUrl = process.env.FCM_URL
        console.log('FCM 서비스 초기화 완료 - FCM URL:', this.fcmUrl);
    }

    /**
     * FCM 메시지를 전송하는 함수
     * @param {Array<string>} tokens - FCM 토큰 배열
     * @param {string} title - 알림 제목
     * @param {string} content - 알림 내용
     * @returns {Promise<Object>} FCM API 응답
     */
    async sendNotification(tokens, title, content) {
        try {
            // 토큰이 배열이 아니면 배열로 변환
            const tokenArray = Array.isArray(tokens) ? tokens : [tokens];

            // FCM 요청 데이터 생성
            const fcmRequestDTO = {
                token: tokenArray,
                title: title,
                content: content  // FCM API가 'content' 필드를 사용한다고 가정
            };

            console.log('===== FCM 알림 전송 시작 =====');
            console.log('요청 URL:', `${this.fcmUrl}/send`);
            console.log('요청 데이터:', JSON.stringify(fcmRequestDTO, null, 2));

            // FCM API 호출
            const startTime = Date.now();
            const response = await axios.post(`${this.fcmUrl}/send`, fcmRequestDTO, {
                headers: { 'Content-Type': 'application/json' }
            });
            const endTime = Date.now();

            console.log('===== FCM 알림 전송 완료 =====');
            console.log('응답 상태코드:', response.status);
            console.log('응답 데이터:', JSON.stringify(response.data, null, 2));
            console.log('응답 시간:', endTime - startTime, 'ms');
            console.log('=============================');

            return response.data;
        } catch (error) {
            console.error('===== FCM 알림 전송 실패 =====');
            console.error('요청 URL:', `${this.fcmUrl}/send`);
            console.error('오류 메시지:', error.message);

            if (error.response) {
                // 서버가 응답을 반환했지만 2xx 범위를 벗어난 상태 코드
                console.error('응답 상태코드:', error.response.status);
                console.error('응답 데이터:', JSON.stringify(error.response.data, null, 2));
            } else if (error.request) {
                // 요청이 이루어졌지만 응답을 받지 못함
                console.error('요청은 전송되었으나 응답이 없음');
            }
            console.error('=============================');

            throw error;
        }
    }

    /**
     * 고용주에게 알림을 전송하는 함수
     * @param {string} employerToken - 고용주의 FCM 토큰
     * @param {string} title - 알림 제목
     * @param {string} content - 알림 내용
     * @returns {Promise<Object>} FCM API 응답
     */
    async sendToEmployer(employerToken, title, content) {
        if (!employerToken) {
            console.warn('고용주 FCM 토큰이 없어 알림을 전송할 수 없음');
            return null;
        }

        console.log('고용주에게 FCM 알림 전송 준비');
        return this.sendNotification([employerToken], title, content);
    }

    /**
     * 파트타이머에게 알림을 전송하는 함수
     * @param {string} partTimerToken - 파트타이머의 FCM 토큰
     * @param {string} title - 알림 제목
     * @param {string} content - 알림 내용
     * @returns {Promise<Object>} FCM API 응답
     */
    async sendToPartTimer(partTimerToken, title, content) {
        if (!partTimerToken) {
            console.warn('파트타이머 FCM 토큰이 없어 알림을 전송할 수 없음');
            return null;
        }

        console.log('파트타이머에게 FCM 알림 전송 준비');
        return this.sendNotification([partTimerToken], title, content);
    }
}

// 싱글톤 인스턴스 내보내기
export default new FCMService();
