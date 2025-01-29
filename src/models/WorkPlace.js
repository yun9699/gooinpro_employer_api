import {sequelize} from "../config/db.js";
import {DataTypes} from "sequelize";

//근무지 주소
const WorkPlace = sequelize.define('WorkPlace', {

    wpno: {  //Primary Key
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    eno: {  // Foreign Key - 관계는 index.js에서 설정
        type: DataTypes.BIGINT,
        allowNull: false
    },
    wroadAddress: { //도로명 주소
        type: DataTypes.STRING,
        allowNull: false
    },
    wdetailAddress: {   //상세 주소
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'tbl_workPlace',  // 실제 테이블 이름을 지정
    timestamps: false            // Sequelize가 자동으로 생성하는 createdAt, updatedAt을 사용하지 않으면 false로 설정
});

export default WorkPlace;