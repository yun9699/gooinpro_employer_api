import {sequelize} from "../config/db.js";
import {DataTypes} from "sequelize";

//리뷰
const Review = sequelize.define('Review', {

    rno: {  //Primary Key
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    rstart: {   //별점(기본 별점은 5점으로)
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5
    },
    rcontent: { //내용
        type: DataTypes.STRING,
        allowNull: true
    },
    rregdate: { //등록 시간
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    rdelete: {  //softDelete Flag
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'tbl_review',  // 실제 테이블 이름을 지정
    timestamps: false            // Sequelize가 자동으로 생성하는 createdAt, updatedAt을 사용하지 않으면 false로 설정
});

export default Review;