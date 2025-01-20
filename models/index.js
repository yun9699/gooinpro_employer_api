import Employer from './Employer.js';
import PartTimer from './PartTimer.js';
import WorkLogs from './WorkLogs.js';
import Complaints from "./Complaints.js";
import ComplaintsImage from "./ComplaintsImage.js";
import PartTimerImage from "./PartTimerImage.js";
import Qna from "./Qna.js";
import Faq from "./Faq.js";
import EChatroom from "./EChatroom.js";

// 관계 정의

//Employer
Employer.hasMany(WorkLogs, { foreignKey: 'eno' });
Employer.hasMany(Complaints, { foreignKey: 'eno' });

//PartTImer
PartTimer.hasMany(WorkLogs, { foreignKey: 'pno' });
PartTimer.hasMany(Complaints, { foreignKey: 'pno' });
PartTimer.hasMany(PartTimerImage, { foreignKey: 'pno' });

//WorkLogs
WorkLogs.belongsTo(Employer, { foreignKey: 'eno' });
WorkLogs.belongsTo(PartTimer, { foreignKey: 'pno' });

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


const models = {
    Employer,
    PartTimer,
    WorkLogs,
    Qna,
    Faq,
    EChatroom,
    Complaints,
    ComplaintsImage,
    PartTimerImage,
}

export default models;