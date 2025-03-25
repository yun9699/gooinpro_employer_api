import models from "../models/index.js";
import PartTimerReadDTO from "../dto/partTimerdto/PartTimerReadDTO.js";
import PartTimerListDTO from "../dto/partTimerdto/PartTimerListDTO.js";
import {sequelize} from "../config/MariaDB.js";
import {col, fn, literal, QueryTypes} from "sequelize";
import PartTimerWorkStatusDTO from "../dto/partTimerdto/PartTimerWorkStatusDTO.js";
import ApplicantListDTO from "../dto/partTimerdto/ApplicantListDTO.js";
import ApplicantReadDTO from "../dto/partTimerdto/ApplicantReadDTO.js";
import PartTimerWorkHistoryDTO from "../dto/partTimerdto/PartTimerWorkHistoryDTO.js";
import PartTimerWithPayListDTO from "../dto/partTimerdto/PartTimerWithPayListDTO.js";

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
const getJobApplicationsListService = async (jpno, page, size) => {

    const offset = page - 1;

    const result = await sequelize.query(
        `
            select
                jpa.jpano, pi.pifilename, p.pname, jp.jpname, jpa.jpahourlyRate, p.pno
            from
                tbl_jobPostingApplication jpa
                left join tbl_jobPostings jp on jpa.jpno = jp.jpno
                left join tbl_partTimer p on jpa.pno = p.pno
                left join tbl_partTimerImage pi on jpa.pno = pi.pno
            where
                jpa.jpadelete = false and jp.jpno = :jpno
            order by
                jpano
            limit
                0, 10
            `,
        {
            type: QueryTypes.SELECT,
            replacements: { jpno, offset, limit: Number(size) }
        }
    )

    return result.map(
        (row) =>
            new ApplicantListDTO(row.jpano, row.pifilename, row.pname, row.jpname, row.jpahourlyRate, row.pno)
    )
}

// 내 지원자 수 count
const getJobApplicationsCountService = async (jpno) => {

    return models.JobPostingApplication.count({
        where: {
            jpno: jpno,
            jpadelete: false
        }
    });
}

