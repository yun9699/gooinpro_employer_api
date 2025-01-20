import {sequelize} from "../config/db.js";
import {DataTypes} from "sequelize";

const WorkLogs = sequelize.define('WorkLogs', {

    wlno: { //Primary Key
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

})

export default WorkLogs;