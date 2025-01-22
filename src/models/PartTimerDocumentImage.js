import {sequelize} from "../config/db.js";
import {DataTypes} from "sequelize";

//근로자 서류 사진
const PartTimerDocumentImage = sequelize.define("PartTimerDocumentImage", {

    pdino: {    //Primary Key
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    pdifilename: {  //파일 이름
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'tbl_partTimerDocumentImage',  // 실제 테이블 이름을 지정
    timestamps: false            // Sequelize가 자동으로 생성하는 createdAt, updatedAt을 사용하지 않으면 false로 설정
});

export default PartTimerDocumentImage;