import Employer from './Employer.js';
import PartTimer from './PartTimer.js';
import WorkLogs from './WorkLogs.js';
import Review from "./Review.js";
import PartTimerDocumentImage from "./PartTimerDocumentImage.js";

// 관계 정의

//Employer
Employer.hasMany(WorkLogs, { foreignKey: 'eno' });
Employer.hasMany(Review, { foreignKey: 'eno' });

//PartTImer
PartTimer.hasMany(WorkLogs, { foreignKey: 'pno' });
PartTimer.hasMany(Review, { foreignKey: 'pno' });
PartTimer.hasMany(PartTimerDocumentImage, { foreignKey: 'pno' });

//WorkLogs
WorkLogs.belongsTo(Employer, { foreignKey: 'eno' });
WorkLogs.belongsTo(PartTimer, { foreignKey: 'pno' });

//Review
Review.belongsTo(Employer, { foreignKey: 'eno' });
Review.belongsTo(PartTimer, { foreignKey: 'pno' });

//
PartTimerDocumentImage.belongsTo(PartTimer, { foreignKey: 'pno' });


const models = {
    Employer,
    PartTimer,
    WorkLogs,
    Review,
    PartTimerDocumentImage,
}

export default models;