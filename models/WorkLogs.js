import {sequelize} from "../config/db.js";
import {DataTypes} from "sequelize";
import Employer from "./Employer.js";
import PartTimer from "./PartTimer.js";

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
});

WorkLogs.belongsTo(Employer, {foreignKey: 'eno'});
WorkLogs.belongsTo(PartTimer, {foreignKey: 'pno'});

export default WorkLogs;