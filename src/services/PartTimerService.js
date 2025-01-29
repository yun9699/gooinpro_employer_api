import models from "../models/index.js";
import PartTimerReadDTO from "../dto/partTimerdto/PartTimerReadDTO.js";
import PartTimerListDTO from "../dto/partTimerdto/PartTimerListDTO.js";
import {sequelize} from "../config/MariaDB.js";
import {col, fn, literal, QueryTypes} from "sequelize";
import PartTimerWorkStatusDTO from "../dto/partTimerdto/PartTimerWorkStatusDTO.js";
import ApplicantListDTO from "../dto/partTimerdto/ApplicantListDTO.js";

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
            replacements: { eno, offset, limit: Number(size) }, // 파라미터 바인딩
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

    return await models.JobMatchings.count({
        distinct: true,
        where: {
            eno: eno,
            jmdelete: false
        },
        col: 'pno'
    });
}


//내 근로자 상세 확인
const getPartTimerOneService = async (pno) => {

    const result = await sequelize.query(
        `
        select
            pi.pifilename, p.pname, p.pgender, p.pbirth, p.pemail,
            jp.jpname
        from
            tbl_partTimer p
            join tbl_jobMatchings jm on p.pno = jm.pno
            join tbl_jobPostings jp on jm.jpno = jp.jpno
            left join tbl_partTimerImage pi on p.pno = pi.pno
        where
            p.pno = :pno
            `,
        {
            type: QueryTypes.SELECT,
            replacements: { pno }
        }
    )

    const partTimer = result[0];

    return new PartTimerReadDTO(
        partTimer.pifilename,
        partTimer.pname,
        partTimer.pgender,
        partTimer.pbirth,
        partTimer.jpname,
        partTimer.pemail
    )
}

//partTimer 별 근태 현황
const getPartTimerWorkStatusService = async (pno) => {

    const result = await models.WorkLogs.findAll({
        attributes: [
            [fn('count', col('wlworkStatus')), 'workDaysCount'],
            [fn('sum', literal('CASE WHEN wlworkStatus = 0 THEN 1 ELSE 0 END')), 'onTimeCount'],
            [fn('sum', literal('CASE WHEN wlworkStatus = 1 THEN 1 ELSE 0 END')), 'lateCount'],
            [fn('sum', literal('CASE WHEN wlworkStatus = 2 THEN 1 ELSE 0 END')), 'earlyLeaveCount'],
            [fn('sum', literal('CASE WHEN wlworkStatus = 3 THEN 1 ELSE 0 END')), 'absenceCount'],
        ],
        where: {
            pno: pno
        },
        raw: true //결과를 Sequelize 객체가 아닌 JavaScript 객체로 반환
    })

    const workStatus = result[0];

    return new PartTimerWorkStatusDTO(
        workStatus.workDaysCount,
        workStatus.onTimeCount,
        workStatus.lateCount,
        workStatus.earlyLeaveCount,
        workStatus.absenceCount
    )
}

//내 지원자 리스트 출력
const getJobApplicationsListService = async (eno, page, size) => {

    const offset = page - 1;

    const result = await models.PartTimer.findAll({
        attributes: ['pname'],
        include: [
            {
                model: models.JobPostings,
                as: 'JobPostings',
                attributes: ['jpname'],
            },
            {
                model: models.JobPostingApplication,
                as: 'JobPostingApplication',
                attributes: ['pno'],
                where: {
                    eno: eno,
                    jpadelete: false
                }
            },
            {
                model: models.PartTimerImage,
                as: 'PartTimerImage',
                attributes: ['pifilename'],
            },
        ],
        order: [['pno', 'ASC']], // pno ascending
        limit: size,
        offset: offset,
        replacements: { eno }
    });

    return result.map(
        (row) =>
            new ApplicantListDTO(row.pno, row.pifilename, row.pname, row.jpname, row.jpahourlyRate)
    )
}

// 내 지원자 수 count
const getJobApplicationsCountService = async (eno) => {

    return await models.JobPostingApplication.count({
        where: {
            eno: eno,
            jpadelete: false
        }
    })
}

export {
    getMyPartTimerListService, getMyPartTimerCountService, getPartTimerOneService, getPartTimerWorkStatusService,
    getJobApplicationsListService, getJobApplicationsCountService
};