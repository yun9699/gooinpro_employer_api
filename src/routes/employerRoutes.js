import express from 'express';
import {kakaoLogin, registerEmployer} from "../controllers/EmployerController.js";

const router = express.Router();

router.get('/kakao', kakaoLogin)

router.put(`/reg/:eno`, registerEmployer)

export default router;