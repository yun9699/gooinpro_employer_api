class JobPostingResponseDTO {

    constructor(jpno, message) {
        this.jpno = jpno; // 공고 번호
        this.message = message; // 응답 메시지 ("등록 성공", "수정 성공" 등)
    }
}

export default JobPostingResponseDTO;
