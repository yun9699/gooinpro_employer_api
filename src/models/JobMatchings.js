import { DataTypes } from 'sequelize';
import { sequelize } from '../config/MariaDB.js';

const JobMatchings = sequelize.define('JobMatchings', {
    jmno: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    jmregdate: {    //매칭 된 시간
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    jmstartDate: {  //근무 시작일
        type: DataTypes.DATE,
        allowNull: false
    },
    jmendDate: {    //근무 종료일
        type: DataTypes.DATE,
        allowNull: true //정해지지 않을 수 있음
    },
    jmhourlyRate: { //시급(협의과정에서 달라질 수 있으므로 jobPosting 의 시급과 따로 저장)
        type: DataTypes.INTEGER,
        allowNull: false
    },
    jmworkDays: {   //근무 요일
        type: DataTypes.STRING,
        allownull: false,
        defaultValue: '0000000' //0 이면 근무 x, 1 이면 근무
    },
    jmdelete: { //삭제 여부
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    jmworkStartTime: {  //근무 시작시간
        type: DataTypes.TIME,
        allowNull: true
    },
    jmworkEndTime: {    //근무 종료시간
        type: DataTypes.TIME,
        allowNull: true
    }
}, {
    tableName: 'tbl_jobMatchings',
    timestamps: false
});

export default JobMatchings;
