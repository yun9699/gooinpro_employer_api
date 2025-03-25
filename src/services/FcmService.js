import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const fcm_url = process.env.FCM_URL;

export const FcmService = async (token, title, body) => {

    const data = {
        token: token,
        title: title,
        body: body
    };

    try {
        const res = await axios.post(`${fcm_url}/send`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log("FCM 응답:", res.data);
        return res.data;
    } catch (error) {
        console.error("FCM 전송 오류:", error.response?.data || error.message);
        throw error;
    }
};