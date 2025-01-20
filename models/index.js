import Employer from './Employer.js';
import PartTimer from './PartTimer.js';
import WorkLogs from './WorkLogs.js';
import JobPostings from './JobPostings.js';
import JobMatchings from './JobMatchings.js';
import JobPostingApplication from "./JobPostingApplication.js";
import JobPostingImage from './JobPostingImage.js';

// 관계 정의

//Employer
Employer.hasMany(WorkLogs, { foreignKey: 'eno' });

//PartTImer
PartTimer.hasMany(WorkLogs, { foreignKey: 'pno' });

//WorkLogs
WorkLogs.belongsTo(Employer, { foreignKey: 'eno' });
WorkLogs.belongsTo(PartTimer, { foreignKey: 'pno' });

// JobPostings
JobPostings.belongsTo(Employer, { foreignKey: 'eno' });
JobPostings.hasMany(JobMatchings, { foreignKey: 'jpno' });

// JobMatchings
JobMatchings.belongsTo(JobPostings, { foreignKey: 'jpno' });
JobMatchings.belongsTo(PartTimer, { foreignKey: 'ptno' });

// JobPostingApplication
JobPostingApplication.belongsTo(JobPostings, { foreignKey: 'jpno' });
JobPostingApplication.belongsTo(PartTimer, { foreignKey: 'ptno' });

// JobPostingImage
JobPostingImage.belongsTo(JobPostings, { foreignKey: 'jpno' });
JobPostingImage.belongsTo(Employer, { foreignKey: 'eno' });


const models = {
    Employer,
    PartTimer,
    WorkLogs,
    JobPostings,
    JobMatchings,
    JobPostingApplication,
    JobPostingImage
}

export default models;