import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Employer from "./Employer.js";

const JobPostings = sequelize.define('JobPostings', {
    jpno: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    eno: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'tbl_employer',
            key: 'eno'
        }
    },
    jpname: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    jpcontent: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    jpdelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false
    },
    jpenddate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    jphourlyRate: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    jpmaxDuration: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    jpminDuration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    jpregdate: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    jpvacancies: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    jpworkDays: {
        type: DataTypes.STRING(7),
        defaultValue: '0000000',
        allowNull: false
    },
    jpworkEndTime: {
        type: DataTypes.TIME,
        allowNull: true
    },
    jpworkStartTime: {
        type: DataTypes.TIME,
        allowNull: true
    }
}, {
    tableName: 'tbl_jobPostings',
    timestamps: false
});

JobPostings.belongsTo(Employer, {
    foreignKey: 'eno',
    constraints: true,
    onDelete: 'CASCADE',
});

Employer.hasMany(JobPostings, {
    foreignKey: 'eno'
});


export default JobPostings;
