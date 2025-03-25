import express from 'express';
import {EmployerEdit, EmployerRead, saveEmployerFcmToken} from "../controllers/EmployerController.js";

const router = express.Router();

router.get(`/read/:eno`, EmployerRead)
router.put(`/edit/:eno`, EmployerEdit)
router.post(`/:eno/fcm-token`, saveEmployerFcmToken);


export default router;