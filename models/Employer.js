import {sequelize} from "../config/db.js";
import {DataTypes} from "sequelize";

const Employer = sequelize.define('Employer', {

    eno: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    eemail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    epw: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ename: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ebirth: {
        type: DataTypes.DATE,
        allowNull: true
    },
    egender: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    edelete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    eregdate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'tbl_employer',  // 실제 테이블 이름을 지정
    timestamps: false            // Sequelize가 자동으로 생성하는 createdAt, updatedAt을 사용하지 않으면 false로 설정
})

export default Employer;