import models from "../models/index.js";
import mapService from "../services/mapService.js";

// 구인공고 등록
const registerJobPostingService = async (registerDTO) => {
    const transaction = await models.sequelize.transaction({});
    try {
        // 1. 주소 → 좌표 변환 (mapService 구조 반영)
        const { lat, lng } = await mapService.getGeocode(registerDTO.wroadAddress);
        if (!lat || !lng) {
            throw new Error("주소에 대한 좌표를 찾을 수 없습니다.");
        }

        // 2. WorkPlace 생성 (숫자 타입 저장)
        const newWorkPlace = await models.WorkPlace.create({
            eno: registerDTO.eno,
            wroadAddress: registerDTO.wroadAddress,
            wdetailAddress: registerDTO.wdetailAddress,
            wlati: lat,
            wlong: lng,
            wdelete: false
        }, { transaction });

        // 3. JobPostings 생성
        const newJobPosting = await models.JobPostings.create({
            eno: registerDTO.eno,
            wpno: newWorkPlace.wpno,
            ...registerDTO
        }, { transaction });

        // 이미지 저장
        if (registerDTO.jpifilenames?.length > 0) {
            await models.JobPostingImage.bulkCreate(
                registerDTO.jpifilenames.map(filename => ({
                    jpno: newJobPosting.jpno,
                    eno: registerDTO.eno,
                    jpifilename: filename
                })),
                { transaction }
            );
        }

        await transaction.commit();
        return newJobPosting;
    } catch (error) {
        await transaction.rollback();
        console.error("구인공고 등록 실패:", error);
        throw new Error(`구인공고 등록 실패: ${error.message}`);
    }
};


// 구인공고 수정
const editJobPostingService = async (editDTO) => {
    const transaction = await models.sequelize.transaction({});
    try {
        // 1. 기존 구인공고 내용 조회
        const jobPosting = await models.JobPostings.findOne({
            where: { jpno: editDTO.jpno },
            include: [{ model: models.WorkPlace }]
        });

        if (!jobPosting) {
            throw new Error("수정할 공고를 찾을 수 없습니다.");
        }

        // 2. 주소 좌표 변환
        if (editDTO.wroadAddress) {
            const { lat, lng } = await mapService.getGeocode(editDTO.wroadAddress);
            if (!lat || !lng) {
                throw new Error("주소에 대한 좌표를 찾을 수 없습니다.");
            }

            // 3. WorkPlace 수정
            await models.WorkPlace.update(
                {
                    wroadAddress: editDTO.wroadAddress,
                    wdetailAddress: editDTO.wdetailAddress,
                    wlati: lat,
                    wlong: lng,
                    wdelete: false
                },
                {
                    where: { wpno: jobPosting.WorkPlace.wpno },
                    transaction
                }
            );
        }

        // 4. JobPostings 수정
        await models.JobPostings.update(
            {
                jpname: editDTO.jpname,
                jpcontent: editDTO.jpcontent,
                jpvacancies: editDTO.jpvacancies,
                jphourlyRate: editDTO.jphourlyRate,
                jpworkDays: editDTO.jpworkDays,
                jpminDuration: editDTO.jpminDuration,
                jpmaxDuration: editDTO.jpmaxDuration,
                jpworkStartTime: editDTO.jpworkStartTime,
                jpworkEndTime: editDTO.jpworkEndTime,
            },
            {
                where: { jpno: editDTO.jpno, eno: editDTO.eno },
                transaction
            }
        );

        // 5. 이미지 파일명 수정
        if (editDTO.jpifilenames) {
            await models.JobPostingImage.destroy({
                where: { jpno: editDTO.jpno },
                transaction
            });

            if (editDTO.jpifilenames.length > 0) {
                await models.JobPostingImage.bulkCreate(
                    editDTO.jpifilenames.map(filename => ({
                        jpno: editDTO.jpno,
                        eno: editDTO.eno,
                        jpifilename: filename
                    })),
                    { transaction }
                );
            }
        }

        await transaction.commit();
        return "구인공고가 성공적으로 수정되었습니다.";
    } catch (error) {
        await transaction.rollback();
        console.error("구인공고 수정 서비스 실패:", error);
        throw new Error("구인공고 수정 중 오류 발생: " + error.message);
    }
};


