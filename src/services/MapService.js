import axios from 'axios';

const mapService = {
    getGeocode: async (address) => {
        try {
            const response = await axios.get('https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode', {
                headers: {
                    'X-NCP-APIGW-API-KEY-ID': process.env.NAVER_CLIENT_ID,
                    'X-NCP-APIGW-API-KEY': process.env.NAVER_CLIENT_SECRET,
                    'Accept': 'application/json'  // 추가
                },
                params: {
                    query: address
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Geocoding 실패: ' + error.message);
        }
    },

    getReverseGeocode: async (coords) => {
        try {
            const response = await axios.get('https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc', {
                headers: {
                    'X-NCP-APIGW-API-KEY-ID': process.env.NAVER_CLIENT_ID,
                    'X-NCP-APIGW-API-KEY': process.env.NAVER_CLIENT_SECRET,
                    'Accept': 'application/json'  // 추가
                },
                params: {
                    coords: coords,
                    output: 'json'
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Reverse Geocoding 실패: ' + error.message);
        }
    }
};

export default mapService;
