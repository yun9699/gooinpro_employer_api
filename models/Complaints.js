import {sequelize} from "../config/db.js";
import {DataTypes} from "sequelize";
import Employer from "./Employer.js";
import PartTimer from "./PartTimer.js";


const Complaints = sequelize.define('Complaints', {

    cno: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    ctitle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ccontent: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cregdate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    ccheckedTime: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    cdelete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    cname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    canswer: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cstatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    tableName: 'tbl_complaints',  // 실제 테이블 이름을 지정
    timestamps: false            // Sequelize가 자동으로 생성하는 createdAt, updatedAt을 사용하지 않으면 false로 설정
})

export default Complaints;