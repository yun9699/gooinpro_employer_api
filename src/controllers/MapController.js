import mapService from '../services/MapService.js';

const mapController = {
    // 주소로 좌표 검색
    getGeocode: async (req, res) => {
        try {
            const { address } = req.query;
            if (!address) {
                return res.status(400).json({ error: '주소를 입력해주세요.' });
            }
            const result = await mapService.getGeocode(address);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 좌표로 주소 검색
    getReverseGeocode: async (req, res) => {
        try {
            const { coords } = req.query;
            if (!coords) {
                return res.status(400).json({ error: '좌표를 입력해주세요.' });
            }
            const result = await mapService.getReverseGeocode(coords);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 경로 검색
    getDirections: async (req, res) => {
        try {
            const { start, goal, waypoints } = req.query;
            if (!start || !goal) {
                return res.status(400).json({ error: '출발지와 목적지는 필수입니다.' });
            }
            const result = await mapService.getDirections(start, goal, waypoints);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default mapController;
