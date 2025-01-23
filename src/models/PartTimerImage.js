
import {sequelize} from "../config/db.js";
import {DataTypes} from "sequelize";

//근로자
const PartTimerImage = sequelize.define('PartTimerImage', {

    pino: {  //Primary Key
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    pfilename: {
        type: DataTypes.STRING,
        allowNull: true
    }

}, {
    tableName: 'tbl_partTimerImage',  // 실제 테이블 이름을 지정
    timestamps: false            // Sequelize가 자동으로 생성하는 createdAt, updatedAt을 사용하지 않으면 false로 설정
});

export default PartTimerImage;