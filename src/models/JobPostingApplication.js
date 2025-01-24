import { DataTypes } from 'sequelize';
import { sequelize } from '../config/MariaDB.js';

const JobPostingApplication = sequelize.define('JobPostingApplication', {
    jpano: {
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
    jpacontent: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'tbl_jobPostingApplication',
    timestamps: false
});

export default JobPostingApplication;
