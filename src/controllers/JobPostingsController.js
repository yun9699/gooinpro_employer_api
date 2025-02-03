import { registerJobPostingService, editJobPostingService, deleteJobPostingService, getOneJobPostingService, listJobPostingsService,} from "../services/JobPostingsService.js";
import JobPostingRegisterDTO from "../dto/jobpostingdto/JobPostingRegisterDTO.js";
import JobPostingResponseDTO from "../dto/jobpostingdto/JobPostingResponseDTO.js";

// 구인공고 등록
const registerJobPosting = async (req, res) => {
    try {
        const { eno } = req.body; // 로그인한 사용자의 eno
        const jobPostingData = req.body;

        console.log("요청 데이터:", req.body);

        // DTO 생성
        const registerDTO = new JobPostingRegisterDTO(
            eno,
            jobPostingData.jpname,
            jobPostingData.jpcontent,
            jobPostingData.jpvacancies,
            jobPostingData.jphourlyRate,
            jobPostingData.jpworkDays,
            jobPostingData.jpminDuration,
            jobPostingData.jpmaxDuration,
            jobPostingData.jpworkStartTime,
            jobPostingData.jpworkEndTime,
            jobPostingData.wroadAddress,
            jobPostingData.wdetailAddress
        );

        console.log("생성된 DTO:", registerDTO);

        // 서비스 호출
        const newJobPosting = await registerJobPostingService(registerDTO);

        // 응답 DTO 생성
        const responseDTO = new JobPostingResponseDTO(newJobPosting.jpno, "구인공고가 성공적으로 등록되었습니다.");

        res.status(201).json({
            status: "success",
            data: responseDTO,
        });
    } catch (error) {
        console.error("구인공고 등록 실패:", error);
        res.status(500).json({ errorMessage: "구인공고 등록 중 오류가 발생했습니다." });
    }
};

// 구인공고 수정
const editJobPosting = async (req, res) => {
    try {
        const { jpno } = req.params; // 공고 번호
        const { eno } = req.body; // 로그인한 사용자의 eno
        const jobPostingData = req.body;

        // DTO 생성
        const editDTO = {
            jpno,
            eno,
            ...jobPostingData,
        };

        // 서비스 호출
        const message = await editJobPostingService(editDTO);

        res.status(200).json({
            status: "success",
            message: message,
        });
    } catch (error) {
        console.error("구인공고 수정 실패:", error);
        res.status(500).json({ errorMessage: "구인공고 수정 중 오류가 발생했습니다." });
    }
};

// 구인공고 삭제
const deleteJobPosting = async (req, res) => {
    try {
        const { jpno } = req.params; // 공고 번호
        const { eno } = req.body; // 로그인한 사용자의 eno

        // 서비스 호출
        const message = await deleteJobPostingService(jpno, eno);

        res.status(200).json({
            status: "success",
            message: message,
        });
    } catch (error) {
        console.error("구인공고 삭제 실패:", error);
        res.status(500).json({ errorMessage: "구인공고 삭제 중 오류가 발생했습니다." });
    }
};

// 단일 조회
const getOneJobPosting = async (req, res) => {
    try {
        const { jpno } = req.params; // 공고 번호
        const { eno } = req.query; // 고용인 ID

        // 서비스 호출
        const jobPosting = await getOneJobPostingService(jpno, eno);

        res.status(200).json({
            status: "success",
            data: jobPosting,
        });
    } catch (error) {
        console.error("구인공고 단일 조회 실패:", error);
        res.status(500).json({ errorMessage: "구인공고 단일 조회 중 오류가 발생했습니다." });
    }
};

// 리스트 조회
const listJobPostings = async (req, res) => {
    try {
        const { eno } = req.query; // 고용인 ID

        // 서비스 호출
        const jobPostings = await listJobPostingsService(eno);

        res.status(200).json({
            status: "success",
            data: jobPostings,
        });
    } catch (error) {
        console.error("구인공고 리스트 조회 실패:", error);
        res.status(500).json({ errorMessage: "구인공고 리스트 조회 중 오류가 발생했습니다." });
    }
};

export { registerJobPosting, editJobPosting, deleteJobPosting, getOneJobPosting, listJobPostings };
