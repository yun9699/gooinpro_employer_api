import express from 'express';
import { uploadJobPostingImages, getJobPostingImages } from '../controllers/JobPostingImageController.js';
import multerConfig from '../config/multerConfig.js';

const router = express.Router();

// 이미지 업로드 엔드포인트
router.post(
    '/upload',
    multerConfig.array('images', 5), // 최대 5개 파일 업로드 허용
    uploadJobPostingImages
);

// 이미지 조회 엔드포인트
router.get('/:jpno', getJobPostingImages);

export default router;
