import Employer from './Employer.js';
import PartTimer from './PartTimer.js';
import WorkLogs from './WorkLogs.js';
import Review from "./Review.js";
import PartTimerDocumentImage from "./PartTimerDocumentImage.js";
import WorkPlace from "./WorkPlace.js";
import Complaints from "./Complaints.js";
import ComplaintsImage from "./ComplaintsImage.js";
import PartTimerImage from "./PartTimerImage.js";
import Qna from "./Qna.js";
import Faq from "./Faq.js";
import Chatroom from "./Chatroom.js";
import JobPostings from './JobPostings.js';
import JobMatchings from './JobMatchings.js';
import JobPostingApplication from "./JobPostingApplication.js";
import JobPostingImage from './JobPostingImage.js';
import Admin from "./Admin.js";

// 관계 정의

//Admin
Admin.hasMany(Qna, { foreignKey: 'admno'});
Admin.hasMany(Chatroom, { foreignKey: 'admno'});
Admin.hasMany(Faq, { foreignKey: 'admno'});

//Employer
Employer.hasMany(WorkLogs, { foreignKey: 'eno' });
Employer.hasMany(Review, { foreignKey: 'eno' });
Employer.hasMany(WorkPlace, { foreignKey: 'eno' });
Employer.hasMany(Complaints, { foreignKey: 'eno' });

//PartTImer
PartTimer.hasMany(WorkLogs, { foreignKey: 'pno' });
PartTimer.hasMany(Review, { foreignKey: 'pno' });
PartTimer.hasMany(PartTimerDocumentImage, { foreignKey: 'pno' });
PartTimer.hasMany(Complaints, { foreignKey: 'pno' });
PartTimer.hasMany(PartTimerImage, { foreignKey: 'pno' });

//WorkLogs
WorkLogs.belongsTo(Employer, { foreignKey: 'eno' });
WorkLogs.belongsTo(PartTimer, { foreignKey: 'pno' });

//Review
Review.belongsTo(Employer, { foreignKey: 'eno' });
Review.belongsTo(PartTimer, { foreignKey: 'pno' });

//PartTimerDocumentImage
PartTimerDocumentImage.belongsTo(PartTimer, { foreignKey: 'pno' });

//WorkPlace
WorkPlace.belongsTo(Employer, { foreignKey: 'eno' });

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

//Complaints
Complaints.hasMany(ComplaintsImage, { foreignKey: 'cno' });
Complaints.belongsTo(Employer, { foreignKey: 'eno' });
Complaints.belongsTo(PartTimer, { foreignKey: 'pno' });

//ComplaintsImage
ComplaintsImage.belongsTo(Complaints, { foreignKey: 'cno' });

//partTimerImage
PartTimerImage.belongsTo(PartTimer, { foreignKey: 'pno' });

//QNA
Qna.belongsTo(Employer, { foreignKey: 'eno' });
Qna.belongsTo(PartTimer, { foreignKey: 'pno' });
Qna.belongsTo(Admin, { foreignKey: 'admno' });

//FAQ
Faq.belongsTo(Admin, { foreignKey: 'admno' });

//Chatroom
Chatroom.belongsTo(PartTimer, { foreignKey: 'pno' });
Chatroom.belongsTo(Admin, { foreignKey: 'admno' });

const models = {
    Employer,
    PartTimer,
    WorkLogs,
    Review,
    PartTimerDocumentImage,
    WorkPlace,
    JobPostings,
    JobMatchings,
    JobPostingApplication,
    JobPostingImage,
    Qna,
    Faq,
    Chatroom,
    Complaints,
    ComplaintsImage,
    PartTimerImage,
    Admin
}

export default models;