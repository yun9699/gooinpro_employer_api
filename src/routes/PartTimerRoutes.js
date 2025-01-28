import express from "express";
import {getMyPartTimerList, getPartTimerOne, getPartTimerWorkStatus} from "../controllers/PartTimerController.js";

const router = express.Router();

router.get("/list/:eno", getMyPartTimerList);

router.get('/read/:pno', getPartTimerOne);

router.get('/workStatus/:pno', getPartTimerWorkStatus);

export default router;