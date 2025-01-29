import { DataTypes } from 'sequelize';
import { sequelize } from '../config/MariaDB.js';

const JobPostingImage = sequelize.define('JobPostingImage', {
    jpino: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    jpno: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    eno: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    jpifilename: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'tbl_jobPostingImage',
    timestamps: false
});

export default JobPostingImage;
