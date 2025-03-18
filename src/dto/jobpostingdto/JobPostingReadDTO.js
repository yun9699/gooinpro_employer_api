class JobPostingReadDTO {

    constructor(jpno, eno, jpname, jpcontent, jpvacancies, jphourlyRate, jpworkDays, jpregdate, jpifilenames, jmworkStartTime, jmworkEndTime) {
        this.jpno = jpno; // 공고 번호
        this.eno = eno; // 고용인 ID
        this.jpname = jpname; // 공고 제목
        this.jpvacancies = jpvacancies; // 모집 인원
        this.jphourlyRate = jphourlyRate; // 시급
        this.jpworkDays = jpworkDays; // 근무 요일 (예: "1100000")
        this.jpregdate = jpregdate;
        this.jpifilenames = jpifilenames
        this.jmworkStartTime = jpworkStartTime;
        this.jmworkEndTime = jpworkEndTime;
    }
}

export default JobPostingReadDTO;
