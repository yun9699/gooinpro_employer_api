
import {sequelize} from "../config/MariaDB.js";
import {DataTypes} from "sequelize";

//근태
const WorkLogs = sequelize.define('WorkLogs', {

    wlno: { //Primary Key
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    wlstartTime: {  //출근 시간
        type: DataTypes.DATE,
        allowNull: true
    },
    wlendTime: {    //퇴근 시간
        type: DataTypes.DATE,
        allowNull: true
    },
    wlworkStatus: { //근태 상태(0: 정상 출근, 1: 지각, 2: 조퇴, 3: 결근)
        type: DataTypes.TINYINT,
        allowNull: true
    },
    wlregdate: {    //테이블 생성 시간
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    wlchangedStartTime: {   //변경 된 출근 시간
        type: DataTypes.TIME,
        allowNull: true
    },
    wlchangedEndTime: { //변경 된 ㅗ티근 시간
        type: DataTypes.TIME,
        allowNull: true
    }
}, {
    tableName: 'tbl_workLogs',  // 실제 테이블 이름을 지정
    timestamps: false            // Sequelize가 자동으로 생성하는 createdAt, updatedAt을 사용하지 않으면 false로 설정
});

export default WorkLogs;