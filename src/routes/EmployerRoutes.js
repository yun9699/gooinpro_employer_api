import express from 'express';
import {EmployerRead} from "../controllers/EmployerController.js";

const router = express.Router();

router.get(`/read/:eno`, EmployerRead)

export default router;

