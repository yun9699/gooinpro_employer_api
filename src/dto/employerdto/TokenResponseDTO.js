class TokenResponseDTO {

    constructor(eno, eemail, ename, accessToken, refreshToken, isNew) {
        this.eno = eno;
        this.eemail = eemail;
        this.ename = ename;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.isNew = isNew;
    }
}
export default TokenResponseDTO;
