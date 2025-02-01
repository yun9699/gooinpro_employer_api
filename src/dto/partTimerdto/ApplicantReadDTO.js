
class ApplicantReadDTO {

    constructor(pifilename, pname, pgender, pbirth, jpahourlyRate, jpacontent) {

        this.pifilename = pifilename;   //프로필 사진
        this.pname = pname; //이름
        this.pgender = pgender; //성별
        this.pbirth = pbirth; //생일(나이 표시 용)
        this.jpahourlyRate = jpahourlyRate; //원하는 시급
        this.jpacontent = jpacontent;   //지원 매모
    }
}

export default ApplicantReadDTO;