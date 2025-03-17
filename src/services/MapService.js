import axios from 'axios';
import models from '../models/index.js';

const mapService = {
    getGeocode: async (address) => {
        try {
            // 1. DB에서 주소 검색 (소프트 삭제되지 않은 레코드)
            const existingLocation = await models.WorkPlace.findOne({
                where: {
                    wroadAddress: address,
                    wdelete: false
                },
                attributes: ['wlati', 'wlong'], // 필요한 필드만 선택
                raw: true // 순수 객체로 반환
            });

            // 2. DB에 존재하는 경우: 저장된 좌표 반환
            if (existingLocation && existingLocation.wlati && existingLocation.wlong) {
                return {
                    lat: parseFloat(existingLocation.wlati),
                    lng: parseFloat(existingLocation.wlong)
                };
            }

            // 3. 주소 전처리 (카카오 우편번호 서비스 호환성)
            const formattedAddress = address.replace('지하 ', '');
            console.log('[Geocode] 처리된 주소:', formattedAddress);

            // 4. 네이버 API 호출
            const response = await axios.get('https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode', {
                headers: {
                    'X-NCP-APIGW-API-KEY-ID': process.env.NCP_CLIENT_ID,
                    'X-NCP-APIGW-API-KEY': process.env.NCP_CLIENT_SECRET,
                    'Accept': 'application/json'
                },
                params: { query: formattedAddress }
            });

            console.log('[Geocode] Naver API 응답:', response.data);

            // 5. 응답 검증
            if (!response.data?.addresses?.length) {
                throw new Error('유효한 좌표를 찾을 수 없습니다');
            }

            // 6. 좌표 추출 및 포맷 통일
            const { x, y } = response.data.addresses[0];
            return {
                lat: parseFloat(y), // 위도
                lng: parseFloat(x)  // 경도
            };

        } catch (error) {
            console.error('[Geocode] 오류 발생:', error);
            throw new Error(`주소 변환 실패: ${error.message}`);
        }
    },

    getReverseGeocode: async (coords) => {
        try {
            const response = await axios.get('https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc', {
                headers: {
                    'X-NCP-APIGW-API-KEY-ID': process.env.NCP_CLIENT_ID,
                    'X-NCP-APIGW-API-KEY': process.env.NCP_CLIENT_SECRET,
                    'Accept': 'application/json'
                },
                params: {
                    coords: `${coords.lng},${coords.lat}`, // 경도,위도 순서
                    output: 'json'
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(`역방향 변환 실패: ${error.message}`);
        }
    }
};

export default mapService;
