import {sequelize} from "../config/db.js";

const Chatroom = sequelize.define('Chatroom', {

    rno: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    

})