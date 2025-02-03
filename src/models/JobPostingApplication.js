import { DataTypes } from 'sequelize';
import { sequelize } from '../config/MariaDB.js';

const JobPostingApplication = sequelize.define('JobPostingApplication', {
    jpano: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    jpacontent: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    jpahourlyRate: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    jpadelete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'tbl_jobPostingApplication',
    timestamps: false
});

export default JobPostingApplication;
