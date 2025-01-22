class TokenResponseDTO {

    constructor(eno, eemail, ename, accessToken, refreshToken) {
        this.eno = eno;
        this.eemail = eemail;
        this.ename = ename;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
export default TokenResponseDTO;
