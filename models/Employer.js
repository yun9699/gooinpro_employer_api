
import {sequelize} from "../config/db.js";
import {DataTypes} from "sequelize";

//고용인
const Employer = sequelize.define('Employer', {

    eno: {  //pk
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    eemail: {   //Employer Email
        type: DataTypes.STRING,
        allowNull: false
    },
    epw: {  //Employer Password
        type: DataTypes.STRING,
        allowNull: false
    },
    ename: {    //Employer Name
        type: DataTypes.STRING,
        allowNull: false
    },
    ebirth: {   //생일
        type: DataTypes.DATE,
        allowNull: true
    },
    egender: {  //성별(true: 남자, false: 여자)
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    edelete: {  //soft delete flag
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    eregdate: { //등록 시간
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'tbl_employer',  // 실제 테이블 이름을 지정
    timestamps: false            // Sequelize가 자동으로 생성하는 createdAt, updatedAt을 사용하지 않으면 false로 설정
});

export default Employer;