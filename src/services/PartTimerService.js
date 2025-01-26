import models from "../models/index.js";
import PartTimerReadDTO from "../dto/partTimerdto/PartTimerReadDTO.js";
import PartTimerListDTO from "../dto/partTimerdto/PartTimerListDTO.js";
import {col, fn, literal} from "sequelize";

// 내 근로자 리스트 출력
// select
// wl.pno,
//     max(jme.pname) as pname,
//     count(wlworkStatus) as workDaysCount,
//     sum(case when wlworkStatus = 0 then 1 else 0 end) as 'onTimeCount',
//     sum(case when wlworkStatus = 1 then 1 else 0 end) as 'lateCount',
//     sum(case when wlworkStatus = 2 then 1 else 0 end) as 'earlyLeaveCount',
//     sum(case when wlworkStatus = 3 then 1 else 0 end) as 'absenceCount'
// from
// tbl_workLogs wl join (
//     select
// jm.pno, pt.pname
// from
// tbl_jobMatchings jm
// join tbl_employer e on jm.eno = e.eno
// join tbl_partTimer pt on jm.pno = pt.pno
// where
// e.eno = 16 and jm.jmdelete = false
// ) jme on wl.pno = jme.pno
// group by
// wl.pno
// ;    --> Query
const getMyPartTimerListService = async (eno) => {

    const result = await models.WorkLogs.findAll({
        attributes: [
            'pno',
            [fn('max', col('jme.pname')), 'pname'],  // max(pname) as pname
            [fn('count', col('wlworkStatus')), 'workDaysCount'],
            [fn('sum', literal("CASE WHEN wlworkStatus = 0 THEN 1 ELSE 0 END")), 'onTimeCount'],
            [fn('sum', literal("CASE WHEN wlworkStatus = 1 THEN 1 ELSE 0 END")), 'lateCount'],
            [fn('sum', literal("CASE WHEN wlworkStatus = 2 THEN 1 ELSE 0 END")), 'earlyLeaveCount'],
            [fn('sum', literal("CASE WHEN wlworkStatus = 3 THEN 1 ELSE 0 END")), 'absenceCount']
        ],
        include: [
            {
                model: models.JobMatchings,
                as: 'jobMatchings',
                required: true,  // INNER JOIN
                where: {
                    eno: eno,
                    jmdelete: false,
                },
                include: [
                    {
                        model: models.Employer,
                        as: 'employer',
                        required: true,  // INNER JOIN
                    },
                    {
                        model: models.PartTimer,
                        as: 'partTimer',
                        required: true,  // INNER JOIN
                    }
                ]
            }
        ],
        group: ['WorkLogs.pno'],
        raw: true
    });

    return result.map(partTimer => new PartTimerListDTO(
        partTimer.pno,
        partTimer.pname,
        partTimer.workDaysCount,
        partTimer.onTimeCount,
        partTimer.lateCount,
        partTimer.earlyLeaveCount,
        partTimer.absenceCount
    ));
}

//내 근로자 상세 확인
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