import models from "../models/index.js";
import PartTimerReadDTO from "../dto/partTimerdto/PartTimerReadDTO.js";
import PartTimerListDTO from "../dto/partTimerdto/PartTimerListDTO.js";
import {sequelize} from "../config/MariaDB.js";
import {QueryTypes} from "sequelize";

// 내 근로자 리스트 출력
const getMyPartTimerListService = async (eno, page, size) => {

    const offset = page - 1;

    // Raw Query 실행
    const result = await sequelize.query(
        `
    SELECT
        jm.pno, 
        pi.pifilename, 
        p.pname, 
        jp.jpname
    FROM
        tbl_jobMatchings jm
        JOIN tbl_partTimer p ON jm.pno = p.pno
        LEFT JOIN tbl_partTimerImage pi ON jm.pno = pi.pno
        JOIN tbl_jobPostings jp ON jm.jpno = jp.jpno
    WHERE
        jm.eno = :eno
    ORDER BY
        jm.pno ASC
    LIMIT
        :offset, :limit
    `,
        {
            type: QueryTypes.SELECT,
            replacements: { eno, offset, limit: size }, // 파라미터 바인딩
        }
    );

    // 결과를 DTO 형식으로 매핑
    return result.map(
        (row) =>
            new PartTimerListDTO(row.pno, row.pifilename, row.pname, row.jpname)
    );
}

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
            partTimer.pbirth,
            partTimer.pgender,
            partTimer.proadAddress,
            partTimer.pdetailAddress
        )
    }
}

export { getMyPartTimerListService, getMyPartTimerCountService, getPartTimerOneService };