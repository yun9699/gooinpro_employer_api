import express from "express";
import {
    getApplicantList,
    getMyPartTimerList,
    getPartTimerOne,
    getPartTimerWorkStatus
} from "../controllers/PartTimerController.js";

const router = express.Router();

router.get("/list/:eno", getMyPartTimerList);

router.get('/read/:pno', getPartTimerOne);

router.get('/workStatus/:pno', getPartTimerWorkStatus);

router.get('/applicant/list/:eno', getApplicantList);

export default router;