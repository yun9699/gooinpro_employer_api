import models from '../models/index.js';
import JobPostingsImageDetailDTO from '../dto/jobpostingdto/JobPostingsImageDetailDTO.js';

class JobPostingImageService {
    async uploadImages(jpno, eno, files, transaction = null) {
        try {
            const imageRecords = files.map(file => ({
                jpno: parseInt(jpno),
                eno: parseInt(eno),
                jpifilename: file.filename
            }));

            await models.JobPostingImage.bulkCreate(imageRecords, { transaction });

            return {
                message: `${files.length} 개의 이미지 업로드 성공`,
                filenames: files.map(f => f.filename) // 파일명만 반환
            };
        } catch (error) {
            throw new Error(`이미지 업로드 실패: ${error.message}`);
        }
    }

    async getImages(jpno) {
        try {
            const images = await models.JobPostingImage.findAll({
                where: { jpno },
                attributes: ['jpifilename']
            });

            return images.map(img => img.jpifilename); // 파일명 리스트만 반환
        } catch (error) {
            console.error('이미지 조회 실패:', error);
            throw new Error('이미지 조회 중 오류가 발생했습니다.');
        }
    }
}

export default new JobPostingImageService();
