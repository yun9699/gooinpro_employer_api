import express from "express";
import {
    registerJobPosting,
    editJobPosting,
    deleteJobPosting,
    getOneJobPosting,
    listJobPostings,
    listAllJobPostings
} from "../controllers/JobPostingsController.js";

const router = express.Router();

router.post("/register", registerJobPosting);
router.put("/edit/:jpno", editJobPosting);
router.delete("/:jpno", deleteJobPosting);
router.get("/list", listJobPostings);
router.get("/list/all", listAllJobPostings);
router.get("/:jpno", getOneJobPosting);

export default router;
