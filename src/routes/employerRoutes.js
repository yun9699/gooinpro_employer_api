import express from 'express';
import {kakaoLogin, registerEmployer} from "../controllers/EmployerController.js";

const router = express.Router();

router.post('/kakao', kakaoLogin)

router.put(`/reg/:eno`, registerEmployer)

export default router;