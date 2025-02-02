import models from "../models/index.js";
import PartTimerReadDTO from "../dto/partTimerdto/PartTimerReadDTO.js";
import PartTimerListDTO from "../dto/partTimerdto/PartTimerListDTO.js";
import {sequelize} from "../config/MariaDB.js";
import {col, fn, literal, QueryTypes} from "sequelize";
import PartTimerWorkStatusDTO from "../dto/partTimerdto/PartTimerWorkStatusDTO.js";
import ApplicantListDTO from "../dto/partTimerdto/ApplicantListDTO.js";
import ApplicantReadDTO from "../dto/partTimerdto/ApplicantReadDTO.js";
import PartTimerWorkHistoryDTO from "../dto/partTimerdto/PartTimerWorkHistoryDTO.js";

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

    const result = await sequelize.query(
        `
            select
                jpa.pno, pi.pifilename, p.pname, jp.jpname, jpa.jpahourlyRate
            from
                tbl_jobPostingApplication jpa
                left join tbl_jobPostings jp on jpa.jpno = jp.jpno
                left join tbl_partTimer p on jpa.pno = p.pno
                left join tbl_partTimerImage pi on jpa.pno = pi.pno
            where
                jpa.jpadelete = false and jp.eno = :eno
            order by
                pno
            limit
                0, 10
            `,
        {
            type: QueryTypes.SELECT,
            replacements: { eno, offset, limit: Number(size) }
        }
    )

    return result.map(
        (row) =>
            new ApplicantListDTO(row.pno, row.pifilename, row.pname, row.jpname, row.jpahourlyRate)
    )
}

// 내 지원자 수 count
const getJobApplicationsCountService = async (eno) => {

    return models.JobPostingApplication.count({
        include: [
            {
                model: models.JobPostings,
                where: { eno: eno },
                required: true // INNER JOIN
            }
        ]
    });
}

//지원자 상세보기
const getApplicantReadService = async (jpano, pno) => {

    const result = await sequelize.query(
        `
            select
                pi.pifilename, p.pname, p.pgender, p.pbirth,
                jpa.jpahourlyRate, jpa.jpacontent
            from
                tbl_partTimer p
                join tbl_jobPostingApplication jpa on p.pno = jpa.pno
                left join tbl_partTimerImage pi on p.pno = pi.pno
            where
                p.pno = :pno and jpa.jpano = :jpano
    `,
        {
            type: QueryTypes.SELECT,
            replacements: { jpano, pno}
        }
    )

    const applicant = result[0];

    return new ApplicantReadDTO(

        applicant.pifilename,
        applicant.pname,
        applicant.pgender,
        applicant.pbirth,
        applicant.jpahourlyRate,
        applicant.jpacontent
    )
}

//근로자 이력 리스트
const getPartTimerWorkHistoryListService = async (pno, page, size) => {

    const offset = page - 1;

    const result = await sequelize.query(
        `
        select
            jp.jpname, pjm.jmstartDate, pjm.jmendDate
        from
            tbl_jobPostings jp
            join (
                select
                    jm.jpno, jm.jmstartDate, jm.jmendDate
                from
                    tbl_partTimer p
                    join tbl_jobMatchings jm on p.pno = jm.pno
                where
                    p.pno = :pno
            ) pjm on jp.jpno = pjm.jpno
        order by
            pjm.jmstartDate desc
        limit
            :offset, :limit
        `,
        {
            type: QueryTypes.SELECT,
            replacements: { pno, offset, limit: Number(size) }
        }
    )

    const workHistory = result.map((row) => {

        const workPeriod = row.jmendDate
            ? Math.ceil((new Date(row.jmendDate) - new Date(row.jmstartDate)) / (1000 * 60 * 60 * 24))
            : null;

        return new PartTimerWorkHistoryDTO(row.jpname, row.jmstartDate, row.jmendDate, workPeriod);
    });

    return workHistory;

}

export {
    getMyPartTimerListService, getMyPartTimerCountService, getPartTimerOneService, getPartTimerWorkStatusService,
    getJobApplicationsListService, getJobApplicationsCountService, getApplicantReadService,
    getPartTimerWorkHistoryListService
};