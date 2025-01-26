
class PartTimerListDTO {

    constructor(pno, pname, workDaysCount, onTimeCount, lateCount, earlyLeaveCount, absenceCount) {

        this.pno = pno; //Primary Key
        this.pname = pname; //이름
        this.workDaysCount = workDaysCount; //총 일한 날 수
        this.onTimeCount = onTimeCount; //정상 춘근한 날 수
        this.lateCount = lateCount; //지각한 날 수
        this.earlyLeaveCount = earlyLeaveCount; //조퇴한 날 수
        this.absenceCount = absenceCount;   //결근한 날 수
    }
}

export default PartTimerListDTO;