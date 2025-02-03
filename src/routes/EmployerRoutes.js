import express from 'express';
import {EmployerEdit, EmployerRead} from "../controllers/EmployerController.js";

const router = express.Router();

router.get(`/read/:eno`, EmployerRead)
router.put(`/edit/:eno`, EmployerEdit)

export default router;

