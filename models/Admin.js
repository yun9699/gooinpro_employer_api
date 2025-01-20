

import {sequelize} from "../config/db.js";
import {DataTypes} from "sequelize";


const Admin = sequelize.define('Admin', {

    admno: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    admdelete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    admid: {
        type: DataTypes.STRING,
        allowNUll: false,
    },
    admname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    admpw: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    admregdate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    admrole: {
        type: DataTypes.STRING,
        allowNull: false,
    }

}, {
    tableName: 'tbl_admin',  // 실제 테이블 이름을 지정
    timestamps: false            // Sequelize가 자동으로 생성하는 createdAt, updatedAt을 사용하지 않으면 false로 설정
})

export default Admin;