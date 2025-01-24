import {sequelize} from "../config/MariaDB.js";
import {DataTypes} from "sequelize";

const Qna = sequelize.define('qna', {

    qno: { //pk
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    ccheckedTime: { // 답변시간
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    ccontent: { //문의 내용
        type: DataTypes.STRING,
        allowNull: false
    },
    cdelete: { // 삭제여부
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    cregdate: { //등록날짜
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    ctitle: { //문의 제목
        type: DataTypes.STRING,
        allowNull: false,
    },
    canswer: { //답변
        type: DataTypes.STRING,
        allowNull: false
    },
    cstatus: { //답변 상태
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
}, {
    tableName: 'tbl_qna',
    timestamps: false,

});

export default Qna;