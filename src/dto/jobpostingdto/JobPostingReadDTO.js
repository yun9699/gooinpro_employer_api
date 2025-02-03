class JobPostingReadDTO {

    constructor(jpno, eno, jpname, jpvacancies, jphourlyRate, jpworkDays, jpregdate) {
        this.jpno = jpno; // 공고 번호
        this.eno = eno; // 고용인 ID
        this.jpname = jpname; // 공고 제목
        this.jpvacancies = jpvacancies; // 모집 인원
        this.jphourlyRate = jphourlyRate; // 시급
        this.jpworkDays = jpworkDays; // 근무 요일 (예: "1100000")
        this.jpregdate = jpregdate; // 공고 등록일
    }
}

export default JobPostingReadDTO;
