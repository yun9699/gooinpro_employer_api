import {
    getMyPartTimerCountService,
    getMyPartTimerListService,
    getPartTimerOneService
} from "../services/PartTimerService.js";
import PageRequestDTO from "../dto/common/PageRequestDTO.js";
import PageResponseDTO from "../dto/common/PageResponseDTO.js";

const getMyPartTimerList = async (req, res) => {

    const { eno } = req.params;

    console.log(req.query);

    const dtoList = await getMyPartTimerListService(eno, 1, 10);
    const pageRequestDTO = new PageRequestDTO(req.query.page, req.query.size);
    const totalCount = await getMyPartTimerCountService(eno);

    const returnDTO = new PageResponseDTO(dtoList, pageRequestDTO, totalCount);

    res.status(200).json({
        status: 'success',
        data: returnDTO
    })
}

const getPartTimerOne = async (req, res) => {

    const { pno } = req.params;

    const partTimer = await getPartTimerOneService(pno);

    console.log(partTimer);

    res.status(200).json({
        status: 'success',
        data: partTimer
    })
}

export { getMyPartTimerList, getPartTimerOne }