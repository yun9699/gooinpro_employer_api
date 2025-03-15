
class WorkerForCalendarDTO {

    constructor(pname, jmworkStartTime, jmworkEndTime) {

        this.pname = pname; //근로자 이름
        this.jmworkStartTime = jmworkStartTime; //근로 매칭에 설정된 근로 시작 시간
        this.jmworkEndTime = jmworkEndTime; //근로 매칭에 설정된 근로 종료 시간
    }
}

export default WorkerForCalendarDTO;