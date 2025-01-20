import {sequelize} from "../config/db.js";
import {DataTypes} from "sequelize";

const Faq = sequelize.define('Faq', {

    fno: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    fcategory: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fcontent: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fdelete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    fmoddate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    fregdate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    ftitle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    admno: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: false,
        foreignKey: true
    }
}, {
    tableName: 'tbl_faq',
    timestamps: false,

})

export default Faq;