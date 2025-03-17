import express from "express";
import {getCalendarData} from "../controllers/CalendarController.js";

const router = express.Router();

router.get("/:eno/:year/:month", getCalendarData)

export default router;