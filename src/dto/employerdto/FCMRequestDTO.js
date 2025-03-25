class FCMRequestDTO {

    constructor(token, title, content) {
        this.token = token;
        this.title = title;
        this.content = content;
    }

    static listToken(token, title, content) {
        return new FCMRequestDTO([token], title, content);
    }

}

export default FCMRequestDTO;