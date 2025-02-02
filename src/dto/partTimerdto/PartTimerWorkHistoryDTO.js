
class PartTimerWorkHistoryDTO {

    constructor(jpname, jmstartDate, jmendDate, WorkPeriod) {

        this.jpname = jpname;   //근무 이름
        this.jmstartDate = jmstartDate; //근무 시작 날짜
        this.jmendDate = jmendDate; //근무 끝 날짜
        this.WorkPeriod = WorkPeriod;   //근무 기간(근무 끝 날짜 없으면 시작부터 현재까지 기간과 진행중 표시)
    }
}

export default PartTimerWorkHistoryDTO;