//지원자 상세보기
const getApplicantReadService = async (jpano) => {

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
                jpa.jpano = :jpano
    `,
        {
            type: QueryTypes.SELECT,
            replacements: { jpano }
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

    return result.map((row) => {

        const workPeriod = row.jmendDate
            ? Math.ceil((new Date(row.jmendDate) - new Date(row.jmstartDate)) / (1000 * 60 * 60 * 24))
            : null;

        return new PartTimerWorkHistoryDTO(row.jpname, row.jmstartDate, row.jmendDate, workPeriod);
    });
}

//employer 한명 지출한 총 급여 계산
const getPartTimerTotalPayService = async (eno) => {

    const result = await sequelize.query(
        `
        select
            SUM(jmhourlyRate * TIMESTAMPDIFF(MINUTE, wlstartTime, wlendTime) / 60) AS data
        FROM
            tbl_jobMatchings jm
            LEFT JOIN tbl_workLogs wl ON jm.jmno = wl.jmno
        WHERE
            jm.eno = :eno
            AND wlstartTime IS NOT NULL
            AND wlendTime IS NOT NULL
        `,
        {
            type: QueryTypes.SELECT,
            replacements: { eno }
        }
    )

    return result[0];
}

//연도, 월 선택 나간 급여 확인
const getPartTimerPayByYearMonthService = async (eno, month, year) => {

    const result = await sequelize.query(
        `
            select
                SUM(jmhourlyRate * TIMESTAMPDIFF(MINUTE, wlstartTime, wlendTime) / 60) AS sum
            FROM
                tbl_jobMatchings jm
                LEFT JOIN tbl_workLogs wl ON jm.jmno = wl.jmno
            WHERE
                jm.eno = :eno
              AND wlstartTime IS NOT NULL
              AND wlendTime IS NOT NULL
              AND MONTH(wlstartTime) = :month
              AND YEAR(wlstartTime) = :year
        `, {
            type: QueryTypes.SELECT,
            replacements: { eno, month, year }
        }
    )

    return result[0];
}

//연도 선택 나간 급여 확인
const getPartTImerPayByYearService = async (eno, year) => {

    const result = await sequelize.query(
        `
            select
                SUM(jmhourlyRate * TIMESTAMPDIFF(MINUTE, wlstartTime, wlendTime) / 60) AS sum
            FROM
                tbl_jobMatchings jm
                LEFT JOIN tbl_workLogs wl ON jm.jmno = wl.jmno
            WHERE
                jm.eno = :eno
              AND wlstartTime IS NOT NULL
              AND wlendTime IS NOT NULL
              AND YEAR(wlstartTime) = :year
        `, {
            type: QueryTypes.SELECT,
            replacements: { eno, year }
        }
    )

    return result[0];
}

//근로자 리스트(급여 나옴)
const getPartTimerListWithPayService = async (eno, year, month, page, size) => {

    const offset = page - 1;

    const result = await sequelize.query(
        `
        select
            p.pno, max(p.pname), jp.jpname, max(jm.jmhourlyRate),
            SUM(jm.jmhourlyRate * TIMESTAMPDIFF(MINUTE, wl.wlstartTime, wl.wlendTime) / 60) AS sum
        from
            tbl_partTimer p
            left join tbl_jobMatchings jm on p.pno = jm.pno
            left join tbl_workLogs wl on jm.jmno = wl.jmno
            left join tbl_jobPostings jp on jm.jpno = jp.jpno
        where
            jm.eno = :eno
            and wl.wlstartTime is not null
            and wl.wlendTime is not null
            and month(wl.wlstartTime) = :month
            and year(wl.wlstartTime) = :year
        group by
            p.pno, jp.jpname
        limit
            :offset, :limit
        `, {
            type: QueryTypes.SELECT,
            replacements: { eno, month, year, offset, limit: Number(size) }
        }
    )

    return result.map(
        (row) =>
            new PartTimerWithPayListDTO(row.pno, row.pname, row.jpname, row.jmhourlyRate, row.sum)
    )
}

//근로자 리스트(급여) - count
const getPartTimerListWithPayCountService = async (eno, year, month) => {

    const result = await sequelize.query(
        `
        select
            count(*)
        from
            tbl_partTimer p
            left join tbl_jobMatchings jm on p.pno = jm.pno
            left join tbl_workLogs wl on jm.jmno = wl.jmno
            left join tbl_jobPostings jp on jm.jpno = jp.jpno
        where
            jm.eno = :eno
            and wl.wlstartTime is not null
            and wl.wlendTime is not null
            and month(wl.wlstartTime) = :month
            and year(wl.wlstartTime) = :year
        `, {
            type: QueryTypes.SELECT,
            replacements: { eno, month, year }
        }
    )

    const data = result[0];

    return data['count(*)'];
}

const getAcceeptJobApplicationService = async (jpano, status) => {

    console.log(jpano, status);

    if(status == 1) {
        const result = await sequelize.query(
            `
            update
                tbl_jobPostingApplication
            set
                jpastatus = 1
            where
                jpano = :jpano
            `, {
                type: QueryTypes.UPDATE,
                replacements: {jpano: jpano}
            }
        );
        const jobPostingApplication = await sequelize.query(
            `
            select jpano, jpahourlyRate from tbl_jobPostingApplication
            where jpano = :jpano
            `, {
                type: QueryTypes.SELECT,
                replacements: {jpano: jpano}
            });

        const jobPosting = await sequelize.query(
            `
            select eno, jpworkStartTime, jpworkEndTime, jpmaxDuration, jpminDuration, jpworkDays from tbl_jobPostings
            where jpno = :jpano
            `, {
                type: QueryTypes.SELECT,
                replacements: { jpano: jobPostingApplication[0].jpano }
            });

        // DATETIME 형식으로 시간 변환
        const currentDate = new Date().toISOString().split('T')[0]; // 현재 날짜 (yyyy-mm-dd)만 추출
        const jmworkStartTime = `${currentDate} ${jobPosting[0].jpworkStartTime}`; // 날짜 + 시간 결합
        const jmworkEndTime = `${currentDate} ${jobPosting[0].jpworkEndTime}`; // 날짜 + 시간 결합

        const createResult = await sequelize.query(
            `
            insert into tbl_jobMatchings (jmregdate, jmstartDate, jmhourlyRate, jmworkDays, jmworkStartTime, jmworkEndTime)
            values (NOW(), NOW(), :jmhourlyRate, :jmworkDays, :jmworkStartTime, :jmworkEndTime)
            `, {
                type: QueryTypes.INSERT,
                replacements: {
                    jmhourlyRate: jobPostingApplication[0].jpahourlyRate,
                    jmworkDays: jobPosting[0].jpworkDays,
                    jmworkStartTime: jmworkStartTime,
                    jmworkEndTime: jmworkEndTime
                }
            });
    } else{
        const result = await sequelize.query(
            `
            update
                tbl_jobPostingApplication
            set
                jpastatus = 2
            where
                jpano = :jpano
            `, {
                type: QueryTypes.UPDATE,
                replacements: {jpano: jpano}
            }
        )
    }
}

export {
    getMyPartTimerListService, getMyPartTimerCountService, getPartTimerOneService, getPartTimerWorkStatusService,
    getJobApplicationsListService, getJobApplicationsCountService, getApplicantReadService,
    getPartTimerWorkHistoryListService, getPartTimerTotalPayService, getPartTimerPayByYearMonthService,
    getPartTImerPayByYearService, getPartTimerListWithPayService, getPartTimerListWithPayCountService,
    getAcceeptJobApplicationService
};