import Employer from './Employer.js';
import PartTimer from './PartTimer.js';
import WorkLogs from './WorkLogs.js';
import Complaints from "./Complaints.js";
import ComplaintsImage from "./ComplaintsImage.js";

// 관계 정의

//Employer
Employer.hasMany(WorkLogs, { foreignKey: 'eno' });
Employer.hasMany(Complaints, { foreignKey: 'eno' });

//PartTImer
PartTimer.hasMany(WorkLogs, { foreignKey: 'pno' });
PartTimer.hasMany(Complaints, { foreignKey: 'pno' });

//WorkLogs
WorkLogs.belongsTo(Employer, { foreignKey: 'eno' });
WorkLogs.belongsTo(PartTimer, { foreignKey: 'pno' });

//Complaints
Complaints.hasMany(ComplaintsImage, { foreignKey: 'cno' });
Complaints.belongsTo(Employer, { foreignKey: 'eno' });
Complaints.belongsTo(PartTimer, { foreignKey: 'pno' });

//ComplaintsImage
ComplaintsImage.belongsTo(Complaints, { foreignKey: 'cno' });



const models = {
    Employer,
    PartTimer,
    WorkLogs,
    Complaints,
    ComplaintsImage,
}

export default models;