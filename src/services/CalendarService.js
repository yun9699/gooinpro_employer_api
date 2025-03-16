
//달력 데이터 전송
import {sequelize} from "../config/MariaDB.js";
import {QueryTypes} from "sequelize";
import CalenderDTO from "../dto/calendardto/CalenderDTO.js";

const getCalendarDataService = async (eno, year, month) => {

    const result = await sequelize.query(
        `
            WITH RECURSIVE date_series AS (
                -- 시작 날짜부터 종료 날짜까지 모든 날짜 생성
                SELECT
                DATE(MIN(jmstartDate)) AS work_date
            FROM
                tbl_jobMatchings
            UNION ALL
            SELECT
                DATE_ADD(work_date, INTERVAL 1 DAY)
            FROM
                date_series
            WHERE
                work_date < (SELECT DATE(MAX(jmendDate)) FROM tbl_jobMatchings)
                )
            SELECT
                DATE(ds.work_date) AS date,
                JSON_ARRAYAGG(
                JSON_OBJECT(
                'pname', p.pname,
                'jmworkstartTime', TIME_FORMAT(jm.jmworkStartTime, '%H:%i'),
                'jmworkendTime', TIME_FORMAT(jm.jmworkEndTime, '%H:%i')
                )
                ) AS workers
            FROM
                date_series ds
                JOIN tbl_jobMatchings jm
            ON ds.work_date BETWEEN DATE(jm.jmstartDate) AND DATE(jm.jmendDate)
                JOIN tbl_partTimer p
                ON jm.pno = p.pno
            WHERE
                jm.eno = :eno
              AND SUBSTRING(jm.jmworkDays, WEEKDAY(ds.work_date) + 1, 1) = '1'
              AND YEAR(ds.work_date) = :year
              AND MONTH(ds.work_date) = :month
            GROUP BY
                ds.work_date
            ORDER BY
                ds.work_date;
        `,
        {
            type: QueryTypes.SELECT,
            replacements: { eno, month, year }
        }
    )

    return result.map(
        (row) =>
            new CalenderDTO(row.date, row.workers)
    );
}

export { getCalendarDataService }