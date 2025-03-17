import jobPostingImageService from '../services/JobPostingImageService.js';

export const uploadJobPostingImages = async (req, res) => {
    try {
        const { jpno, eno } = req.body;
        const files = req.files;

        // 필수 파라미터 검증
        if (!jpno || !eno) {
            return res.status(400).json({
                success: false,
                error: 'jpno and eno are required'
            });
        }

        // 파일 유효성 검사
        if (!files || files.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No files uploaded'
            });
        }

        // 서비스 호출
        const result = await jobPostingImageService.uploadImages(jpno, eno, files);

        // 성공 응답 (파일명 배열만 반환)
        return res.status(201).json({
            success: true,
            data: {
                filenames: result.filenames // 파일명 배열
            }
        });

    } catch (error) {
        // 특정 에러 유형 처리
        const statusCode = error.message.includes('최대') || error.message.includes('중복')
            ? 400
            : 500;

        return res.status(statusCode).json({
            success: false,
            error: error.message,
            details: process.env.NODE_ENV === 'development'
                ? error.stack
                : undefined
        });
    }
};

export const getJobPostingImages = async (req, res) => {
    try {
        const { jpno } = req.params;

        if (!jpno) {
            return res.status(400).json({
                success: false,
                error: 'jpno parameter is required'
            });
        }

        // 서비스 호출 (파일명 배열 반환)
        const filenames = await jobPostingImageService.getImages(jpno);

        return res.status(200).json({
            success: true,
            data: {
                filenames // 파일명 배열
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Failed to fetch images',
            details: process.env.NODE_ENV === 'development'
                ? error.stack
                : undefined
        });
    }
};
