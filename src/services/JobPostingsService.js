import models from "../models/index.js";
import mapService from "../services/mapService.js";

// 구인공고 등록
const registerJobPostingService = async (registerDTO) => {
    const transaction = await models.sequelize.transaction();
    try {
        console.log("[등록] DTO 데이터:", registerDTO);

        // 1. 주소 좌표 변환 (수정된 mapService 구조 반영)
        const { lat, lng } = await mapService.getGeocode(registerDTO.wroadAddress);
        console.log("[등록] 변환 좌표:", { lat, lng });

        // 2. WorkPlace 생성
        const newWorkPlace = await models.WorkPlace.create({
            eno: registerDTO.eno,
            wroadAddress: registerDTO.wroadAddress,
            wdetailAddress: registerDTO.wdetailAddress,
            wlati: lat.toString(),
            wlong: lng.toString(),
            wdelete: false
        }, { transaction });

        console.log("[등록] 생성된 WorkPlace:", newWorkPlace.wpno);

        // 3. 구인공고 생성
        const newJobPosting = await models.JobPostings.create({
            eno: registerDTO.eno,
            wpno: newWorkPlace.wpno,
            ...registerDTO
        }, { transaction });

        await transaction.commit();
        return newJobPosting;

    } catch (error) {
        await transaction.rollback();
        console.error("[등록 실패] DTO:", registerDTO);
        throw new Error(`구인공고 등록 실패: ${error.message}`);
    }
};

// 구인공고 수정
const editJobPostingService = async (editDTO) => {
    let transaction; // 트랜잭션 변수 선언
    try {
        // 1. 트랜잭션 생성
        transaction = await models.sequelize.transaction();
        console.log("트랜잭션 생성 성공:", !!transaction);

        // 2. 필수 필드 검증
        if (!editDTO.wpno) throw new Error("wpno 필수값 누락");
        if (!editDTO.wroadAddress) throw new Error("주소 정보 누락");

        // 3. 기존 WorkPlace 조회 (트랜잭션 사용)
        const existingWorkPlace = await models.WorkPlace.findByPk(editDTO.wpno, {
            transaction
        });
        if (!existingWorkPlace) throw new Error("근무지 정보 없음");

        // 4. 주소 변경 여부 확인
        const isAddressChanged =
            editDTO.wroadAddress !== existingWorkPlace.wroadAddress ||
            editDTO.wdetailAddress !== existingWorkPlace.wdetailAddress;

        // 5. 주소 변경 시 좌표 갱신
        if (isAddressChanged) {
            const { lat, lng } = await mapService.getGeocode(editDTO.wroadAddress);
            await models.WorkPlace.update(
                {
                    wroadAddress: editDTO.wroadAddress,
                    wdetailAddress: editDTO.wdetailAddress,
                    wlati: lat.toString(),
                    wlong: lng.toString()
                },
                {
                    where: { wpno: editDTO.wpno },
                    transaction
                }
            );
        }

        // 6. 구인공고 정보 업데이트
        const [updatedCount] = await models.JobPostings.update(editDTO, {
            where: {
                jpno: editDTO.jpno,
                eno: editDTO.eno
            },
            transaction
        });

        if (updatedCount === 0) throw new Error("수정 대상 없음");

        // 7. 트랜잭션 커밋
        await transaction.commit();
        return "구인공고 수정 성공";ss

    } catch (error) {
        // 🔥 에러 발생 시 트랜잭션 롤백 및 상세 로그 출력
        if (transaction) {
            await transaction.rollback();
            console.error("[트랜잭션 롤백 완료]");
        }

        console.error("[에러 발생] 트랜잭션:", !!transaction ? "존재" : "없음");
        console.error("[에러 메시지]:", error.message);
        console.error("[에러 스택]:", error.stack);

        throw new Error(`구인공고 수정 실패: ${error.message}`);
    }
};



// 구인공고 삭제
const deleteJobPostingService = async (jpno, eno) => {
    const transaction = await models.sequelize.transaction();
    try {
        const [deletedCount] = await models.JobPostings.update(
            { jpdelete: true },
            {
                where: { jpno, eno },
                transaction
            }
        );

        if (deletedCount === 0) throw new Error("삭제 대상 없음");

        await transaction.commit();
        return "구인공고 삭제 성공";

    } catch (error) {
        await transaction.rollback();
        console.error("[삭제 실패]:", error);
        throw new Error(`삭제 실패: ${error.message}`);
    }
};

// 구인공고 단일 조회
const getOneJobPostingService = async (jpno, eno) => {
    try {
        const result = await models.JobPostings.findOne({
            where: { jpno, eno, jpdelete: false },
            include: [{
                model: models.WorkPlace,
                attributes: ['wpno', 'wroadAddress', 'wdetailAddress', 'wlati', 'wlong'],
                required: false
            }],
            raw: true,
            nest: true
        });

        if (!result) throw new Error("공고를 찾을 수 없음");

        // 데이터 구조 평탄화
        return {
            ...result,
            ...result.WorkPlace
        };

    } catch (error) {
        console.error("[단일 조회 실패]:", error);
        throw new Error(`조회 실패: ${error.message}`);
    }
};

// 구인공고 리스트 조회
const listJobPostingsService = async (eno) => {
    try {
        return await models.JobPostings.findAll({
            where: { eno, jpdelete: false },
            include: [{
                model: models.WorkPlace,
                attributes: ['wroadAddress', 'wdetailAddress'],
                required: false
            }],
            order: [["jpregdate", "DESC"]],
            raw: true,
            nest: true
        });
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
