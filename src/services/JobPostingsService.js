import models from "../models/index.js";

// 구인공고 등록
const registerJobPostingService = async (registerDTO) => {
    try {
        console.log("받은 DTO 데이터:", registerDTO);

        // 1. WorkPlace 레코드 생성 – 근무지 정보를 DB에 저장하고 새 레코드의 wpno 값을 반환받음
        const newWorkPlace = await models.WorkPlace.create({
            eno: registerDTO.eno,
            wroadAddress: registerDTO.wroadAddress,
            wdetailAddress: registerDTO.wdetailAddress
        });

        console.log("생성된 WorkPlace:", newWorkPlace);

        // 2. 구인공고 생성 – 반환받은 WorkPlace의 wpno 값을 외래키로 할당하여 저장
        const newJobPosting = await models.JobPostings.create({
            eno: registerDTO.eno,
            wpno: newWorkPlace.wpno,  // 이 부분이 추가됨
            jpname: registerDTO.jpname,
            jpcontent: registerDTO.jpcontent,
            jpvacancies: registerDTO.jpvacancies,
            jphourlyRate: registerDTO.jphourlyRate,
            jpworkDays: registerDTO.jpworkDays,
            jpminDuration: registerDTO.jpminDuration,
            jpmaxDuration: registerDTO.jpmaxDuration,
            jpworkStartTime: registerDTO.jpworkStartTime,
            jpworkEndTime: registerDTO.jpworkEndTime
        });

        return newJobPosting;
    } catch (error) {
        console.error("DTO 데이터:", registerDTO);
        console.error("구인공고 등록 서비스 실패:", error);
        throw new Error("구인공고 등록 중 오류 발생");
    }
};

// 구인공고 수정
const editJobPostingService = async (editDTO) => {
    try {
        const updatedJobPosting = await models.JobPostings.update(
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
            { where: { jpno: editDTO.jpno, eno: editDTO.eno } }
        );

        if (updatedJobPosting[0] === 0) {
            throw new Error("수정할 공고를 찾을 수 없습니다.");
        }

        return "구인공고가 성공적으로 수정되었습니다.";
    } catch (error) {
        console.error("구인공고 수정 서비스 실패:", error);
        throw new Error("구인공고 수정 중 오류 발생");
    }
};

// 구인공고 삭제
const deleteJobPostingService = async (jpno, eno) => {
    try {
        const deletedCount = await models.JobPostings.update(
            { jpdelete: true },
            { where: { jpno, eno } }
        );

        if (deletedCount[0] === 0) {
            throw new Error("삭제할 공고를 찾을 수 없습니다.");
        }

        return "구인공고가 성공적으로 삭제되었습니다.";
    } catch (error) {
        console.error("구인공고 삭제 서비스 실패:", error);
        throw new Error("구인공고 삭제 중 오류 발생");
    }
};

// 구인공고 단일 조회
const getOneJobPostingService = async (jpno, eno) => {
    try {
        const jobPosting = await models.JobPostings.findOne({
            where: { jpno, eno, jpdelete: false },
        });

        if (!jobPosting) {
            throw new Error("조회할 공고를 찾을 수 없습니다.");
        }

        return jobPosting;
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
            include: [{
                model: models.WorkPlace,
                attributes: ['wroadAddress', 'wdetailAddress']
            }],
            order: [["jpregdate", "DESC"]],
        });

        return jobPostings;
    } catch (error) {
        console.error("구인공고 리스트 조회 서비스 실패:", error);
        throw new Error("구인공고 리스트 조회 중 오류가 발생했습니다.");
    }
};


export {
    registerJobPostingService,
    editJobPostingService,
    deleteJobPostingService,
    getOneJobPostingService,
    listJobPostingsService
};
