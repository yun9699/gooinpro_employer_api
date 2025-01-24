import {sequelize} from "../config/db.js";
import {DataTypes} from "sequelize";

const Chatroom = sequelize.define('Chatroom', {

    erno: { // pk
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    pno: { // fk 근로자
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    admno: { // fk 관리자
        type: DataTypes.BIGINT,
        allowNull: false,
    }
}, {
    tableName: 'tbl_eChatroom',
    timestamps: false,
})

export default Chatroom;