import { DataTypes } from 'sequelize';
import { sequelize } from '../config/MariaDB.js';

const JobMatchings = sequelize.define('JobMatchings', {
    jmno: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    jpno: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    ptno: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    jmregdate: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    jmstatus: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    jmdelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {
    tableName: 'tbl_jobMatchings',
    timestamps: false
});

export default JobMatchings;
