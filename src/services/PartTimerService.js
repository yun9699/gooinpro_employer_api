import models from "../models/index.js";
import PartTimerReadDTO from "../dto/partTimerdto/PartTimerReadDTO.js";
import PartTimerListDTO from "../dto/partTimerdto/PartTimerListDTO.js";
import {QueryTypes} from "sequelize";
import {sequelize} from "../config/MariaDB.js";

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
    const query = `
        SELECT
            wl.pno,
            MAX(jme.pname) AS pname,
            COUNT(wl.wlworkStatus) AS workDaysCount,
            SUM(CASE WHEN wl.wlworkStatus = 0 THEN 1 ELSE 0 END) AS onTimeCount,
            SUM(CASE WHEN wl.wlworkStatus = 1 THEN 1 ELSE 0 END) AS lateCount,
            SUM(CASE WHEN wl.wlworkStatus = 2 THEN 1 ELSE 0 END) AS earlyLeaveCount,
            SUM(CASE WHEN wl.wlworkStatus = 3 THEN 1 ELSE 0 END) AS absenceCount
        FROM
            tbl_workLogs wl
        JOIN (
            SELECT
                jm.pno,
                pt.pname
            FROM
                tbl_jobMatchings jm
            JOIN tbl_employer e ON jm.eno = e.eno
            JOIN tbl_partTimer pt ON jm.pno = pt.pno
            WHERE
                e.eno = :eno AND jm.jmdelete = FALSE
        ) jme ON wl.pno = jme.pno
        GROUP BY
            wl.pno
    `;

    const results = await sequelize.query(query, {
        replacements: { eno }, // :eno 바인딩
        type: QueryTypes.SELECT, // SELECT 쿼리 타입 명시
    });

    return results.map(partTimer => new PartTimerListDTO(
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