// 구인공고 삭제
const deleteJobPostingService = async (jpno, eno) => {
    const transaction = await models.sequelize.transaction();
    try {
        // 1. 구인공고 삭제 (soft delete)
        const [deletedCount] = await models.JobPostings.update(
            { jpdelete: true },
            {
                where: { jpno, eno },
                transaction
            }
        );

        if (deletedCount === 0) {
            throw new Error("삭제할 공고를 찾을 수 없습니다.");
        }

        // 2. 관련 이미지 삭제 (실제 DB에서 삭제)
        await models.JobPostingImage.destroy({
            where: { jpno },
            transaction
        });

        await transaction.commit();
        return "구인공고와 관련 이미지가 성공적으로 삭제되었습니다.";
    } catch (error) {
        await transaction.rollback();
        console.error("구인공고 삭제 서비스 실패:", error);
        throw new Error("구인공고 삭제 중 오류 발생: " + error.message);
    }
};

// 구인공고 단일 조회
const getOneJobPostingService = async (jpno, eno) => {
    try {
        const jobPosting = await models.JobPostings.findOne({
            where: { jpno, eno, jpdelete: false },
            include: [
                {
                    model: models.WorkPlace,
                    attributes: ['wroadAddress', 'wdetailAddress', 'wlati', 'wlong', 'wpno']
                },
                {
                    model: models.JobPostingImage,
                    attributes: ['jpifilename']
                }
            ]
        });

        if (!jobPosting) {
            throw new Error("조회할 공고를 찾을 수 없습니다.");
        }

        // DTO 대신 직접 객체를 반환
        return {
            jpno: jobPosting.jpno,
            eno: jobPosting.eno,
            jpname: jobPosting.jpname,
            jpcontent: jobPosting.jpcontent, // ✅ jpcontent 추가
            jpvacancies: jobPosting.jpvacancies,
            jphourlyRate: jobPosting.jphourlyRate,
            jpworkDays: jobPosting.jpworkDays,
            jpregdate: jobPosting.jpregdate,
            jpminDuration: jobPosting.jpminDuration, // ✅ 추가
            jpmaxDuration: jobPosting.jpmaxDuration, // ✅ 추가
            jpworkStartTime: jobPosting.jpworkStartTime, // ✅ 추가
            jpworkEndTime: jobPosting.jpworkEndTime, // ✅ 추가
            WorkPlace: jobPosting.WorkPlace,
            jpifilenames: jobPosting.JobPostingImages.map(img => img.jpifilename)
        };
    } catch (error) {
        console.error("구인공고 단일 조회 서비스 실패:", error);
        throw new Error("구인공고 단일 조회 중 오류가 발생했습니다.");
    }
};



// 구인공고 리스트 조회
const listJobPostingsService = async (eno) => {
    try {
        const jobPostings = await models.JobPostings.findAll({
            where: { eno, jpdelete: false },
            include: [
                {
                    model: models.WorkPlace,
                    attributes: ['wroadAddress', 'wdetailAddress'],
                    required: false
                },
                {
                    model: models.JobPostingImage,
                    attributes: ['jpifilename'],
                    required: false
                }
            ],
            order: [["jpregdate", "DESC"]],
            raw: true,
            nest: true
        });

        return jobPostings.map(post => ({
            ...post,
            jpifilenames: post.JobPostingImages
                ? [post.JobPostingImages.jpifilename].filter(Boolean)
                : []
        }));
    } catch (error) {
        console.error("[목록 조회 실패]:", error);
        throw new Error(`목록 조회 실패: ${error.message}`);
    }
};


export {
    registerJobPostingService,
    editJobPostingService,
    deleteJobPostingService,
    getOneJobPostingService,
    listJobPostingsService
};
