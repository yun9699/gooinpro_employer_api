import Employer from './Employer.js';
import PartTimer from './PartTimer.js';
import WorkLogs from './WorkLogs.js';
import Qna from "./Qna.js";
import Faq from "./Faq.js";
import EChatroom from "./EChatroom.js";

// 관계 정의

//Employer
Employer.hasMany(WorkLogs, { foreignKey: 'eno' });

//PartTImer
PartTimer.hasMany(WorkLogs, { foreignKey: 'pno' });

//WorkLogs
WorkLogs.belongsTo(Employer, { foreignKey: 'eno' });
WorkLogs.belongsTo(PartTimer, { foreignKey: 'pno' });

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
}

export default models;