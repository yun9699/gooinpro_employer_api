import axios from 'axios';

const mapService = {
    // 주소로 좌표 검색 (Geocoding)
    getGeocode: async (address) => {
        console.log('Geocoding API 키값:', process.env.NAVER_CLIENT_ID, process.env.NAVER_CLIENT_SECRET);
        try {
            const response = await axios.get('https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode', {
                headers: {
                    'X-NCP-APIGW-API-KEY': process.env.NAVER_CLIENT_ID,
                    'X-NCP-APIGW-API-KEY-SECRET': process.env.NAVER_CLIENT_SECRET
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

    // 좌표로 주소 검색 (Reverse Geocoding)
    getReverseGeocode: async (coords) => {
        console.log('Reverse Geocoding API 키값:', process.env.NAVER_CLIENT_ID, process.env.NAVER_CLIENT_SECRET);
        try {
            const response = await axios.get('https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc', {
                headers: {
                    'X-NCP-APIGW-API-KEY': process.env.NAVER_CLIENT_ID,
                    'X-NCP-APIGW-API-KEY-SECRET': process.env.NAVER_CLIENT_SECRET
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
    },

    // 경로 검색
    getDirections: async (start, goal, waypoints) => {
        console.log('Directions API 키값:', process.env.NAVER_CLIENT_ID, process.env.NAVER_CLIENT_SECRET);
        try {
            const response = await axios.get('https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving', {
                headers: {
                    'X-NCP-APIGW-API-KEY': process.env.NAVER_CLIENT_ID,
                    'X-NCP-APIGW-API-KEY-SECRET': process.env.NAVER_CLIENT_SECRET
                },
                params: {
                    start,
                    goal,
                    waypoints,
                    option: 'trafast'
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('경로 검색 실패: ' + error.message);
        }
    }
};

export default mapService;
