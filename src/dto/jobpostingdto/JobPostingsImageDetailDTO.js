class JobPostingsImageDetailDTO {
    constructor(jpifilenames) {
        this.jpifilename = jpifilenames;
    }

    static fromEntity(entities) {
        const filenames = entities.map(entity => entity.jpifilename);
        return new JobPostingsImageDetailDTO(filenames);
    }

    toJSON() {
        return {
            jpifilename: this.jpifilename
        };
    }
}

export default JobPostingsImageDetailDTO;