import {
    getApplicantReadService,
    getJobApplicationsCountService,
    getJobApplicationsListService,
    getMyPartTimerCountService,
    getMyPartTimerListService,
    getPartTimerOneService, getPartTimerWorkStatusService
} from "../services/PartTimerService.js";
import PageRequestDTO from "../dto/common/PageRequestDTO.js";
import PageResponseDTO from "../dto/common/PageResponseDTO.js";

//내 근로자 리스트 호출
const getMyPartTimerList = async (req, res) => {

    const { eno } = req.params;

    const dtoList = await getMyPartTimerListService(eno, req.query.page, req.query.size);
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

    const dtoList = await getJobApplicationsListService(eno, req.query.page, req.query.size);
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

export {
    getMyPartTimerList, getPartTimerOne, getPartTimerWorkStatus, getApplicantList,
    getApplicantOne
}