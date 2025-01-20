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
})

export default PartTimerDocumentImage;