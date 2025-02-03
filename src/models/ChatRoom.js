import {sequelize} from "../config/MariaDB.js";
import {DataTypes} from "sequelize";
import PartTimer from "./PartTimer.js";
import Admin from "./Admin.js";
import Employer from "./Employer.js";

const Chatroom = sequelize.define('Chatroom', {

    rno: { // pk
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    pno: { // fk 근로자
        type: DataTypes.BIGINT,
        allowNull: true,
        foreignKey: true,
    },
    admno: { // fk 관리자
        type: DataTypes.BIGINT,
        allowNull: true,
        foreignKey: true,
    },
    eno: {
        type: DataTypes.BIGINT,
        allowNull: true,
        foreignKey: true,
    }
}, {
    tableName: 'tbl_chatroom',
    timestamps: false,
})
Chatroom.belongsTo(PartTimer, { foreignKey: 'pno' });
Chatroom.belongsTo(Admin, { foreignKey: 'admno' });
Chatroom.belongsTo(Employer, { foreignKey: 'eno' });

export default Chatroom;