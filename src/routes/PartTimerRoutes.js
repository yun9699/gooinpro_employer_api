import express from "express";
import {
    getApplicantList, getApplicantOne,
    getMyPartTimerList,
    getPartTimerOne, getPartTimerTotalPay, getPartTimerWorkHistory,
    getPartTimerWorkStatus
} from "../controllers/PartTimerController.js";

const router = express.Router();

router.get("/list/:eno", getMyPartTimerList);

router.get('/read/:pno', getPartTimerOne);

router.get('/workStatus/:pno', getPartTimerWorkStatus);

router.get('/applicant/list/:eno', getApplicantList);

router.get('/applicant/read/:jpano/:pno', getApplicantOne);

router.get('/workHistory/:pno', getPartTimerWorkHistory);

router.get('/totalPay/:eno', getPartTimerTotalPay);

export default router;