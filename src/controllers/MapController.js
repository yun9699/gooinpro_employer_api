import mapService from '../services/MapService.js';

const mapController = {
    // 주소로 좌표 검색 (DB 조회 우선)
    getGeocode: async (req, res) => {
        try {
            const { query } = req.query;
            if (!query) {
                return res.status(400).json({ error: '주소를 입력해주세요.' });
            }

            // Geocoding 서비스 호출
            const coords = await mapService.getGeocode(query);

            // 응답 구조 통일
            res.json(coords); // { lat, lng } 형식으로 반환
        } catch (error) {
            console.error('Geocoding 실패:', error.message || error);
            res.status(500).json({ error: `주소 변환 실패: ${error.message}` });
        }
    },

    // 좌표로 주소 검색
    getReverseGeocode: async (req, res) => {
        try {
            const { coords } = req.query;
            if (!coords) {
                return res.status(400).json({ error: '좌표를 입력해주세요.' });
            }

            // Reverse Geocoding 서비스 호출
            const result = await mapService.getReverseGeocode(coords);

            res.json(result);
        } catch (error) {
            console.error('Reverse Geocoding 실패:', error.message || error);
            res.status(500).json({ error: `역방향 주소 변환 실패: ${error.message}` });
        }
    },

    // 경로 검색
    getDirections: async (req, res) => {
        try {
            const { start, goal, waypoints } = req.query;
            if (!start || !goal) {
                return res.status(400).json({ error: '출발지와 목적지는 필수입니다.' });
            }

            // Directions 서비스 호출 (추후 구현 필요)
            const result = await mapService.getDirections(start, goal, waypoints);

            res.json(result);
        } catch (error) {
            console.error('경로 검색 실패:', error.message || error);
            res.status(500).json({ error: `경로 검색 실패: ${error.message}` });
        }
    }
};

export default mapController;
