import models from "../models/index.js";
import PartTimerReadDTO from "../dto/partTimerdto/PartTimerReadDTO.js";
import PartTimerListDTO from "../dto/partTimerdto/PartTimerListDTO.js";
import {QueryTypes} from "sequelize";
import {sequelize} from "../config/MariaDB.js";

// 내 근로자 리스트 출력
const getMyPartTimerListService = async (eno, page, size) => {

    const offset = page - 1;

    try {
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
            LIMIT
                :offset, :size
            
        `;

        const results = await sequelize.query(query, {
            replacements: { eno, offset, size },
            type: QueryTypes.SELECT,
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
    } catch (error) {
        console.error("Error fetching part-timer list:", error);
        throw new Error("Failed to fetch part-timer list");
    }
};

//내 근로자 수 count
const getMyPartTimerCountService = async (eno) => {

    return await models.JobMatchings.count(eno);
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

export { getMyPartTimerListService, getMyPartTimerCountService, getPartTimerOneService };