import express from 'express';
import models from '../models/index.js';

const router = express.Router();

// eno로 근무지 주소 조회
router.get('/workplace/:eno', async (req, res) => {
    try {
        const workplace = await models.WorkPlace.findOne({
            where: { eno: req.params.eno }
        });
        res.json(workplace);
    } catch (error) {
        console.error('근무지 조회 실패:', error);
        res.status(500).json({ error: '근무지 조회 중 오류가 발생했습니다.' });
    }
});

export default router;

