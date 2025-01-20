import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import JobPostings from './jobPostings.js';
import PartTimer from './partTimer.js';

const JobMatchings = sequelize.define('JobMatchings', {
    jmno: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    jpno: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'tbl_jobPostings',
            key: 'jpno'
        }
    },
    ptno: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'tbl_partTimer',
            key: 'ptno'
        }
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

// 관계 설정
JobMatchings.belongsTo(JobPostings, {
    foreignKey: 'jpno',
    constraints: true
});

JobMatchings.belongsTo(PartTimer, {
    foreignKey: 'ptno',
    constraints: true
});

export default JobMatchings;