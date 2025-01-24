import {sequelize} from "../config/MariaDB.js";
import {DataTypes} from "sequelize";

const Faq = sequelize.define('Faq', {

    fno: {  //pk
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    fcategory: { // FAQ 카테고리
        type: DataTypes.STRING,
        allowNull: false,
    },
    fcontent: { // FAQ 내용
        type: DataTypes.STRING,
        allowNull: false,
    },
    fdelete: { // 삭제여부
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    fmoddate: { // 수정시간
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    fregdate: { // 등록시간
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    ftitle: { // 제목
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'tbl_faq',
    timestamps: false,

})

export default Faq;