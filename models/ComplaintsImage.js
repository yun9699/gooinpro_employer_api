

import {sequelize} from "../config/db.js";
import {DataTypes} from "sequelize";
import Employer from "./Employer.js";
import PartTimer from "./PartTimer.js";


const ComplaintsImage = sequelize.define('ComplaintsImage', {

    cno: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
}, {
    tableName: 'tbl_complaints',  // 실제 테이블 이름을 지정
    timestamps: false            // Sequelize가 자동으로 생성하는 createdAt, updatedAt을 사용하지 않으면 false로 설정
})

export default Complaints;