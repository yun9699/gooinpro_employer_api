import {
    getApplicantReadService,
    getJobApplicationsCountService,
    getJobApplicationsListService,
    getMyPartTimerCountService,
    getMyPartTimerListService,
    getPartTimerOneService, getPartTimerPayByYearMonthService, getPartTImerPayByYearService,
    getPartTimerTotalPayService,
    getPartTimerWorkHistoryListService,
    getPartTimerWorkStatusService
} from "../services/PartTimerService.js";
import PageRequestDTO from "../dto/common/PageRequestDTO.js";
import PageResponseDTO from "../dto/common/PageResponseDTO.js";

//내 근로자 리스트 호출
const getMyPartTimerList = async (req, res) => {

    const { eno } = req.params;
    const size = req.query.size ? req.query.size : 10

    const dtoList = await getMyPartTimerListService(eno, req.query.page, size);
    const pageRequestDTO = new PageRequestDTO(req.query.page, req.query.size);
    const totalCount = await getMyPartTimerCountService(eno);

    const returnDTO = new PageResponseDTO(dtoList, pageRequestDTO, totalCount);

    res.status(200).json({
        status: 'success',
        data: returnDTO
    })
}

//내 직원 read
const getPartTimerOne = async (req, res) => {

    const { pno } = req.params;

    const partTimer = await getPartTimerOneService(pno);
    const workLogs = await getPartTimerWorkStatusService(pno);

    const data = { partTimer, workLogs }

    res.status(200).json({
        status: 'success',
        data: data,
    })
}

//내 직원 근태 확인
const getPartTimerWorkStatus = async (req, res) => {

    const { pno } = req.params;

    const workLogs = await getPartTimerWorkStatusService(pno);

    res.status(200).json({
        status: 'success',
        data: workLogs,
    })
}

//지원자 리스트 get
const getApplicantList = async (req, res) => {

    const { eno } = req.params;
    const size = req.query.size ? req.query.size : 10

    const dtoList = await getJobApplicationsListService(eno, req.query.page, size);
    const pageRequestDTO = new PageRequestDTO(req.query.page, req.query.size);
    const totalCount = await getJobApplicationsCountService(eno);

    console.log(dtoList);

    const returnDTO = new PageResponseDTO(dtoList, pageRequestDTO, totalCount);

    res.status(200).json({
        status: 'success',
        data: returnDTO
    })
}

//지원자 상세보기
const getApplicantOne = async (req, res) => {

    const { jpano, pno } = req.params;

    const applicant = await getApplicantReadService(jpano, pno);

    res.status(200).json({
        status: 'success',
        data: applicant,
    })
}

//근로자 경력 리스트 get
const getPartTimerWorkHistory = async (req, res) => {

    const { pno } = req.params;
    const size = req.query.size ? req.query.size : 10

    const workHistory = await getPartTimerWorkHistoryListService(pno, req.query.page, size);

    res.status(200).json({
        status: 'success',
        data: workHistory
    })
}

//employer 한명 지출한 총 급여 계산
const getPartTimerTotalPay = async (req, res) => {

    const { eno } = req.params;

    const totalPay = await getPartTimerTotalPayService(eno);

    res.status(200).json({
        status: 'success',
        data: totalPay
    })
}

//연,월 선택 나간 급여 확인
const getPartTimerPayByYearMonth = async (req, res) => {

    const { eno } = req.params;
    const month = req.query.month;
    const year = req.query.year;

    const pay = await getPartTimerPayByYearMonthService(eno, month, year);

    res.status(200).json({
        status: 'success',
        data: pay
    })
}

//연도 선택 나간 급여 확인
const getPartTImerPayByYear = async (req, res) => {

    const { eno } = req.params;
    const year = req.query.year;

    const pay = await getPartTImerPayByYearService(eno, year);

    res.status(200).json({
        status: 'success',
        data: pay
    })
}

export {
    getMyPartTimerList, getPartTimerOne, getPartTimerWorkStatus, getApplicantList,
    getApplicantOne, getPartTimerWorkHistory, getPartTimerTotalPay, getPartTimerPayByYearMonth,
    getPartTImerPayByYear
}