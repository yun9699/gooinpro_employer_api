import express from 'express';
import {GoogleLogin, kakaoLogin, refreshToken, registerEmployer} from "../controllers/EmployerController.js";


const router = express.Router();

router.get('/kakao', kakaoLogin)

router.get('/google', GoogleLogin)

router.put(`/reg/:eno`, registerEmployer)

router.get('/refreshToken', refreshToken)

export default router;