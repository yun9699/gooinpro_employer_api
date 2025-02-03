class JobPostingUpdateDTO {
    
    constructor(jpno, eno, jpname, jpcontent, jpvacancies, jphourlyRate, jpworkDays, jpminDuration, jpmaxDuration, jpworkStartTime, jpworkEndTime) {
        this.jpno = jpno; // 공고 번호
        this.eno = eno; // 고용인 ID (수정 권한 확인용)
        this.jpname = jpname; // 공고 제목
        this.jpcontent = jpcontent; // 공고 설명
        this.jpvacancies = jpvacancies; // 모집 인원
        this.jphourlyRate = jphourlyRate; // 시급
        this.jpworkDays = jpworkDays; // 근무 요일 (예: "1100000")
        this.jpminDuration = jpminDuration; // 최소 근무 기간
        this.jpmaxDuration = jpmaxDuration; // 최대 근무 기간 (null 가능)
        this.jpworkStartTime = jpworkStartTime; // 근무 시작 시간
        this.jpworkEndTime = jpworkEndTime; // 근무 종료 시간
    }
}

export default JobPostingUpdateDTO;
