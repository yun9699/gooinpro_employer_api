
class CalenderDTO {

    constructor(date, workers) {

        this.date = date;   //날짜
        this.workers = workers; //이 날 근무하는 근로자 배열(WorkerForCalendarDTO 사용)
    }
}

export default CalenderDTO;