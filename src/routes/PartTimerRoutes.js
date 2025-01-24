import express from "express";
import {getMyPartTimerList, getPartTimerOne} from "../controllers/PartTimerController.js";

const router = express.Router();

router.get("/list/:eno", getMyPartTimerList);

router.get('/read/:pno', getPartTimerOne);

export default router;