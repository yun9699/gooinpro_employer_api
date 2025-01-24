import {getMyPartTimerListService, getPartTimerOneService} from "../services/PartTimerService.js";

const getMyPartTimerList = async (req, res) => {

    const { eno } = req.params;

    const partTimers = await getMyPartTimerListService(eno);

    res.status(200).json({
        status: 'success',
        data: partTimers
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