import express from 'express';
import {kakaoLogin} from "../controllers/EmployerController.js";

const router = express.Router();

router.post('/kakao', kakaoLogin)

export default router;