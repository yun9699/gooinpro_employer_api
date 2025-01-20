import {sequelize} from "../config/db.js";
import {DataTypes} from "sequelize";

const Qna = sequelize.define('qna', {

    qno: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    ccheckedTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    ccontent: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cdelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    cregdate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    eno: {
        type: DataTypes.BIGINT,
        allowNull: false,
        foreignKey: true,
        defaultValue: false,
    },
    pno: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: false,
        foreignKey: true,
    },
    ctitle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    canswer: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cstatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
}, {
    tableName: 'tbl_qna',
    timestamps: false,

})

export default Qna;