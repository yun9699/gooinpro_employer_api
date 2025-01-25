import express from 'express';
import {kakaoLogin, refreshToken, registerEmployer} from "../controllers/EmployerController.js";


const router = express.Router();

router.get('/kakao', kakaoLogin)

router.put(`/reg/:eno`, registerEmployer)

router.get('/refreshToken', refreshToken)

export default router;