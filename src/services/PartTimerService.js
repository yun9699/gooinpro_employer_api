
import models from "../models/index.js";
import PartTimerReadDTO from "../dto/partTimerdto/PartTimerReadDTO.js";

const getMyPartTimerListService = async (eno) => {

    const partTimers = await models.PartTimer.findAll({

        include: [
            {
                model: models.JobMatchings,
                attributes: [ "pno" ],
                where: { eno }
            }
        ]
    })

    console.log(JSON.stringify(partTimers, null, 2)); // 보기 좋게 출력

    return partTimers;
}

const getPartTimerOneService = async (pno) => {

    const partTimer = await models.PartTimer.findOne({ where: { pno }})

    console.log(pno);
    console.log(partTimer);

    if(partTimer) {
        return new PartTimerReadDTO(

            partTimer.pno,
            partTimer.pname,
            partTimer.pemail,
            partTimer.pgender,
            partTimer.pbirth,
            partTimer.proadAddress,
            partTimer.pdetailAddress
        )
    }
}

export { getMyPartTimerListService, getPartTimerOneService };