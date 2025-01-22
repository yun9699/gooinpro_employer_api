import {sequelize} from "../config/db.js";
import {DataTypes} from "sequelize";

const Chatroom = sequelize.define('Chatroom', {

    erno: { // pk
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
}, {
    tableName: 'tbl_eChatroom',
    timestamps: false,
})

export default Chatroom;