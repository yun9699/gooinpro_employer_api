
import {sequelize} from "../config/db.js";
import {DataTypes} from "sequelize";

//근로자
const PartTimer = sequelize.define('PartTimer', {

    pno: {  //Primary Key
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    pemail: {   //email
        type: DataTypes.STRING,
        allowNull: false
    },
    ppw: {  //password
        type: DataTypes.STRING,
        allowNull: false
    },
    pname: {    //Name
        type: DataTypes.STRING,
        allowNull: false
    },
    pbirth: {   //생일
        type: DataTypes.DATE,
        allowNull: false
    },
    pgender: {  //성별(true: male, false: female)
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    pdelete: {  //softDelete flag
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    pregdate: { //등록 시간
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    proadAddress: { //도로명 주소
        type: DataTypes.STRING,
        allowNull: true
    },
    pdetailAddress: {   //상세 주소
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'tbl_partTimer',  // 실제 테이블 이름을 지정
    timestamps: false            // Sequelize가 자동으로 생성하는 createdAt, updatedAt을 사용하지 않으면 false로 설정
});

export default PartTimer;